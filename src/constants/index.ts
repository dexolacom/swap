import { ChainId, JSBI, Percent, Token, WETH } from 'nimbus-swap-mod/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'
import metamask from '../assets/images/metamask.png'
import walletConnection from '../assets/images/walletConnectIcon.svg'
import arrowRight from '../assets/images/arrow-right.svg'
import coinbaseWallet from '../assets/images/coinbaseWalletIcon.svg'
import formaticIcon from '../assets/images/fortmaticIcon.png'
import portisIcon from '../assets/images/portisIcon.png'

import { fortmatic, injected, portis, walletconnect, walletlink } from '../connectors'

export const ROUTER_ADDRESS = process.env.REACT_APP_ROUTER_CONTRACT || ''

export const BSC_OR_ETH = {
  //ROUTER_BSC: '0x7F3aF0D4572180055ceDFf580422e0D8AfE7Cddc',
  ROUTER_BSC:'0xb285314255198920A9458cf0dc4720d1AA8926CF',
  ROUTER_ALL: process.env.REACT_APP_ROUTER_CONTRACT || '',
  BSC_LOGO:'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg',
  BSC_TESTSCAN:'https://testnet.bscscan.com',
  BSC_MAINSCAN:'https://bscscan.com',
  BSC_SCANNER_NAME:'View on Binance'
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const EMPTY_BYTES = '0x0000000000000000000000000000000000000000000000000000000000000000'

export const MAX_VALUE = '115792089237316195423570985008687907853269984665640564039457584007913129639935'

export { PRELOADED_PROPOSALS } from './proposals'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const NBU = new Token(ChainId.MAINNET, process.env.REACT_APP_NBU_TOKEN_CONTRACT || '0xEB58343b36C7528F23CAAe63a150240241310049', 18, 'NBU', 'Nimbus')
//export const NBU = new Token(ChainId.MAINNET, '0x5f20559235479F5B6abb40dFC6f55185b74E7b55', 18, 'NBU', 'Nimbus')
export const WBTC = new Token(ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC')
export const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
export const COMP = new Token(ChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound')
export const MKR = new Token(ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker')
export const AMPL = new Token(ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 13
export const PROPOSAL_LENGTH_IN_BLOCKS = 40_320
export const PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS

export const GOVERNANCE_ADDRESS = '0x'

export const TIMELOCK_ADDRESS = '0x'

const NBU_ADDRESS = process.env.REACT_APP_NBU_TOKEN_CONTRACT || '' // '0x0BbB61A46Cf52140781FbAAAF027323CADAFC905' // put your token address
const GNBU_ADDRESS = process.env.REACT_APP_GNBU_TOKEN_CONTRACT || '' // '0x21AFF2C46C3AB351F18555deb2396284aC7aDC84' // put your token address
export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, NBU_ADDRESS, 18, 'NBU', 'Nimbus'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, NBU_ADDRESS, 18, 'NBU', 'Nimbus'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, NBU_ADDRESS, 18, 'NBU', 'Nimbus'),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, NBU_ADDRESS, 18, 'NBU', 'Nimbus'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, NBU_ADDRESS, 18, 'NBU', 'Nimbus'),
  [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, '0x5f20559235479F5B6abb40dFC6f55185b74E7b55', 18, 'NBU', 'Nimbus'),
  [ChainId.BSC_MAINNET]: new Token(ChainId.BSC_MAINNET, '0x5f20559235479F5B6abb40dFC6f55185b74E7b55', 18, 'NBU', 'Nimbus')
}

export const GNBU: { [chainId in ChainId]: Token } = {
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, GNBU_ADDRESS, 18, 'GNBU', 'Nimbus'),
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, GNBU_ADDRESS, 18, 'GNBU', 'Nimbus'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, GNBU_ADDRESS, 18, 'GNBU', 'Nimbus'),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, GNBU_ADDRESS, 18, 'GNBU', 'Nimbus'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, GNBU_ADDRESS, 18, 'GNBU', 'Nimbus'),
  [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, '0xA4d872235dde5694AF92a1d0df20d723E8e9E5fC', 18, 'GNBU', 'Nimbus'),
  [ChainId.BSC_MAINNET]: new Token(ChainId.BSC_MAINNET, '0xA4d872235dde5694AF92a1d0df20d723E8e9E5fC', 18, 'GNBU', 'Nimbus')
}

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [NBU_ADDRESS]: 'NBU',
  [GOVERNANCE_ADDRESS]: 'Governance',
  [TIMELOCK_ADDRESS]: 'Timelock'
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e'
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
  [ChainId.BSC_TESTNET]: [WETH[ChainId.BSC_TESTNET]],
  [ChainId.BSC_MAINNET]: [WETH[ChainId.BSC_MAINNET]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], NBU, DAI, USDT]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
  }
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDT, NBU, GNBU[ChainId.MAINNET]]
}

// used for display in the default list when swap
export const SUGGESTED_BASES_SWAP: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], NBU, GNBU[ChainId.MAINNET]]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDT]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    // [
    //   new Token(ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
    //   new Token(ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin')
    // ],
    [NBU, USDT],
    [NBU, DAI]
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: arrowRight,
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: metamask,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: walletConnection,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: coinbaseWallet,
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: coinbaseWallet,
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: formaticIcon,
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: portisIcon,
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 100
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = ['0xA7e5d5A720f06526557c513402f2e6B5fA20b008']
