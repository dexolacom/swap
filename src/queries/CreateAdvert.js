import { gql } from '@apollo/client'

export const CREATE_ADVERT = gql`
  mutation createAdvert(
    $idSellAsset: Int
    $idBuyAsset: Int!
    $price: Float!
    $minAmount: Float
    $maxAmount: Float
    $nftTokenId: Int
    $idPerson: Int
    $chainId: Int!
  ) {
    createAdvert(
      fields: {
        idSellAsset: $idSellAsset
        idBuyAsset: $idBuyAsset
        price: $price
        minAmount: $minAmount
        maxAmount: $maxAmount
        idPerson: $idPerson
        chainId: $chainId
        nftTokenId: $nftTokenId
      }
    ) {
      idSellAsset
      idBuyAsset
      price
      minAmount
      maxAmount
      idPerson
      chainId
      nftTokenId
    }
  }
`
