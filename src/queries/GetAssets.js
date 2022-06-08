import { gql } from '@apollo/client'

export const GET_ASSETS = gql`
  query getAssets($chainId: Int) {
    assets(chainId: $chainId) {
      id
      name
      address
    }
  }
`
