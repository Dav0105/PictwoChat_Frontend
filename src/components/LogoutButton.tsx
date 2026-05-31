import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import client from '../lib/apolloClient'

function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    localStorage.removeItem('token')
    await client.clearStore()         
    navigate('/login')
  }

  return (
    <Button
      variant="contained"
      color="error"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}

export default LogoutButton