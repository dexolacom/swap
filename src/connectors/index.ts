import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { PortisConnector } from '@web3-react/portis-connector'

import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'
//import { ChainId } from 'nimbus-swap-mod/sdk'

// const NETWORK_URL = 'https://mainnet.infura.io/v3/7d9d43def2584f2a9f01f2a4719327bc'
const NETWORK_URL = process.env.REACT_APP_BSC_MAIN_NETWORK_URL
// REACT_APP_NETWORK_URL="https://ropsten.infura.io/v3/8ca77c4631f14dccb88318200cfca61d"

const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY
const PORTIS_ID = process.env.REACT_APP_PORTIS_ID

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '56')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
  defaultChainId: 56
})

// const NETWORK_URLS = {
//   [ChainId.MAINNET]: 'https://mainnet.infura.io/v3/8ca77c4631f14dccb88318200cfca61d',
//   [ChainId.ROPSTEN]: 'https://ropsten.infura.io/v3/8ca77c4631f14dccb88318200cfca61d',
//   [ChainId.RINKEBY]: 'https://rinkeby.infura.io/v3/8ca77c4631f14dccb88318200cfca61d',
//   [ChainId.GÖRLI]: 'https://goerly.infura.io/v3/8ca77c4631f14dccb88318200cfca61d',
//   [ChainId.KOVAN]: 'https://kovan.infura.io/v3/8ca77c4631f14dccb88318200cfca61d',
//   [ChainId.BSC_MAINNET]: 'https://bsc-dataseed.binance.org/',
//   [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-2-s3.binance.org:8545',
// }

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97]
})

//Patch networkChanged error
//@ts-ignore
injected.handleNetworkChanged = (networkId: string | number) => {
  if (networkId === '0xNaN') return //Ignore loading, networkId as causes errors
  //@ts-ignore
  injected.emitUpdate({ chainId: networkId, provider: window.ethereum })
}

// mainnet only
export const walletconnect = new WalletConnectConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
  rpc: {
    1: 'https://mainnet.infura.io/v3/8ca77c4631f14dccb88318200cfca61d',
    3: 'https://ropsten.infura.io/v3/8ca77c4631f14dccb88318200cfca61d'
  },
  // bridge: 'https://bridge.walletconnect.org',
  bridge: 'https://uniswap.bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1
})

// mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? '',
  networks: [1]
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Nimbus',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg'
})
