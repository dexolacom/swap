import { gql } from '@apollo/client'

export const MSG_SUBSCRIPTION = gql`
  subscription newMessage {
    newMessage {
      id
      text
    }
  }
`;

// export const GET_ADVERT = gql`
//   query getAdvert($id: Int!) {
//     getAdvert(id: $id) {
//       id
//       idSellAsset
//       idBuyAsset
//     }
//   }
// `