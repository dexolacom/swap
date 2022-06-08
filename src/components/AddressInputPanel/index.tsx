import React, { useContext, useCallback, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'
import useENS from '../../hooks/useENS'
import { useActiveWeb3React } from '../../hooks'
import { ExternalLink, TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { getEtherscanLink } from '../../utils'
import useBNBorETH from '../../hooks/useBNBorETH'
import { sanitizeUrl } from '@braintree/sanitize-url'

const InputPanel = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.bg1};
  z-index: 1;
  width: 100%;
`

const ContainerRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const InputContainer = styled.div<{ error: boolean }>`
  flex: 1;
  padding: 1rem;
  border: ${({ error }) => (error ? '1px solid #E44B05' : '1px solid rgba(196, 201, 210, 0.35)')};
  transition: border-color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')},
    color 500ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  border-radius: 8px;
  background: #1e1e1e;
`

const Input = styled.input<{ error?: boolean }>`
  font-size: 16px;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background: #1e1e1e;
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.red1 : theme.primary1)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`

const RowBetweenResponsive = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 300px;
  `};
`

export default function AddressInputPanel({
  id,
  value,
  onChange,
  onError
}: {
  id?: string
  // the typed string value
  value: string
  // triggers whenever the typed value changes
  onChange: (value: string) => void
  onError?: any
}) {
  const { chainId } = useActiveWeb3React()
  const theme = useContext(ThemeContext)
  const chainToken = useBNBorETH()

  const { address, loading, name } = useENS(value)

  const error = Boolean(value.length > 0 && !loading && !address)

  useEffect(() => {
    onError(address)
  }, [address])

  const handleInput = useCallback(
    event => {
      const input = event.target.value
      const withoutSpaces = input.replace(/\s+/g, '')
      onChange(withoutSpaces)
    },
    [onChange]
  )

  return (
    <InputPanel id={id}>
      <ContainerRow>
        <InputContainer error={error}>
          <AutoColumn gap="md">
            <RowBetweenResponsive>
              <TYPE.black color={theme.text2} fontWeight={500} fontSize={14}>
                Recipient <span style={{ color: '#E44B05' }}>*</span>
              </TYPE.black>
              {address && chainId && (
                <ExternalLink
                  href={sanitizeUrl(getEtherscanLink(chainId, name ?? address, 'address'))}
                  style={{ fontSize: '14px' }}
                >
                  {chainToken == 'ETH' ? 'View on Etherscan' : 'View on BscScan'}
                </ExternalLink>
              )}
            </RowBetweenResponsive>
            <Input
              className="recipient-address-input"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Wallet Address or ENS name"
              error={error}
              pattern="^(0x[a-fA-F0-9]{40})$"
              onChange={handleInput}
              value={value}
            />
          </AutoColumn>
        </InputContainer>
      </ContainerRow>
    </InputPanel>
  )
}
