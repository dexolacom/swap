import { gql } from '@apollo/client'

export const CREATE_ASSET = gql`
  mutation createAsset($fields: AssetInput!) {
    createAsset(fields: $fields) {
      id
      name
      address
      chainId
      fullName
    }
  }
`
