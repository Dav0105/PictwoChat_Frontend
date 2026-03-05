import { Box, Typography, Button, Container, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { sketchStyle } from '../theme'

function Login() {
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
            Login
          </Typography>

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                ...sketchStyle,
                '&:hover fieldset': { borderColor: 'transparent' },
                '& fieldset': { border: 'none' },
              }
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                ...sketchStyle,
                '&:hover fieldset': { borderColor: 'transparent' },
                '& fieldset': { border: 'none' },
              }
            }}

          />

          <Button variant="contained" sx={{ width: '100%', mt: 1 }}>
            Login to your account
          </Button>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Don't have an account yet ?{' '}
            <Link to="/register" style={{ color: 'inherit', fontWeight: 'bold' }}>
              Register
            </Link>
          </Typography>

        </Box>
      </Container>
    </Box>
  )
}

export default Login
