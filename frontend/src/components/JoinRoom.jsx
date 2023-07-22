import { useSocketContext } from '../contexts/SocketContext';
import './tet.css'

import { Box, Typography, Paper, TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



const JoinRoom = () => {

  const { socket } = useSocketContext()

  const [username, setusername] = useState();
  const [room, setroom] = useState();
  const navigate = useNavigate();

  const handleClick = () => {
    socket.emit('joinRoom', { username, room });
    navigate('/room')
  }

  // useEffect(() => {
  //   socket.on('message', m => { console.log(m) })
  // }, [socket])

  return (
    <>
      <Box sx={{
        width: '100%',
        height: '100vh',
        background: '#DDE6ED',
        backgroundSize: 'cover',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Paper elevation={10} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '5vh',
          minWidth: '350px',
          width: '30vw',
          minHeight: '25vh',
          background: '#27374D'
        }}>
          <Typography variant='h5' fontWeight={600} sx={{ color: '#9DB2BF' }}>Join Room</Typography>
          <TextField InputLabelProps={{
            sx: {
              color: "#9DB2BF"
            }
          }} onChange={e => setusername(e.target.value)} label='username' fullWidth
            sx={{ margin: '2vh', marginBottom: '0', input: { color: '#DDE6ED' } }}></TextField>
          <TextField InputLabelProps={{
            sx: {
              color: "#9DB2BF",
            }
          }} onChange={e => setroom(e.target.value)} label='Room Id' fullWidth
            sx={{
              margin: '2vh', marginBottom: '0',
              input: { color: '#DDE6ED' }

            }}></TextField>
          <Button onClick={handleClick} fullWidth sx={{ margin: '2vh', color: '#DDE6ED', background: '#526D82', ":hover": { background: '#4a6478' } }}>
            <Typography variant='h5' fontWeight={600} sx={{ color: '#27374D', color: '#9DB2BF' }}>Join Room</Typography></Button>
        </Paper>
      </Box>
    </>
  )
}

export default JoinRoom