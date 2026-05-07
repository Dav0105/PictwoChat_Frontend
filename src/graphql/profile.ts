import { gql } from "@apollo/client";

export type ProfileResponse = {
  profile: {
    email: string;
    username: string;
    pfp?: string;
  };
};

// export type ProfileVariables = {};

export type UpdateProfileResponse = {
  updateProfile: {
    email: string;
    username: string;
    pfp?: string;
  };
};

export type UpdateProfileVariables = {
  email: string;
  username: string;
  pfp?: string;
};

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      email
      username
      pfp
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($email: String!, $username: String!, $pfp: String) {
    updateProfile(email: $email, username: $username, pfp: $pfp) {
      email
      username
      pfp
    }
  }
`;
