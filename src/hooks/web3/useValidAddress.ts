import Web3 from 'web3'

// hook
export const useValidAddress = (address: string): boolean => {
  const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)
  return web3.utils.isAddress(address)
}

// function
export const validAddress = (address: string): boolean => {
  const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)
  return web3.utils.isAddress(address)
}
