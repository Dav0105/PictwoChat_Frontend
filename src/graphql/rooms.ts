import { gql } from "@apollo/client";
import client from "../lib/apolloClient";

export type CreateRoomResponse = {
    createRoom: {
        _id: string;
    };
};

export type CreateRoomVariables = {
    name: string;
};



export const CREATE_ROOM = gql`
  mutation CreateRoom($name: String!) {
    createRoom(name: $name) {
      _id
    }
  }
`;

export { CREATE_ROOM as CreateRoom };

export async function createRoomMutation(name: string): Promise<string> {
    const result = await client.mutate<CreateRoomResponse, CreateRoomVariables>({
        mutation: CREATE_ROOM,
        variables: { name }
    });
    return result.data?.createRoom._id || "";
}