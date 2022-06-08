import { networks } from './../constants/networks'
import Web3 from 'web3'
// import { ChainId } from 'nimbus-swap-mod/sdk/dist'
import { EChainId } from '../types/web3Contract'

export const getAlternativeProvider = (chainId: number) => {
  let provider

  switch (chainId) {
    case EChainId.TEST_BSC:
      provider = networks.bsc_test
      break
    case EChainId.MAIN_BSC:
      provider = networks.bsc_main
      break
    case EChainId.MAIN_ETH:
      provider = networks.eth_main
      break
    case EChainId.TEST_ETH:
      provider = networks.eth_test
      break
    default:
      provider = Web3.givenProvider
      break
  }
  return provider
}
