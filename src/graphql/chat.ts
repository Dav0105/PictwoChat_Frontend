import { gql } from "@apollo/client";

export type GetRoomsResponse = {
  rooms: string[];
  //nb_users: number;
};

export type RoomVariables = {
  room: string;
  //nb_users: number;
};

export type MessageVariables = {
  username: string;
  room: string;
  timestamp: string;
  text?: string;
  image?: string; // base64 image
};

export const sendMessage = gql`
  mutation SendMessage(
    $username: String!
    $room: String!
    $timestamp: String!
    $text: String
    $image: String
  ) {
    sendMessage(
      username: $username
      room: $room
      timestamp: $timestamp
      text: $text
      image: $image
    ) {
      success
    }
  }
`;

export const getMessages = gql`
  query GetMessages($room: String!) {
    messages(room: $room) {
      username
      room
      timestamp
      text
      image
    }
  }
`;

export const getRooms = gql`
  query GetRooms {
    rooms {
      name
      
    }
  }
`;
