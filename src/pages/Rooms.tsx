import { Person } from "@mui/icons-material"
import { Button, Box, Container, Stack, Typography } from "@mui/material"

type RoomProps = {
    roomName: string,
    num_users: number
    room_size: number
}

function Room({roomName, num_users, room_size}: RoomProps) {

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
                <Box sx={{display: 'flex', marginTop: 'auto', marginBottom: 'auto', marginRight: 'auto'}}>
                    <Person color="disabled"/>
                    <Typography variant="subtitle1" color="black">{num_users}/{room_size}</Typography>
                </Box>

                <Box display={'flex'} justifyContent={'right'}>
                    <Button variant="contained" color="secondary">
                        Join
                    </Button>
                </Box>
            </Box>

        </Box>
    )
}

function Rooms() {
    

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', minHeight: '100vh' }}>
            <Container maxWidth="md">
                <Stack gap={"20px"}>
                    <Room roomName={"Room A"} num_users={2} room_size={8}/>
                    <Room roomName={"Room B"} num_users={5} room_size={8}/>
                </Stack>
                
            </Container>
        </Box>
    )
}

export default Rooms