import { gql } from '@apollo/client'

export const EDIT_TRADE = gql`
  mutation editTrade($id: Int!, $fields: TradeInput!) {
    editTrade(id: $id, fields: $fields) {
      id
    }
  }
`
