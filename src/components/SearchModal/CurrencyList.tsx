//@ts-nocheck

import { Currency, CurrencyAmount, currencyEquals, ETHER, Token } from 'nimbus-swap-mod/sdk'
import { convertToHuman } from '../../hooks/useConvertToHuman'
import React, { CSSProperties, MutableRefObject, useCallback, useEffect, useMemo, useState } from 'react'
import { FixedSizeList } from 'react-window'
import { Text } from 'rebass'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { useSelectedTokenList, WrappedTokenInfo } from '../../state/lists/hooks'
import { useAddUserToken, useRemoveUserAddedToken } from '../../state/user/hooks'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { LinkStyledButton, TYPE } from '../../theme'
import { useIsUserAddedToken } from '../../hooks/Tokens'
import Column from '../Column'
import { RowFixed } from '../Row'
import CurrencyLogo from '../CurrencyLogo'
import { MouseoverTooltip } from '../Tooltip'
import { FadedSpan, MenuItem } from './styleds'
import Loader from '../Loader'
import { isTokenOnList } from '../../utils'
import ImportRow from './ImportRow'
import { useBalanceOf } from '../../hooks/web3/useBalanceOf'
import { getToHumanValue } from '../../pages/dApps/service'
import Web3 from 'web3'

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? 'ETHER' : ''
}

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`

const Tag = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text2};
  font-size: 14px;
  border-radius: 4px;
  padding: 0.25rem 0.3rem 0.25rem 0.3rem;
  max-width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-self: flex-end;
  margin-right: 4px;
`

function Balance({ balance }: { balance: CurrencyAmount }) {
  return <StyledBalanceText title={balance}>{balance === 0 ? '0' : balance.toFixed(4)}</StyledBalanceText> //.toExact()
}

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

function TokenTags({ currency }: { currency: Currency }) {
  if (!(currency instanceof WrappedTokenInfo)) {
    return <span />
  }

  const tags = currency.tags
  if (!tags || tags.length === 0) return <span />

  const tag = tags[0]

  return (
    <TagContainer>
      <MouseoverTooltip text={tag.description}>
        <Tag key={tag.id}>{tag.name}</Tag>
      </MouseoverTooltip>
      {tags.length > 1 ? (
        <MouseoverTooltip
          text={tags
            .slice(1)
            .map(({ name, description }) => `${name}: ${description}`)
            .join('; \n')}
        >
          <Tag>...</Tag>
        </MouseoverTooltip>
      ) : null}
    </TagContainer>
  )
}

