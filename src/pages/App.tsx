//@ts-nocheck
import React, { Suspense, useState, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import AddressClaimModal from '../components/claim/AddressClaimModal'
import Web3ReactManager from '../components/Web3ReactManager'
import { ApplicationModal } from '../state/application/actions'
import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import Swap from './Swap'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
// @ts-ignore
import { useActiveWeb3React } from '../hooks'
import Modal from '../components/Modal'
import { TYPE } from '../theme'
import { ButtonPrimary } from '../components/Button'
import Web3Status from 'components/Web3Status'

const AppWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  overflow: hidden;
  /*fix for kiwi browser*/
  height: auto;
  min-height: 100vh !important;
  @media screen and (min-width: 720px) {
    min-height: auto;
    height: 100vh;
  }
`

const MobileBoxShadow = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: #282828;
  opacity: ${props => (props.showTitle ? '0.8' : '0')};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display:${props => (props.openedMenu ? 'block' : 'none')};
  `};
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: start;
  z-index: 1;
  flex: 1;
  padding: 50px 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding:16px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding:8px;
  `};
  /*fix for kiwi browser*/
  @media screen and (max-width: 720px) {
    padding: 78px 8px 8px 8px;
  }
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const ActionButton = styled(ButtonPrimary)`
  width: 132px;
  height: 40px;
  background: #000;
  font-size: 14px;
  :hover {
    background: #242424;
  }
  :active {
    background: #242424;
  }
  :focus {
    background: #242424;
  }
`

const StyledClosed = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`

function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  return <AddressClaimModal isOpen={open} onDismiss={toggle} />
}

export default function App() {
  const [openedMenu, setOpenedMenu] = useState(window.innerWidth < 721 ? false : true)
  const [showTitle, setShowTitle] = useState(true)
  const [stakeValue, setStakeValue] = useState(null)
  const { account, chainId } = useActiveWeb3React()

  Number.prototype.toFixedDown = function(digits) {
    const re = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)'),
      m = this.toString().match(re)
    return m ? parseFloat(m[1]) : this.valueOf()
  }

  const menuHandler = () => {
    setOpenedMenu(!openedMenu)
  }

  const location = useLocation()

  const [oldChainId, setChainId] = useState([])

  useEffect(() => {
    setChainId([chainId])

    setChainId(prevState => {
      return [...prevState, chainId]
    })
  }, [chainId])

  return (
    <Suspense fallback={null}>
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <MobileBoxShadow openedMenu={openedMenu} showTitle={showTitle} />
        <BodyWrapper>
          {/* <TopLevelModals /> */}
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/swap" component={Swap} />
              <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
              <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  )
}