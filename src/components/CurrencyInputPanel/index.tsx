import { Currency, Pair } from 'nimbus-swap-mod/sdk'
import React, { useState, useContext, useCallback, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { darken } from 'polished'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import APP1CurrencySearchModal from '../APP1_SearchModal/CurrencySearchModal'
import APP1CurrencyLogo from '../APP1_CurrencyLogo'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { Input as NumericalInput } from '../NumericalInput'
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'

import { useActiveWeb3React } from '../../hooks'

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const CurrencySelect = styled.button<{ selected: boolean; direction: string }>`
  align-items: center;
  height: 2.2rem;
  font-size: 20px;
  font-weight: 500;
  background-color: ${({ selected, theme }) => (selected ? theme.bg1 : theme.grey1)};
  color: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
  border-radius: 8px;
  box-shadow: ${({ selected }) => (selected ? 'none' : '0px 6px 10px rgba(0, 0, 0, 0.075)')};
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;

  :focus,
  :hover {
    background-color: ${({ selected, theme }) => (selected ? theme.bg2 : darken(0.05, theme.primary1))};
  }
`

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
    stroke-width: 1.5px;
  }
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '12px')};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '12px')};
  border: 1px solid ${({ theme }) => theme.grey1};
  background-color: ${({ theme }) => theme.bg1};
`

const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size:  ${({ active }) => (active ? '20px' : '16px')};

`

const StyledBalanceMax = styled.button`
  height: 28px;
  background-color: ${({ theme }) => theme.primary5};
  border: 1px solid ${({ theme }) => theme.primary5};
  border-radius: 0.3rem;
  font-size: 0.875rem;

  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.primaryText1};
  :hover {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: any) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null | any
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  customBalanceText?: string
  TOKENS?: any
  BALANCES?: any
  token?: any
  balance?: any
  direct?: any
  process?: any
  disableToActiveToken?: boolean
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = 'Input',
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
  customBalanceText,
  TOKENS,
  BALANCES,
  token,
  balance,
  direct,
  process,
  disableToActiveToken
}: CurrencyInputPanelProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [availableValue, setAvailableValue] = useState<any>(null)
  const { account, chainId } = useActiveWeb3React()
  const selectedCurrencyMainBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const theme = useContext(ThemeContext)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  // const handleMax = async () => {
  //   const available = await getBalance()
  //   if (currency?.symbol == 'NBU') {
  //     const value = available.human.toLocaleString('fullwide', { useGrouping: false, minimumFractionDigits: 18 })
  //     onUserInput(value.substring(0, value.length - 2))
  //   } else if (currency?.symbol == 'GNBU') {
  //     const value = available.human.toLocaleString('fullwide', { useGrouping: false, minimumFractionDigits: 18 })
  //     onUserInput(value.substring(0, value.length - 2))
  //   }
  // }

  useEffect(() => {
    onUserInput('')
  }, [onCurrencySelect])
  // --- Serzh108 ---
  const [isLiquidity, setIsLiquidity] = useState(false)
  useEffect(() => {
    if (id.includes('liquidity')) {
      setIsLiquidity(true)
    }
  }, [id])

  // --- Serzh108 ---

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                {label}
              </TYPE.body>
              {account && (
                <TYPE.body
                  onClick={onMax}
                  color={theme.text2}
                  fontWeight={500}
                  fontSize={14}
                  style={{ display: 'inline', cursor: 'pointer' }}
                >
                  {!hideBalance && !!currency
                    ? (customBalanceText ?? 'Balance: ') + (selectedCurrencyMainBalance?.toSignificant(6) ?? '0')
                    : ' -'}
                </TYPE.body>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={availableValue ? availableValue : value}
                onUserInput={val => {
                  //@ts-ignore
                  if (availableValue) {
                    onUserInput(availableValue)
                    setAvailableValue(null)
                  } else {
                    onUserInput(val)
                  }
                }}
              />
              {/* {account && currency && showMaxButton && label !== 'To' && ( */}
              {/* {account && currency && label === 'From' && ( */}
              {account && currency && (isLiquidity ? showMaxButton && label !== 'To' : label === 'From') && (
                <StyledBalanceMax
                  className="at-click at-btn-max"
                  // onClick={currency?.symbol == 'NBU' || currency?.symbol == 'GNBU' ? () => handleMax() : onMax}
                  onClick={onMax}
                >
                  MAX
                </StyledBalanceMax>
              )}
            </>
          )}
          <CurrencySelect
            selected={!!currency}
            className={`at-click at-btn-${direct ? direct.toLowerCase() : label.toLowerCase()}`}
            direction={label.toLowerCase()}
            onClick={() => {
              if (!disableCurrencySelect) {
                setModalOpen(true)
              }
            }}
          >
            <Aligner>
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={24} margin={true} />
              ) : currency ? (
                TOKENS && BALANCES ? (
                  <APP1CurrencyLogo currency={currency} size={'24px'} />
                ) : (
                  <CurrencyLogo currency={currency} size={'24px'} />
                )
              ) : null}
              {pair ? (
                <StyledTokenName className="pair-name-container">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </StyledTokenName>
              ) : (
                <StyledTokenName active={Boolean(currency && currency.symbol)}>
                  {(currency && currency.symbol == 'ETH' && chainId == 56) ||
                  (currency && currency.symbol == 'ETH' && chainId == 97)
                    ? 'BNB'
                    : (currency && currency.symbol && currency.symbol.length > 20
                        ? currency.symbol.slice(0, 4) +
                          '...' +
                          currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                        : currency?.symbol) || 'Select a token'}
                </StyledTokenName>
              )}
              {!disableCurrencySelect && <StyledDropDown selected={!!currency} />}
            </Aligner>
          </CurrencySelect>
        </InputRow>
      </Container>
      {!disableCurrencySelect &&
        onCurrencySelect &&
        (TOKENS && BALANCES ? (
          <APP1CurrencySearchModal
            direct={direct}
            process={process}
            isOpen={modalOpen}
            onDismiss={handleDismissSearch}
            onCurrencySelect={onCurrencySelect}
            selectedCurrency={currency}
            otherSelectedCurrency={otherCurrency}
            showCommonBases={showCommonBases}
            TOKENS={TOKENS}
            BALANCES={BALANCES}
          />
        ) : (
          <CurrencySearchModal
            direct={direct}
            process={process}
            isOpen={modalOpen}
            direction={label.toLowerCase()}
            onDismiss={handleDismissSearch}
            onCurrencySelect={onCurrencySelect}
            selectedCurrency={currency}
            otherSelectedCurrency={otherCurrency}
            showCommonBases={showCommonBases}
            disableToActiveToken={disableToActiveToken}
          />
        ))}
    </InputPanel>
  )
}
