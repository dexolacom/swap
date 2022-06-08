import { gql } from '@apollo/client'

export const UPDATE_USERNAME = gql`
  mutation updateName($id: Int!, $name: String!) {
    updateName(id: $id, name: $name) {
      id
      name
    }
  }
`
