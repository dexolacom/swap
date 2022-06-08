import { gql } from '@apollo/client'

export const GET_LIST_CHATS = gql`
  query getListChats($idPerson: Int) {
    listChats(idPerson: $idPerson) {
      id
      idAdvert
      idOwnerAdvert
      advert {
        price
        minAmount
        maxAmount
        nftTokenId
        sellAsset {
          name
          chainId
        }
        buyAsset {
          name
          chainId
        }
      }
      message {
        time
        text
      }
      owner {
        id
        name
      }
      participant {
        name
        publicAddress
      }
    }
  }
`
