import { Box, Typography, Button, Container, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { sketchStyle } from '../theme'
import { LOGIN } from '../graphql/auth.ts'
import { useMutation } from '@apollo/client/react'
import { useState } from 'react'

function Login() {

  const [login, { data, loading, error }] = useMutation(LOGIN);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
          />

          <Button variant="contained" sx={{ width: '100%', mt: 1 }} onClick={() => login({ variables: { email, password_hash: password } }) }>
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
