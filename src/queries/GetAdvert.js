import { gql } from '@apollo/client'

export const GET_ADVERT = gql`
  query getAdvert($id: Int!) {
    getAdvert(id: $id) {
      id
      idSellAsset
      idBuyAsset
      price
      idPerson
      minAmount
      maxAmount
      nftTokenId
      person {
        name
        publicAddress
      }
      sellAsset {
        name
        address
      }
      buyAsset {
        name
        address
      }
    }
  }
`
