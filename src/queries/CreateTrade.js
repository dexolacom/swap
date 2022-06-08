import { gql } from '@apollo/client'

export const CREATE_TRADE = gql`
  mutation createTrade(
    $idAdvert: Int
    $idSellAsset: Int
    $idBuyAsset: Int
    $sellAssetAddress: String
    $buyAssetAddress: String
    $sellAmount: Float
    $buyAmount: Float
    $sendETHTo: String
    $deadline: Date
    $idPerson: Int
    $idNotifyUser: Int
    $idTradeContract: Int
    $statusTrade: String
    $chainId: Int!
    $isConfirm: Boolean
    $nftTokenId: Int
  ) {
    createTrade(
      fields: {
        idAdvert: $idAdvert
        idSellAsset: $idSellAsset
        idBuyAsset: $idBuyAsset
        sellAssetAddress: $sellAssetAddress
        buyAssetAddress: $buyAssetAddress
        sellAmount: $sellAmount
        buyAmount: $buyAmount
        sendETHTo: $sendETHTo
        deadline: $deadline
        idPerson: $idPerson
        idNotifyUser: $idNotifyUser
        idTradeContract: $idTradeContract
        statusTrade: $statusTrade
        chainId: $chainId
        isConfirm: $isConfirm
        nftTokenId: $nftTokenId
      }
    ) {
      idAdvert
      idSellAsset
      idBuyAsset
      sellAssetAddress
      buyAssetAddress
      sellAmount
      buyAmount
      sendETHTo
      deadline
      idPerson
      idNotifyUser
      idTradeContract
      statusTrade
      chainId
      isConfirm
      nftTokenId
    }
  }
`
