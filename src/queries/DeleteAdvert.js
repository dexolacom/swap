import { gql } from '@apollo/client'

export const DELETE_ADVERT = gql`
    mutation deleteAdvert($id:Int!, $isArchived: Boolean!) {
        deleteAdvert(id:$id, isArchived: $isArchived) {
            id,
            idSellAsset,
            idBuyAsset,
            price,
            minAmount,
            maxAmount,
        }
    }
`

