import { gql } from '@apollo/client'

export const GET_STATS = gql`
 query getStats($chainId: Int!){
     getStats(chainId: $chainId){
         amountOfAdverts,
         amountOfTransactionPerWeek,
         increasedAmountForTransactionPerWeek,
         increasedAdvertsFor,
         gnbuTokenUsed,
         nbuTokenUsed,
         increasedGNBU,
         increasedNBU
     }
 }
`
