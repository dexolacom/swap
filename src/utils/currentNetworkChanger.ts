// @ts-nocheck
import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_NETWORK_URL)

const changeProvider = async () => {
  try {
    await web3.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }]
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default changeProvider

