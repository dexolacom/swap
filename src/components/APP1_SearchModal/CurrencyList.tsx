//@ts-nocheck
import { Currency, CurrencyAmount, currencyEquals, ETHER, Token } from 'nimbus-swap-mod/sdk'
import React, { CSSProperties, MutableRefObject, useCallback, useMemo } from 'react'
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
import Logo from '../APP1_Logo'
import { ZERO_ADDRESS } from '../../constants'
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
  return <StyledBalanceText title={balance.toExact()}>{balance.toSignificant(4)}</StyledBalanceText>
}

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

// function TokenTags({ currency }: { currency: Currency }) {
//   if (!(currency instanceof WrappedTokenInfo)) {
//     return <span />
//   }

//   const tags = currency.tags
//   if (!tags || tags.length === 0) return <span />

//   const tag = tags[0]

//   return (
//     <TagContainer>
//       <MouseoverTooltip text={tag.description}>
//         <Tag key={tag.id}>{tag.name}</Tag>
//       </MouseoverTooltip>
//       {tags.length > 1 ? (
//         <MouseoverTooltip
//           text={tags
//             .slice(1)
//             .map(({ name, description }) => `${name}: ${description}`)
//             .join('; \n')}
//         >
//           <Tag>...</Tag>
//         </MouseoverTooltip>
//       ) : null}
//     </TagContainer>
//   )
// }

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

function CurrencyRow({
  name,
  symbol,
  icon,
  onSelect,
  isSelected,
  otherSelected,
  style,
  balance,
  key,
  direct
}: {
  currency: Currency
  onSelect: () => void
  isSelected: boolean
  otherSelected: boolean
  style: CSSProperties
  direct: string
}) {
  // const { account, chainId } = useActiveWeb3React()
  // const key = currencyKey(currency)
  // const selectedTokenList = useSelectedTokenList()
  // const isOnSelectedList = isTokenOnList(selectedTokenList, currency)
  // const customAdded = useIsUserAddedToken(currency)
  // const balance = useCurrencyBalance(account ?? undefined, currency)

  // const removeToken = useRemoveUserAddedToken()
  // const addToken = useAddUserToken()

  const { chainId } = useActiveWeb3React()

  const isBinanceAndSymbolETH = (chainId === 97 || chainId === 56) && symbol == 'ETH'
  const isBinanceAndSymbolWETH = (chainId === 97 || chainId === 56) && symbol == 'WETH'
  const isBinanceAndSymbolUSDT = (chainId === 97 || chainId === 56) && symbol == 'USDT'

  // only show add or remove buttons if not on selected list
  return (
    <MenuItem onClick={() => (isSelected ? null : onSelect())} disabled={isSelected}>
      <StyledLogo
        size={'24px'}
        src={
          // (chainId === 97 && symbol == 'ETH') || (chainId === 56 && symbol == 'ETH')
          isBinanceAndSymbolETH
            ? 'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg'
            : // (chainId === 97 && symbol == 'WETH') || (chainId === 56 && symbol == 'WETH')
            isBinanceAndSymbolWETH
            ? 'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg'
            : icon
        }
        alt={`token logo`}
      />
      <Column>
        <Text
          // title={
          //   (chainId === 97 && symbol == 'ETH') || (chainId === 56 && symbol == 'ETH')
          //     ? 'BNB'
          //     : (chainId === 97 && symbol == 'WETH') || (chainId === 56 && symbol == 'WETH')
          //     ? 'WBNB'
          //     : (chainId === 97 && symbol == 'USDT') || (chainId === 56 && symbol == 'USDT')
          //     ? 'BUSD'
          //     : name
          // }
          title={
            isBinanceAndSymbolETH ? 'BNB' : isBinanceAndSymbolWETH ? 'WBNB' : isBinanceAndSymbolUSDT ? 'BUSD' : name
          }
          fontWeight={500}
        >
          {/* {(chainId === 97 && symbol == 'ETH') || (chainId === 56 && symbol == 'ETH')
            ? 'BNB'
            : (chainId === 97 && symbol == 'WETH') || (chainId === 56 && symbol == 'WETH')
            ? 'WBNB'
            : (chainId === 97 && symbol == 'USDT') || (chainId === 56 && symbol == 'USDT')
            ? 'BUSD'
            : symbol} */}
          {isBinanceAndSymbolETH ? 'BNB' : isBinanceAndSymbolWETH ? 'WBNB' : isBinanceAndSymbolUSDT ? 'BUSD' : symbol}
        </Text>
        {/* <FadedSpan>
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
          ) : null}
        </FadedSpan> */}
      </Column>
      {/* <TokenTags currency={currency} /> */}
      <RowFixed style={{ justifySelf: 'flex-end' }}>
        {balance && <StyledBalanceText title={balance}>{balance}</StyledBalanceText>}
      </RowFixed>
    </MenuItem>
  )
}

export default function CurrencyList({
  height,
  TOKENS,
  token,
  currencies,
  selectedCurrency,
  onCurrencySelect,
  otherCurrency,
  fixedListRef,
  showETH,
  balance,
  BALANCES,
  direct,
  process
}: {
  height: number
  currencies: Currency[]
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherCurrency?: Currency | null
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>
  showETH: boolean
  direct?: string
  proces?: string
}) {
  // const itemData = useMemo(() => (showETH ? [Currency.ETHER, ...currencies] : currencies), [currencies, showETH])

  // const Row = useCallback(
  //   ({ data, index, style }) => {
  //     const currency: Currency = data[index]
  //     const isSelected = Boolean(selectedCurrency && currencyEquals(selectedCurrency, currency))
  //     const otherSelected = Boolean(otherCurrency && currencyEquals(otherCurrency, currency))
  //     const handleSelect = () => onCurrencySelect(currency)
  //     return (
  //       <CurrencyRow
  //         style={style}
  //         currency={currency}
  //         isSelected={isSelected}
  //         onSelect={handleSelect}
  //         otherSelected={otherSelected}
  //       />
  //     )
  //   },
  //   [onCurrencySelect, otherCurrency, selectedCurrency]
  // )

  // const itemKey = useCallback((index: number, data: any) => currencyKey(data[index]), [])
  return (
    <div style={{ width: '100%' }}>
      {Object.values(TOKENS).map(
        tok =>
          tok.symbol !== 'NBU' && (
            <CurrencyRow
              direct={direct}
              key={tok.id}
              name={tok.name}
              symbol={tok.symbol}
              icon={tok.icon}
              balance={BALANCES[tok.symbol]}
              isSelected={tok.symbol === token}
              onSelect={() => {
                onCurrencySelect(tok.symbol)
              }}
            />
          )
      )}
    </div>
  )
}
