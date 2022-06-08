import { gql } from '@apollo/client'

export const CREATE_CHAT = gql`
  mutation createChat($idAdvert: Int!, $idParticipant: Int!) {
    createChat(idAdvert: $idAdvert, idParticipant: $idParticipant) {
      id
      idAdvert
      idOwnerAdvert
      advert {
          id
      }
      owner {
          id
      }
    }
  }
`
