import { gql } from '@apollo/client'

export const GET_CHAT = gql`
  query getChat($id: Int) {
    getChat(id: $id) {
      id
      idAdvert
      owner {
        name
      }
      participant {
        name
      }
      advert {
        id
      }
    }
  }
`
