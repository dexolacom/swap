import { gql } from '@apollo/client'

export const GET_LIST_MESSAGE_CHAT = gql`
  query getListMessageChat($idChat: Int) {
    listMessageChat(idChat: $idChat) {
      id
      idSender
      text
      time
      idChat
      sender {
        id
        name
        publicAddress
      }
    }
  }
`
