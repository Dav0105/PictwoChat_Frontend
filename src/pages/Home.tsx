import { Box, Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { letterColors } from '../theme'
import DrawBox from '../components/DrawBox'

const title = "PictwoChat"

function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 8 }}>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '2px' }}>
            {title.split('').map((letter, index) => (
              <Box
                key={index}
                component="span"
                sx={{
                  fontSize: { xs: '3rem', md: '5rem' },
                  fontWeight: 'bold',
                  color: letterColors[index % 3],
                  display: 'inline-block',
                  animation: 'wave 1.5s ease-in-out infinite',
                  animationDelay: `${index * 0.1}s`,
                  '@keyframes wave': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                  },
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </Box>
            ))}
          </Box>
          {/* <Box sx={{
            width: '600px',
            height: '400px',
            backgroundColor: 'white',
            border: '2px solid #1a1a1a',
            borderRadius: '8px 6px 10px 7px / 7px 10px 6px 9px',
            boxShadow: '3px 3px 0px #1a1a1a',
            mx: 'auto',
          }} /> */}
          <DrawBox width={"600px"} height={"400px"}/>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { xs: '100%', sm: '400px' }, mx: 'auto', mt: '30px' }}>
            <Button variant="contained" sx={{ width: '100%' }}>
              Login
            </Button>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="secondary" sx={{ width: '100%' }}>
                Register
              </Button>
            </Link>
          </Box>

        </Box>
      </Container>
    </Box>
  )
}

export default Home
