import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query getSingleUser($_id:ID!) {
    getSingleUser(_id:$_id) {
        _id
        username
        email
        password
        savedBooks
    }
}`