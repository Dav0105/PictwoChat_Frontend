import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation Register($email :String!, $username :String!, $password_hash :String!) {
    register(email: $email, username: $username, password_hash: $password_hash) {
        token
    }
  }
`;

export const LOGIN = gql`
  mutation login($email :String!, $password_hash :String!) {
    login(email: $email, password_hash: $password_hash) {
        token
    }
  }
`;
