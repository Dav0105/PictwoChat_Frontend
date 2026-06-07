import { gql } from "@apollo/client";

export type MessageItem = {
  _id: string;
  text?: string;
  image?: string;
  user: { _id: string; username: string };
};

export type RoomMessagesResponse = { roomMessages: MessageItem[] };
export type RoomMessagesVars = { room_id: string };

export type SendMessageResponse = { sendMessage: MessageItem };
export type SendMessageVars = {
  user_id: string;
  room_id: string;
  text?: string;
  image?: string;
};

export const GET_ROOM_MESSAGES = gql`
  query RoomMessages($room_id: String!) {
    roomMessages(room_id: $room_id) {
      _id
      text
      image
      user {
        _id
        username
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($user_id: String!, $room_id: String!, $text: String, $image: String) {
    sendMessage(user_id: $user_id, room_id: $room_id, text: $text, image: $image) {
      _id
      text
      user {
        _id
        username
      }
    }
  }
`;

// On garde getRooms, mais on ajoute _id pour pouvoir ouvrir le bon chat
export const getRooms = gql`
  query GetRooms {
    rooms {
      _id
      name
    }
  }
`;