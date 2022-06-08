import { gql } from '@apollo/client'

export const GET_INITIAL_ACQUISITION_USERS = gql`
  query getUsers {
    users(first: 1000) {
      user
    }
  }
`
