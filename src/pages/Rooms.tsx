import { LogoutOutlined, Person, } from "@mui/icons-material"
import { Button, Box, Container, Stack, Typography, TextField } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useEffect, useState } from "react"
import { Modal } from "@mui/material"
import { getRooms } from "../graphql/chat"
import client from "../lib/apolloClient"
import { createRoomMutation, removeRoomMutation } from "../graphql/rooms"
import LogoutButton from '../components/LogoutButton'
import Logo from "../components/Logo"
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '@mui/icons-material/Settings'

type RoomProps = {
  roomName: string,
  num_users: number
  room_size: number
}

type RoomListItem = {
    _id: string
    name: string
    createdBy?: string
}

// Create RoomPop up
function CreateRoomPopup({ onClose, onSuccess }: { onClose: () => void; onSuccess?: (roomId: string) => void }) {
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!roomName.trim()) {
      alert("Please enter a room name");
      return;
    }

    setIsLoading(true);
    try {
      const roomId = await createRoomMutation(roomName);
      console.log("Room created with ID:", roomId);
      setRoomName("");
      onClose();
      onSuccess?.(roomId);
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Failed to create room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      backgroundColor: 'white',
      border: '2px solid #1a1a1a',
      borderRadius: '8px 6px 10px 7px / 7px 10px 6px 9px',
      boxShadow: '3px 3px 0px #1a1a1a',
      p: 4,
    }}>
      <Typography variant="h6" color="black" gutterBottom>
        Create a new room
      </Typography>
      <TextField
        fullWidth
        label="Room Name"
        variant="outlined"
        margin="normal"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        disabled={isLoading}
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreate}
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? "Creating..." : "Create"}
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isLoading}
          fullWidth
        >
          Cancel
        </Button>
      </Box>
    </Box>
  )
}

function Room({ roomId, roomName, canDelete, onDelete }: { roomId: string; roomName: string; canDelete: boolean; onDelete: (id: string) => void }) {
    return (
        <Box color={"white"} sx={{
            width: '400px',
            backgroundColor: 'white',
            border: '2px solid #1a1a1a',
            padding: '10px',
            borderRadius: '8px 6px 10px 7px / 7px 10px 6px 9px',
            boxShadow: '3px 3px 0px #1a1a1a',
            mx: 'auto',
        }} >
            <Typography variant="body1" color="black">{roomName}</Typography>
            <Box display={'flex'} justifyContent={'flex-end'} gap={1}>
                <Link to={`/chat/${roomId}`}>
                    <Button variant="contained" color="secondary">Join</Button>
                </Link>
                {canDelete && (
                    <Button variant="contained" color="error" onClick={() => onDelete(roomId)}>
                        <DeleteIcon />
                    </Button>
                )}
            </Box>
        </Box>
      </Box>

    </Box>
  )
}

function Rooms() {
  const [showPopup, setShowPopup] = useState(false)
  const [rooms, setRooms] = useState<RoomListItem[]>([])
  const [isLoadingRooms, setIsLoadingRooms] = useState(true)
  const [roomsError, setRoomsError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const loadRooms = async () => {
      try {
        const result = await client.query<{ rooms: RoomListItem[] }>({
          query: getRooms,
          fetchPolicy: "network-only",
        })

        if (!isMounted) {
          return
        }

        setRooms(result.data?.rooms ?? [])
        setRoomsError(null)
      } catch (error) {
        if (!isMounted) {
          return
        }

        console.error("Error loading rooms:", error)
        setRoomsError("Failed to load rooms.")
      } finally {
        if (isMounted) {
          setIsLoadingRooms(false)
        }
      }
    }

    void loadRooms()

    const handleDeleteRoom = async (id: string) => {
        if (!window.confirm("Delete this room?")) return;
        try {
            await removeRoomMutation(id);
            setRooms(prev => prev.filter(r => r._id !== id));
        } catch (e) {
            console.error("Error deleting room:", e);
            alert("Failed to delete room");
        }
    };

    const currentUserId = getUserId();

    return (
        <>
            <Modal open={showPopup} onClose={handleClosePopup}>
                <CreateRoomPopup
                    onClose={handleClosePopup}
                    onSuccess={handleRoomCreated}
                />
            </Modal>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', minHeight: '100vh' }}>
                <Link to="/profile" style={{ textDecoration: 'none', position: 'fixed', top: 16, left: 16, zIndex: 10 }}>
                    <Button variant="contained" color="secondary" startIcon={<SettingsIcon />}>
                        Settings
                    </Button>
                </Link>
                <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 10 }}>
                    <LogoutButton />
                </Box>
                <Container maxWidth="md">
                    <Stack gap={"20px"}>
                        {isLoadingRooms && <Typography color="black">Loading rooms...</Typography>}
                        {roomsError && <Typography color="error">{roomsError}</Typography>}
                        {rooms.map((room) => (
                            <Room
                                key={room._id}
                                roomId={room._id}
                                roomName={room.name}
                                canDelete={room.createdBy === currentUserId}
                                onDelete={handleDeleteRoom}
                            />
                        ))}
                    </Stack>
                </Container>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 10 }}
                    onClick={() => setShowPopup(true)}
                >
                    Create Room
                </Button>
            </Box>
        </>
    )
}

function getUserId(): string | null {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64)).userId;
    } catch {
        return null;
    }
}

export default Rooms
