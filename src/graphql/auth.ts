import { gql } from "@apollo/client";

export type RegisterResponse = {
  register: {
    token: string;
  };
};

export type RegisterVariables = {
  email: string;
  username: string;
  password: string;
};

export const REGISTER = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
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
  password: string;
};

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
