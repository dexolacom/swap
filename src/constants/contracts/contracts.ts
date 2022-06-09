import { TContracts, TAbi } from 'types/web3Contract'

import routerAbi from '../abis/routerAbi.json'
import routerAbiBSCmainnet from '../abis/routerAbi-bsc-mainnet.json'

export const contractsBSC: TContracts = {
  router: '0xb285314255198920A9458cf0dc4720d1AA8926CF',
}

export const contractsETH: TContracts = {
  router: '0x05F6BB6b96ca657a3666d2f1bCA302b999a671b4',
}

export const abiBSC: TAbi = {
  router: routerAbiBSCmainnet,
}

export const abiETH: TAbi = {
  router: routerAbi,
}
