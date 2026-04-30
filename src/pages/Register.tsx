import { Box, Typography, Button, Container, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { sketchStyle } from '../theme'

import { REGISTER } from '../graphql/auth.ts'
import type { RegisterResponse, RegisterVariables } from '../graphql/auth.ts'

import { useMutation } from '@apollo/client/react'
import { useState } from 'react'



function Register() {

  const navigate = useNavigate()

  const [register, { loading, error }] = useMutation<RegisterResponse, RegisterVariables>(REGISTER);

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    try {
      const result = await register({
        variables: {
          email,
          username,
          password_hash: password,
        }
      })

      const token = result.data?.register?.token
      if (token) {
        localStorage.setItem('token', token)
        navigate('/rooms')
      }
    }
    catch {
      // handle errors
    }
  }

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            fullWidth
          />

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

          {error && (
            <Typography color="error" variant="body2">
              {error.message}
            </Typography>
          )}

          <Button variant="contained" sx={{ width: '100%', mt: 1 }} onClick={handleRegister} disabled={loading}>
            {loading ? 'Registering in...' : 'Create your account'}
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
