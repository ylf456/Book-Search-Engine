import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username:$usermane, email: $email, password: $password) {
        _id
        username
        password
    }
}`

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
       
        username
       
      }
    }
  }
`;
export const SAVE_BOOK =gql`mutation saveBook($authors: String
    $description: String!,
    $bookId: String!,
    $image: String,
    $title: String!) {
        saveBook(authors: $email, description: $description, bookId: $bookId, image: $image, title: $title) {
           _id
           username
           savedBooks
        }
    }`

export const DELETE_BOOK= gql`mutation deleteBook($bookId: String!){
    deleteBook(bookId:$bookId){
        _id
        username
        savedBooks
    }
}`