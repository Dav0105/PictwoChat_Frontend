import { Box, Typography, Button, Container, TextField, Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { sketchStyle } from '../theme'
import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import {
    GET_PROFILE,
    UPDATE_PROFILE,
    type ProfileResponse,
    type UpdateProfileResponse,
    type UpdateProfileVariables,
} from '../graphql/profile'

function Profile() {
    const { data } = useQuery<ProfileResponse>(GET_PROFILE)
    const [updateProfile, { loading }] = useMutation<UpdateProfileResponse, UpdateProfileVariables>(UPDATE_PROFILE)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [pfp, setPfp] = useState<string | undefined>(undefined)
    const [saved, setSaved] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (data?.profile) {
            setUsername(data.profile.username)
            setEmail(data.profile.email)
            setPfp(data.profile.pfp)
        }
    }, [data])

    const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const img = new Image()
        img.onload = () => {
            const canvas = document.createElement("canvas")
            const size = 200
            canvas.width = size
            canvas.height = size
            const ctx = canvas.getContext("2d")!
            ctx.drawImage(img, 0, 0, size, size)
            setPfp(canvas.toDataURL("image/jpeg", 0.8))
        }
        img.src = URL.createObjectURL(file)
    }

    const handleUpdate = async () => {
        setSaved(false)
        try {
            await updateProfile({ variables: { username, email, pfp } })
            setSaved(true)
        } catch (e) {
            console.error('Update failed:', e)
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', position: 'relative', backgroundColor: 'background.default' }}>
            <Link to="/rooms" style={{ textDecoration: 'none', position: 'absolute', top: 16, left: 16 }}>
                <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon />}>Back</Button>
            </Link>

            <Container maxWidth="xs">
                <Box sx={{ ...sketchStyle, backgroundColor: 'background.paper', p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant="h4" fontWeight="bold" textAlign="center">Profile settings</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'center' }}>
                        <Avatar src={pfp} sx={{ width: 70, height: 70 }}>
                            {username?.[0]?.toUpperCase()}
                        </Avatar>
                        <input type="file" ref={inputRef} onChange={handleAvatar} style={{ display: 'none' }} accept="image/*" />
                        <Button variant="contained" color="secondary" onClick={() => inputRef.current?.click()}>Upload</Button>
                    </Box>

                    <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
                    <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />

                    {saved && <Typography color="success.main" variant="body2">Profile updated!</Typography>}

                    <Button variant="contained" color="primary" onClick={handleUpdate} disabled={loading} sx={{ width: '100%' }}>
                        {loading ? 'Saving...' : 'Update my infos'}
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

export default Profile