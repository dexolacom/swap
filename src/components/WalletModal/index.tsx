// @ts-nocheck
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import MetamaskIcon from '../../assets/images/metamask.png'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { fortmatic, injected, portis } from '../../connectors'
import { OVERLAY_READY } from '../../connectors/Fortmatic'
import { SUPPORTED_WALLETS } from '../../constants'
import usePrevious from '../../hooks/usePrevious'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useWalletModalToggle } from '../../state/application/hooks'
import { ExternalLink } from '../../theme'
import AccountDetails from '../AccountDetails'
import Web3 from 'web3'
import { useActiveWeb3React } from '../../hooks'
import { useWeb3Contract } from '../../context/contexts'
// @ts-ignore
// import { useActiveWeb3React } from '../../hooks/index'

import Modal from '../Modal'
import Option from './Option'
import PendingView from './PendingView'
import { CHECK_USER, AUTH_USER, CREATE_USER } from '../../queries/AuthUser'
import { useMutation } from '@apollo/client'

// import sigUtil from 'eth-sig-util'
const sigUtil = require('eth-sig-util')
const ethUtil = require('ethereumjs-util')

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending'
}

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName
}: {
  pendingTransactions: string[] // hashes of pending
  confirmedTransactions: string[] // hashes of confirmed
  ENSName?: string
}) {
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error } = useWeb3React()
  const { chainId } = useActiveWeb3React()
  const { web3 } = useWeb3Contract()

  // alert(`chainId: ${chainId}`)

  // const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)
  //const web3 = new Web3(Web3.givenProvider)

  const { location } = useHistory()

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>()

  const [pendingError, setPendingError] = useState<boolean>()

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()

  const previousAccount = usePrevious(account)
  // const REACT_APP_BACKEND_URL = 'https://demoapi-p2p.nimbusplatform.io/graphql'

  const [checkUser, { loading }] = useMutation(CHECK_USER)
  const [authUser, { data }] = useMutation(AUTH_USER)
  const [createUser, { data: dataNewUser }] = useMutation(CREATE_USER)

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen])

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [walletModalOpen])

  // close modal when a connection is successful
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)
  useEffect(() => {
    if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious])

  const getToken = async (from, signature) => {
    const data = await authUser({
      variables: {
        publicAddress: from,
        signature
      }
    })
    localStorage.setItem('token', data.data.authUser.token)
    localStorage.setItem('address', from)
    localStorage.setItem('id', data.data.authUser.id)
  }

  const signMsg = async (msgParams, from) => {
    web3?.currentProvider?.sendAsync(
      {
        method: 'eth_signTypedData',
        params: [msgParams, from],
        from: from
      },
      function(err, result) {
        if (err) {
          localStorage.setItem('token', null)
          localStorage.setItem('address', null)
          localStorage.setItem('id', null)
          return console.error(err)
        }
        if (result.error) {
          return console.error(result.error.message)
        }
        const recovered = sigUtil.recoverTypedSignatureLegacy({ data: msgParams, sig: result.result })
        if (recovered === from.toLowerCase()) {
          if (ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(from)) {
            getToken(from, result.result)
          } else {
            alert('Failed to verify signer when comparing ' + result + ' to ' + from)
          }
        } else {
          alert('Failed to verify signer, got: ' + result)
        }
      }
    )
  }

  const msgParams = nonce => [
    {
      type: 'string',
      name: 'Message',
      value: 'To participate in Nimbus P2P dApp please sign this message!'
    },
    {
      type: 'uint32',
      name: 'A number',
      value: nonce
    }
  ]

  const authDB = async account => {
    const data = await checkUser({
      variables: {
        publicAddress: account
      }
    })
    if (!loading && data.data.checkUser.nonce !== null) {
      if (account && data?.data?.checkUser?.nonce) {
        signMsg(msgParams(data?.data?.checkUser?.nonce), account)
      }
    } else {
      // need add user
      const data = await createUser({
        variables: {
          fields: {
            publicAddress: account,
            name: null
          }
        }
      })
      if (data.data.createUser.publicAddress) signMsg(msgParams(data?.data?.createUser?.nonce), account)
    }
  }

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = ''
    Object.keys(SUPPORTED_WALLETS).map(key => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })
    if (!isMobile && window?.ethereum) {
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x38`,
            chainName: 'Binance Smart Chain',
            nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com/']
          }
        ]
      })
    }
    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }

    connector &&
      activate(connector, undefined, true)
        .then(() => {
          web3.eth.getAccounts(function(err, accounts) {
            console.error(err)
            if (!accounts) return
            if (location.pathname === '/p2p') authDB(accounts[0])
          })
        })
        .catch(error => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector) // a little janky...can't use setError because the connector isn't set
          } else {
            setPendingError(true)
          }
        })
  }

  useEffect(() => {
    if (location.pathname.slice(6, 10) == '/p2p') {
      if (!account) {
        localStorage.setItem('token', null)
        localStorage.setItem('address', null)
        localStorage.setItem('id', null)
      } else {
        if (localStorage.getItem('address') == account) {
          return () => {}
        } else {
          localStorage.setItem('token', null)
          localStorage.setItem('address', null)
          localStorage.setItem('id', null)
          authDB(account)
        }
      }
    } else return () => {}
    // if (localStorage.getItem('token') === null) return null
    // authDB(account)
    // !account && localStorage.setItem('token', null)
    // account && localStorage.getItem('token') !== null && authDB(account)
  }, [account, location])

  // close wallet modal if fortmatic modal is active
  useEffect(() => {
    fortmatic.on(OVERLAY_READY, () => {
      toggleWalletModal()
    })
  }, [toggleWalletModal])

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    //const isMetamask = window.ethereum && window.ethereum.isMetaMask
    const isMetamask = true
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key]
      // check for mobile options
      if (isMobile) {
        //disable portis on mobile for now
        if (option.connector === portis) {
          return null
        }

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              className={'at-click at-pp-con-wlt-metamask'}
              onClick={() => {
                option.connector !== connector && !option.href && tryActivation(option.connector)
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={option.iconName}
            />
          )
        }
        return null
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                className={'at-click at-pp-con-wlt-metamask'}
                id={`connect-${key}`}
                key={key}
                color={'#E8831D'}
                header={'Install Metamask'}
                subheader={null}
                link={'https://metamask.io/'}
                icon={MetamaskIcon}
              />
            )
          } else {
            return null //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            className={`at-click at-pp-con-wlt-${key.toLowerCase()}`}
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector)
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} //use option.descriptio to bring back multi-line
            icon={option.iconName}
          />
        )
      )
    })
  }

  function getModalContent() {
    if (error) {
      alert(`error: ${error}`)
      return (
        <UpperSection>
          <CloseIcon className={'at-click at-btn-close'} onClick={toggleWalletModal}>
            <CloseColor />
          </CloseIcon>
          <HeaderRow>{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error connecting'}</HeaderRow>
          <ContentWrapper>
            {error instanceof UnsupportedChainIdError ? (
              <h5>Please connect to the appropriate Ethereum network.</h5>
            ) : (
              'Error connecting. Try refreshing the page.'
            )}
          </ContentWrapper>
        </UpperSection>
      )
    }
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          toggleWalletModal={toggleWalletModal}
          pendingTransactions={pendingTransactions}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
          openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
        />
      )
    }
    return (
      <UpperSection>
        <CloseIcon className={'at-click at-btn-close'} onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <HeaderRow color="blue">
            <HoverText
              className={'at-click at-pp-acc-back'}
              onClick={() => {
                setPendingError(false)
                setWalletView(WALLET_VIEWS.ACCOUNT)
              }}
            >
              Back
            </HoverText>
          </HeaderRow>
        ) : (
          <HeaderRow>
            <HoverText>Connect my wallet</HoverText>
          </HeaderRow>
        )}
        <ContentWrapper>
          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          ) : (
            <OptionGrid>{getOptions()}</OptionGrid>
          )}
          {walletView !== WALLET_VIEWS.PENDING && (
            <Blurb>
              <span>New to Ethereum? &nbsp;</span>{' '}
              <ExternalLink className={'at-click at-pp-con-wlt-learn-more'} href="https://ethereum.org/wallets/">
                Learn more about wallets
              </ExternalLink>
            </Blurb>
          )}
        </ContentWrapper>
      </UpperSection>
    )
  }

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  )
}

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  padding: 2rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const Blurb = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 1rem;
    font-size: 12px;
  `};
`

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`
