import { useActiveWeb3React } from './index'

export default function useBNBorETH() {
  const { chainId } = useActiveWeb3React()
  return chainId == 97 || chainId == 56 ? 'BNB' : 'ETH'
}
