import { gql } from '@apollo/client'

export const GET_TRADE = gql`
  query getTrade($id: Int!) {
    getTrade(id: $id) {
      idPerson
    }
  }
`
