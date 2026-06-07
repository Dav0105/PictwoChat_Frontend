import { Person, } from "@mui/icons-material"
import { Button, Box, Container, Stack, Typography, TextField } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useEffect, useState } from "react"
import { Modal } from "@mui/material"
import { getRooms } from "../graphql/chat"
import client from "../lib/apolloClient"
import { createRoomMutation, removeRoomMutation } from "../graphql/rooms"
import LogoutButton from '../components/LogoutButton'
import DeleteIcon from '@mui/icons-material/Delete'

type RoomProps = {
    roomName: string,
    num_users: number
    room_size: number
}

type RoomListItem = {
    _id: string
    name: string
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

function Room({ roomId, roomName, num_users, room_size, onDelete }: RoomProps & { roomId: string; onDelete: (id: string) => void }) {

    return (
        <Box color={"white"} sx={{
            width: '400px',
            // height: '100px',
            backgroundColor: 'white',
            border: '2px solid #1a1a1a',
            padding: '10px',
            borderRadius: '8px 6px 10px 7px / 7px 10px 6px 9px',
            boxShadow: '3px 3px 0px #1a1a1a',
            mx: 'auto',
        }} >

            <Typography variant="body1" color="black">{roomName}</Typography>

            <Box display={'flex'}>
                <Box sx={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto', marginRight: 'auto' }}>
                    <Person color="disabled" />
                    <Typography variant="subtitle1" color="black">{num_users}/{room_size}</Typography>
                </Box>

                <Box display={'flex'} justifyContent={'right'}>
                    <Link to={`/chat/${roomId}`}>
                        <Button variant="contained" color="secondary">Join</Button>
                    </Link>
                    <Button variant="contained" color="error" onClick={() => onDelete(roomId)}>
                        <DeleteIcon />
                    </Button>
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

        return () => {
            isMounted = false
        }
    }, [])

    const handleClosePopup = () => {
        setShowPopup(false)
    }

    const handleRoomCreated = (roomId: string) => {
        console.log("Room created successfully, navigating to chat with room ID:", roomId)
        navigate(`/chat/${roomId}`)
    }

    return (
        <>
            <Modal open={showPopup} onClose={handleClosePopup}>
                <CreateRoomPopup
                    onClose={handleClosePopup}
                    onSuccess={handleRoomCreated}
                />
            </Modal>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', minHeight: '100vh' }}>
                <Link to="/" style={{ textDecoration: 'none', position: 'absolute', top: 16, left: 16 }}>
                    <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon />}>
                        Back
                    </Button>
                </Link>
                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                    <LogoutButton />
                </Box>
                <Container maxWidth="md">
                    <Stack gap={"20px"}>
                        {isLoadingRooms && <Typography color="black">Loading rooms...</Typography>}
                        {roomsError && <Typography color="error">{roomsError}</Typography>}
                        {rooms.map((room) => (
                            <Room key={room._id} roomId={room._id} roomName={room.name} num_users={1} room_size={8} />
                        ))}
                    </Stack>
                </Container>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    onClick={() => setShowPopup(true)}
                >
                    Create Room
                </Button>
            </Box>
        </>
    )
}

export default Rooms
