import { gql } from '@apollo/client'

export const CREATE_MSG = gql`
  mutation createMessage($idSender: Int, $text: String, $idChat: Int) {
    createMessage(fields: { idSender: $idSender, text: $text, idChat: $idChat }) {
      id
      idSender
      text
      idChat
    }
  }
`
