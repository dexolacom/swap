import { gql } from '@apollo/client'

export const AUTH_USER = gql`
  mutation authUser($publicAddress: String!, $signature: String!) {
    authUser(publicAddress: $publicAddress, signature: $signature) {
      id
      name
      address
      nonce
      token
    }
  }
`

export const CHECK_USER = gql`
  mutation checkUser($publicAddress: String!) {
    checkUser(publicAddress: $publicAddress) {
      id
      nonce
      token
      address
      publicAddress
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($fields: UserInput!) {
    createUser(fields: $fields) {
      id
      nonce
      token
      address
      publicAddress
    }
  }
`
