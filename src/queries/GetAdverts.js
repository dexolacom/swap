import { gql } from '@apollo/client'

export const GET_ADVERTS = gql`
  query getAdverts($chainId: Int!) {
    listAdverts(chainId: $chainId) {
      id
      isArchived
      idSellAsset
      idBuyAsset
      nftTokenId
      price
      person {
        name
        publicAddress
      }
      minAmount
      maxAmount
      idPerson
      sellAsset {
        name
      }
      buyAsset {
        name
      }
    }
  }
`

export const GET_MY_ADVERTS = gql`
  query getMyAdverts($idUser: Int!, $chainId: Int!) {
    myAdverts(idUser: $idUser, chainId: $chainId) {
      id
      idSellAsset
      idBuyAsset
      nftTokenId
      price
      minAmount
      maxAmount
      idPerson
      isArchived
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
