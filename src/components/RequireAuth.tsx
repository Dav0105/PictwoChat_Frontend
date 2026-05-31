import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type RequireAuthProps = {
  children: ReactNode
}

function RequireAuth({ children }: RequireAuthProps) {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return <>{children}</>
}

export default RequireAuth
