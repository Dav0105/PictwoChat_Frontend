import { Box, Typography, Button, Container, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { sketchStyle } from '../theme'

// Style "dessin" réutilisé depuis votre thème — même ombre, mêmes bordures irrégulières


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

      {/* Bouton retour en haut à droite */}
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
            sx={{
              '& .MuiOutlinedInput-root': {
                ...sketchStyle,
                '&:hover fieldset': { borderColor: 'transparent' },
                '& fieldset': { border: 'none' },
              }
            }}
          />

          {/* Champ email */}
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
