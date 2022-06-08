import { gql } from '@apollo/client'

export const EDIT_ADVERT = gql`
  mutation editAdvert(
    $id: Int!
    $idSellAsset: Int
    $idBuyAsset: Int!
    $price: Float!
    $minAmount: Float
    $maxAmount: Float
    $nftTokenId: Int
  ) {
    editAdvert(
      id: $id
      fields: {
        idSellAsset: $idSellAsset
        idBuyAsset: $idBuyAsset
        price: $price
        minAmount: $minAmount
        maxAmount: $maxAmount
        nftTokenId: $nftTokenId
      }
    ) {
      idSellAsset
      idBuyAsset
      price
      minAmount
      maxAmount
      nftTokenId
    }
  }
`
