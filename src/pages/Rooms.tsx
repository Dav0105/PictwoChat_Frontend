import { Person, } from "@mui/icons-material"
import { Button, Box, Container, Stack, Typography, TextField } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState } from "react"
import { Modal } from "@mui/material"
import { createRoomMutation } from "../graphql/rooms"

type RoomProps = {
    roomName: string,
    num_users: number
    room_size: number
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

function Room({ roomName, num_users, room_size }: RoomProps) {
                
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
                    <Link to="/chat">
                        <Button variant="contained" color="secondary">
                            Join
                        </Button>
                    </Link>
                </Box>
            </Box>

        </Box>
    )
}

function Rooms() {
    const [showPopup, setShowPopup] = useState(false)
    const [rooms, setRooms] = useState([
        //{ roomName: "Room A", num_users: 2, room_size: 8 },
        //{ roomName: "Room B", num_users: 5, room_size: 8 }
    ])
    const navigate = useNavigate()

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
                <Container maxWidth="md">
                    <Stack gap={"20px"}>
                        {rooms.map((room, idx) => (
                            <Room 
                                key={idx}
                                roomName={room.roomName} 
                                num_users={room.num_users} 
                                room_size={room.room_size} 
                            />
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
