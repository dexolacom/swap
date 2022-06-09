import { Currency, ETHER, Token } from 'nimbus-swap-mod/sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import EthereumLogo from '../../assets/images/ethereum-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

import { useActiveWeb3React } from '../../hooks'
import { BSC_OR_ETH } from '../../constants'
import nbuIcon from '../../assets/images/pool/nbu.svg'
import gnbuIcon from '../../assets/images/pool/gnbu.svg'
import ethIcon from '../../assets/images/pool/eth.svg'
import usdtIcon from '../../assets/images/pool/usdt.svg'
import wbtcIcon from '../../assets/images/pool/wbtc.svg'
import daiIcon from '../../assets/images/pool/dai.svg'
import bnbIcon from '../../assets/images/pool/bnb.svg'

const getTokenLogoURL = (address: string) => {
  https: switch (address) {
    case process.env.REACT_APP_NBU_TOKEN_CONTRACT:
    case process.env.REACT_APP_NBU_TOKEN_CONTRACT_ROPSTEN:
    case process.env.REACT_APP_NBU_TOKEN_CONTRACT_RINKEBY:
    case process.env.REACT_APP_NBU_TOKEN_CONTRACT_GÖRLI:
    case process.env.REACT_APP_NBU_TOKEN_CONTRACT_KOVAN:
    case '0x5f20559235479F5B6abb40dFC6f55185b74E7b55':
    case '0xe3ab8aA9AA9C890028D62bC084491f8274b24e88':
      return nbuIcon

    case process.env.REACT_APP_GNBU_TOKEN_CONTRACT:
    case '0x091fBa22Fc1fa78c50Dee12364EFD5e47803321b':
    case '0xA4d872235dde5694AF92a1d0df20d723E8e9E5fC':
      return gnbuIcon

    case process.env.REACT_APP_WETH_TOKEN_MAINNET:
    case process.env.REACT_APP_WETH_TOKEN_ROPSTEN:
    case process.env.REACT_APP_WETH_TOKEN_RINKEBY:
    case process.env.REACT_APP_WETH_TOKEN_GÖRLI:
    case process.env.REACT_APP_WETH_TOKEN_KOVAN:
      return ethIcon

    case process.env.REACT_APP_USDT_TOKEN_MAINNET:
    case process.env.REACT_APP_USDT_TOKEN_ROPSTEN:
    case process.env.REACT_APP_USDT_TOKEN_RINKEBY:
    case process.env.REACT_APP_USDT_TOKEN_GÖRLI:
    case process.env.REACT_APP_USDT_TOKEN_KOVAN:
      return usdtIcon

    case process.env.REACT_APP_WBTC_TOKEN_MAINNET:
    case process.env.REACT_APP_WBTC_TOKEN_ROPSTEN:
    case process.env.REACT_APP_WBTC_TOKEN_RINKEBY:
    case process.env.REACT_APP_WBTC_TOKEN_GÖRLI:
    case process.env.REACT_APP_WBTC_TOKEN_KOVAN:
      // case '0xA2CA18FC541B7B101c64E64bBc2834B05066248b':
      return wbtcIcon

    case '0x2EA45A6702f78d1BAa2e11c6ABdaCDD22583cBa0':
      return bnbIcon

    case '0x6B175474E89094C44Da98b954EedeAC495271d0F':
    case '0xc2118d4d90b274016cB7a54c03EF52E6c537D957':
    case '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa':
    case '0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60':
    case '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa':
      return daiIcon

    default:
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
  }
}

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }
      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  const { chainId } = useActiveWeb3React()
  if (currency === ETHER) {
    const ethBnbLogo = chainId == 1 || chainId == 3 ? EthereumLogo : BSC_OR_ETH.BSC_LOGO
    return <StyledEthereumLogo src={ethBnbLogo} size={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