function CurrencyRow({
  currency,
  onSelect,
  isSelected,
  otherSelected,
  style,
  customToken,
  direction,
  disableToActiveToken
}: {
  currency: Currency
  onSelect: () => void
  isSelected: boolean
  otherSelected: boolean
  style: CSSProperties
  customToken: boolean
  direction: string
  disableToActiveToken?: boolean
}) {
  const { account, chainId } = useActiveWeb3React()
  const key = currencyKey(currency)
  const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)
  const [availableBalance, setAvailableBalance] = useState(undefined)
  const selectedTokenList = useSelectedTokenList()
  const isOnSelectedList = isTokenOnList(selectedTokenList, currency)
  const customAdded = useIsUserAddedToken(currency)
  //const balance = useCurrencyBalance(account ?? undefined, currency)
  const { getBalance } = useBalanceOf(currency.symbol !== 'ETH' && currency.address)
  const removeToken = useRemoveUserAddedToken()
  const addToken = useAddUserToken()

  const getAvailableBalance = async () => {
    if (account) {
      if (currency.symbol === 'ETH') {
        await web3.eth.getBalance(account).then(data => {
          setAvailableBalance(convertToHuman(data, currency.decimals))
        })
      } else {
        const balance = await getBalance()
        setAvailableBalance(balance.human)
      }
    }
  }
  useEffect(() => {
    getAvailableBalance()
  })
  // only show add or remove buttons if not on selected list

  return (
    <MenuItem
      style={style}
      className={`at-click at-pp-slt-tkn${direction ? '-' + direction : ''}-${currency.symbol?.toLocaleLowerCase()}`}
      onClick={() => (isSelected ? null : onSelect())}
      disabled={isSelected}
      selected={otherSelected}
      disableToActiveToken={disableToActiveToken}
    >
      <CurrencyLogo currency={currency} size={'24px'} />
      <Column>
        <Text title={currency.name} fontWeight={500}>
          {(currency.symbol == 'ETH' && chainId == 97) || (currency.symbol == 'ETH' && chainId == 56)
            ? 'BNB'
            : currency.symbol}
        </Text>
        <FadedSpan>
          {!isOnSelectedList && customAdded ? (
            <TYPE.main fontWeight={500}>
              Added by user
              <LinkStyledButton
                onClick={event => {
                  event.stopPropagation()
                  if (chainId && currency instanceof Token) removeToken(chainId, currency.address)
                }}
              >
                (Remove)
              </LinkStyledButton>
            </TYPE.main>
          ) : null}
          {!isOnSelectedList && !customAdded ? (
            customToken ? null : (
              <TYPE.main fontWeight={500}>
                Found by address
                <LinkStyledButton
                  onClick={event => {
                    event.stopPropagation()
                    if (currency instanceof Token) addToken(currency)
                  }}
                >
                  (Add)
                </LinkStyledButton>
              </TYPE.main>
            )
          ) : null}
        </FadedSpan>
      </Column>
      <TokenTags currency={currency} />
      <RowFixed style={{ justifySelf: 'flex-end' }}>
        {availableBalance || availableBalance === 0 ? (
          <Balance balance={availableBalance} />
        ) : account ? (
          <Loader />
        ) : null}
      </RowFixed>
    </MenuItem>
  )
}
export default function CurrencyList({
  height,
  currencies,
  selectedCurrency,
  onCurrencySelect,
  showImportView,
  setImportToken,
  otherCurrency,
  fixedListRef,
  showETH,
  customToken,
  direction,
  direct,
  process,
  disableToActiveToken
}: {
  height: number
  currencies: Currency[]
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherCurrency?: Currency | null
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>
  showETH: boolean
  showImportView: () => void
  customToken: boolean
  setImportToken: (token: Token) => void
  direction: string
  direct: string
  process: string
  disableToActiveToken?: boolean
}) {
  const itemData = useMemo(() => (showETH ? [Currency.ETHER, ...currencies] : currencies), [currencies, showETH])
  // for BORROW
  // const itemData = useMemo(() => (
  //     showETH ? [chainId == 96 || chainId == 57 ? currencyBNB : Currency.ETHER, ...currencies] : currencies
  //   ), [currencies, showETH]
  // )

  const Row = useCallback(
    ({ data, index, style }) => {
      const currency: Currency = data[index]
      const isSelected = Boolean(selectedCurrency && currencyEquals(selectedCurrency, currency))
      const otherSelected = Boolean(otherCurrency && currencyEquals(otherCurrency, currency))
      const handleSelect = () => {
        onCurrencySelect(currency)
      }
      const token = currency
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const isAdded = useIsUserAddedToken(token)
      if (currency.tags === undefined && currency.symbol !== 'ETH' && !isAdded) {
        return (
          <ImportRow style={style} token={token} showImportView={showImportView} setImportToken={setImportToken} dim />
        )
      } else if (currency) {
        return (
          <CurrencyRow
            style={style}
            currency={currency}
            isSelected={isSelected}
            onSelect={handleSelect}
            otherSelected={otherSelected}
            customToken={customToken}
            direction={direction}
            disableToActiveToken={disableToActiveToken}
          />
        )
      }
    },
    [onCurrencySelect, otherCurrency, selectedCurrency, setImportToken, showImportView]
  )

  const itemKey = useCallback((index: number, data: any) => currencyKey(data[index]), [])

  return (
    <FixedSizeList
      height={height}
      ref={fixedListRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={56}
      itemKey={itemKey}
    >
      {Row}
    </FixedSizeList>
  )
}
