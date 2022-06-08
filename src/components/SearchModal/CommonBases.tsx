import React from 'react'
import { Text } from 'rebass'
import { ChainId, Currency, currencyEquals, ETHER, Token } from 'nimbus-swap-mod/sdk'
import styled from 'styled-components'

import { SUGGESTED_BASES, SUGGESTED_BASES_SWAP } from '../../constants'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { AutoRow } from '../Row'
import CurrencyLogo from '../CurrencyLogo'
import { Route } from 'react-router-dom'
import useBNBorETH from '../../hooks/useBNBorETH'

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.bg3)};
  border-radius: 10px;
  display: flex;
  padding: 6px;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.bg2};
  }

  background-color: ${({ theme, disable }) => disable && theme.bg3};
  opacity: ${({ disable }) => disable && '0.4'};
`

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
  direction
}: {
  chainId?: ChainId
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
  direction: string
}) {
  const chainToken = useBNBorETH()

  return (
    <AutoColumn gap="md">
      <AutoRow>
        <Text fontWeight={500} fontSize={14}>
          Common bases
        </Text>
        <QuestionHelper text={'These tokens are commonly paired with other tokens.'} />
      </AutoRow>
      <AutoRow gap="4px">
        <BaseWrapper
          className={`at-click at-pp-slt-tkn-${direction}-${chainToken.toLowerCase()}`}
          onClick={() => {
            if (!selectedCurrency || !currencyEquals(selectedCurrency, ETHER)) {
              onSelect(ETHER)
            }
          }}
          disable={selectedCurrency === ETHER}
        >
          <CurrencyLogo currency={ETHER} style={{ marginRight: 8 }} />
          <Text fontWeight={500} fontSize={16}>
            {chainToken}
          </Text>
        </BaseWrapper>
        <Route
          exact
          strict
          path="/swap"
          render={() => {
            return (chainId ? SUGGESTED_BASES_SWAP[chainId] : []).map((token: Token) => {
              const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
              if (token.symbol !== 'WETH') {
                return (
                  <BaseWrapper
                    className={`at-pp-slt-tkn-from-${token.symbol}`}
                    onClick={() => !selected && onSelect(token)}
                    disable={selected}
                    key={token.address}
                  >
                    <CurrencyLogo currency={token} style={{ marginRight: 8 }} />
                    <Text fontWeight={500} fontSize={16}>
                      {token.symbol}
                    </Text>
                  </BaseWrapper>
                )
              } else return null
            })
          }}
        />

        <Route
          exact
          strict
          path="/add/:currencyIdA"
          render={() => {
            return (chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
              const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
              return (
                <BaseWrapper
                  className={`at-pp-slt-tkn-from-${token.symbol}`}
                  onClick={() => !selected && onSelect(token)}
                  disable={selected}
                  key={token.address}
                >
                  <CurrencyLogo currency={token} style={{ marginRight: 8 }} />
                  <Text fontWeight={500} fontSize={16}>
                    {token.symbol}
                  </Text>
                </BaseWrapper>
              )
            })
          }}
        />
      </AutoRow>
    </AutoColumn>
  )
}
