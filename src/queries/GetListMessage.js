import { gql } from '@apollo/client'

export const LIST_MESSAGE = gql`
  query listMessage {
    listMessage {
      id
      idSender
      text
      time
      idChat
      sender {
        publicAddress
      }
    }
  }
`
