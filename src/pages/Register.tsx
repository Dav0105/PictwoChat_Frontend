import { Box, Typography, Button, Container, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { sketchStyle } from '../theme'

function Register() {
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
            Register
          </Typography>

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />

          <Button variant="contained" sx={{ width: '100%', mt: 1 }}>
            Create account
          </Button>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            Already have an account ?{' '}
            <Link to="/login" style={{ color: 'inherit', fontWeight: 'bold' }}>
              Login
            </Link>
          </Typography>

        </Box>
      </Container>
    </Box>
  )
}

export default Register
