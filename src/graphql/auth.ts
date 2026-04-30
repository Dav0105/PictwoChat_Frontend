import { gql } from "@apollo/client";

export type RegisterResponse = {
  register: {
    token: string;
  };
};

export type RegisterVariables = {
  email: string;
  username: string;
  password_hash: string;
};

export const REGISTER = gql`
  mutation Register(
    $email: String!
    $username: String!
    $password_hash: String!
  ) {
    register(
      email: $email
      username: $username
      password_hash: $password_hash
    ) {
      token
    }
  }
`;

export type LoginResponse = {
  login: {
    token: string;
  };
};

export type LoginVariables = {
  email: string;
  password_hash: string;
};

export const LOGIN = gql`
  mutation login($email: String!, $password_hash: String!) {
    login(email: $email, password_hash: $password_hash) {
      token
    }
  }
`;
