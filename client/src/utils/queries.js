import { gql } from '@apollo/client';

export const Query_SINGLEUSER = gql`
query getSingleUser {
    getSingleUser {
        _id
        username
        email
        password
        savedBooks
    }
}`