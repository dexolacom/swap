import { gql } from '@apollo/client'

export const GET_TRADES = gql`
  query listTrades($idPerson: Int, $chainId: Int!) {
    listTrades(idPerson: $idPerson, chainId: $chainId) {
      id
      idPerson
      idSellAsset
      idBuyAsset
      sellAssetAddress
      buyAssetAddress
      sellAmount
      buyAmount
      sendETHTo
      deadline
      idNotifyUser
      idTradeContract
      statusTrade
      nftTokenId
      personNotify {
        name
        publicAddress
      }
      personSend {
        id
        name
        publicAddress
      }
      sellAsset {
        id
        name
        address
      }
      buyAsset {
        id
        name
        address
      }
      advert {
        id
        price
        minAmount
        maxAmount
      }
    }
  }
`

export const GET_TRADE_NFT_ID = gql`
  query getTradeNFT($nftTokenId: Int!) {
    getTradeNFT(nftTokenId: $nftTokenId) {
      nftTokenId
      statusTrade
    }
  }
`