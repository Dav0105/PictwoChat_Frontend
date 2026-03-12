import { Box, Typography, Button, Container, TextField, Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { sketchStyle } from '../theme'
import { useRef } from 'react'

function Profile() {
    const inputRef = useRef(null)
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            position: 'relative',
            backgroundColor: 'background.default',
        }}>

        <Link to="/" style={{ textDecoration: 'none', position: 'absolute', top: 16, left: 16 }}>
        <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon />}>
        Back
        </Button>
        </Link>

        <Container maxWidth="xs">

        <Box sx={{
            ...sketchStyle,
            backgroundColor: 'background.paper',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
        }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
        Profile settings
        </Typography>

             <TextField
        label="Name"
        defaultValue={"John Doe"}
        fullWidth
        />

        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 3,
            minWidth: '100%',
            alignItems: 'center',
        }}>



        <Avatar sx={{ width: 70, height: 70 }}>H</Avatar>


        <TextField
        label="link"
        fullWidth
        />


       <Button
      variant="contained"
      color="secondary"
      onClick={() => inputRef.current.click()}
    >
      Upload
    </Button>
    <input
      type="file"
      ref={inputRef}
      onChange={(e) => console.log(e.target.files)}
      style={{ display: 'none' }}
      accept="image/*"
    />

        </Box>



        <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        />

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            pt:4,
            minWidth: '100%'
        }}>

        <TextField
        label="Old Password"
        type="password"
        variant="outlined"
        fullWidth
        />

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            pt:4,
            gap:2,
            minWidth: '100%'
        }}>

        <TextField
        label="New password"
        type="password"
        variant="outlined"
        fullWidth
        />

        <TextField
        label="Repeat new password"
        type="password"
        variant="outlined"
        fullWidth
        />

        </Box>
        </Box>

        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 3,
            minWidth: '100%'
        }}>

        <Button variant="contained" color="primary" sx={{ width: '100%', mt: 1 }}>
        Update my infos
        </Button>

        <Button variant="contained" color="error" sx={{ width: '100%', mt: 1 }}>
        Delete my account
        </Button>
        </Box>
        </Box>
        </Container>
        </Box>
    )
}

export default Profile
