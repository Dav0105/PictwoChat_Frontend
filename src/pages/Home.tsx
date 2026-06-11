import { Box, Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import DrawBox from '../components/DrawBox'
import Logo from '../components/Logo'

function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Logo animate={true}/>
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
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" sx={{ width: '100%' }}>
                Login
              </Button>
            </Link>
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
