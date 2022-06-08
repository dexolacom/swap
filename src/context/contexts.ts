import { useContext } from 'react'

import { Web3ContractContext } from './web3Contract'

export const useWeb3Contract = () => useContext(Web3ContractContext)
