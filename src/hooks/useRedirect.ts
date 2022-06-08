import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useHistory } from 'react-router-dom'

export const useRedirect = () => {
  const { account } = useWeb3React()
  const history = useHistory()
  useEffect(() => {
    if (!account) history.push('/p2p')
    if ((!account || localStorage.getItem('token')) === 'null') history.push('/p2p')
  }, [account])
}
