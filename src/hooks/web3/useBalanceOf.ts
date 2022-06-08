import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { convertToHuman } from '../useConvertToHuman'
import ABI from './ABI_DEFAULT.json'
import { ZERO_ADDRESS } from '../../constants'
import { useWeb3Contract } from 'context/contexts'

async function getGnbuAvailable(account: string | null | undefined, contractAddress: string, web3: any) {
  if (account) {
    const contract = new web3.eth.Contract(ABI as any, contractAddress)
    const availableForTransfer = await contract.methods.availableForTransfer(account).call()
    const delegatee = await contract.methods.delegates(account).call()
    const delegateeTotalDelegated = await contract.methods.getCurrentVotes(delegatee).call()
    const dec = await contract.methods.decimals().call()
    if (
      delegatee !== ZERO_ADDRESS &&
      convertToHuman(delegateeTotalDelegated, dec) < convertToHuman(availableForTransfer, dec)
    ) {
      return delegateeTotalDelegated
    } else {
      return availableForTransfer
    }
  }
}

export const useBalanceOf = (contractAddress: string) => {
  const { account } = useWeb3React()
  const { web3 } = useWeb3Contract()

  // const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)

  const [balance, setBalance] = useState<string>()
  const [balanceHuman, setBalanceHuman] = useState<number>()
  const getBalance = async () => {
    const contract = new web3.eth.Contract(ABI as any, contractAddress)
    const symbol = await contract.methods.symbol().call()
    let balance
    try {
      balance = await contract.methods[symbol === 'NBU' ? 'availableForTransfer' : 'balanceOf'](account).call()
    } catch (error) {
      console.error(error)
    }

    if (symbol === 'GNBU') {
      balance = await getGnbuAvailable(account, contractAddress, web3)
    }
    const dec = await contract.methods.decimals().call()
    const human = convertToHuman(balance, dec)
    setBalance(balance)
    setBalanceHuman(human)
    return { balance: balance, human: human }
  }

  useEffect(() => {
    if (contractAddress) getBalance()
  }, [contractAddress])

  return { balance, balanceHuman, getBalance }
}

export const getAvailableForTransfer = async (account: string, contractAddress: string, web3: any) => {
  // const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)
  if (contractAddress) {
    const contract = new web3.eth.Contract(ABI as any, contractAddress)
    const symbol = await contract.methods.symbol().call()
    let balance = await contract.methods[symbol === 'NBU' ? 'availableForTransfer' : 'balanceOf'](account).call()
    if (symbol === 'GNBU') {
      balance = await getGnbuAvailable(account, contractAddress, web3)
    }
    return balance
  }
}
