import { Person, } from "@mui/icons-material"
import { Button, Box, Container, Stack, Typography, TextField } from "@mui/material"
import { Link } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useState } from "react"
import { Modal } from "@mui/material"

type RoomProps = {
    roomName: string,
    num_users: number
    room_size: number
}

const roomsCreation = false

// Create RoomPop up
function CreateRoomPopup() {
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
            <TextField fullWidth label="Room Name" variant="outlined" margin="normal" />
            <Link to="/chat" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                Create
            </Button>
            </Link>
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

    return (
        <>
            <Modal open={showPopup} onClose={() => setShowPopup(false)}>
                <CreateRoomPopup />
            </Modal>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', minHeight: '100vh' }}>
                <Link to="/" style={{ textDecoration: 'none', position: 'absolute', top: 16, left: 16 }}>
                    <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon />}>
                        Back
                    </Button>
                </Link>
                <Container maxWidth="md">
                    <Stack gap={"20px"}>
                        <Room roomName={"Room A"} num_users={2} room_size={8} />
                        <Room roomName={"Room B"} num_users={5} room_size={8} />
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
