export type TContractVariant = 'router'

export type TContracts = {
  router: string
}

export type TAbi = {
  router: any
}

export type TWeb3ContractContext = {
  web3?: any
  getContract: (contract: TContractVariant) => any
}

export enum EChainId {
  MAIN_ETH = 1,
  TEST_ETH = 3,
  MAIN_BSC = 56,
  TEST_BSC = 97
}
