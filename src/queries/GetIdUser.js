import { gql } from '@apollo/client'

export const GET_ID_USER = gql`
  query getIdUser($publicAddress: String!) {
    getIdUser(publicAddress: $publicAddress) {
      id
      publicAddress
      name
    }
  }
`
