import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
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
export const SAVE_BOOK = gql`
  mutation saveBook(
    $bookId: String!
    $authors: [String]
    $title: String!
    $description: String!
    $image: String
  ) {
    saveBook(
      bookId: $bookId
      authors: $authors
      title: $title
      description: $description
      image: $image
    ) {
      _id
      username
      savedBooks {
        bookId
        authors
        title
        description
        image
        link
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      savedBooks {
        bookId
        authors
        title
        description
        image
        link
      }
    }
  }
`;

// bookId: String!, authors: [String], title: String!, description: String!, image: String
