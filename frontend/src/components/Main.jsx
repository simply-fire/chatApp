import React, { useEffect, useState } from 'react'
import Editor from "../Editor";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import ResponsiveAppBar from './Nav'
import { useSocketContext } from '../contexts/SocketContext';
import { useRef } from 'react';
import MH from './MH';
// const socket = io.connect('http://localhost:3000');

const Main = () => {

    const effectRan = useRef(false);
    const effectRan1 = useRef(false);
    const { socket } = useSocketContext()
    const [message, setMessage] = useState(null);
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState([]);
    const [username, setUsername] = useState();
    const getMessageData = (data) => {
        setMessage(data);
        console.log(data);
    }

    useEffect(() => {

        if (effectRan.current === false) {
            socket.on('roomUsers', ({ room, users }) => {
                // display room ontop
                // display the users present on the side bar
                setUsers(users)
                console.log(users);
            })
            // Get the message from the server
            // socket.emit('shoot', null)
            socket.on('welcomeMsg', ({ msg, id, username }) => {
                console.log(id);
                localStorage.setItem('id', id);
                console.log("here", msg);
                setChat(chat => [...chat, msg]);
                setUsername(username);
            })

            socket.on('message', (message) => {
                // console.log(message);
                setChat(chat => [...chat, message]);
            })
        }

        return () => { effectRan.current = true }

    }, [socket])

    useEffect(() => {
        if (effectRan1.current === false) {
            if (message != null) {
                socket.emit('chatMessage', { msg: message, id: localStorage.getItem('id') })
                setMessage(null);

            }
        }
        return () => { effectRan.current = true }
    }, [message])
    return (
        <>
            <Box sx={{
                minWidth: '15vw',
                width: '25%',
                height: '100vh',
                float: 'left',
                background: 'rgb(157, 178, 191)',
                backgroundSize: 'cover',
                boxSizing: 'border-box'
            }}>
                <Box>
                    <Typography fontWeight={600} sx={{
                        color: '#27374D', background: '#DDE6ED',
                        margin: '0.5vh', width: '95%', borderRadius: '5px'
                    }} variant='h4'> Active Users</Typography>
                    <List>
                        {users.map((val, ind) => {
                            return (
                                <ListItem sx={{
                                    background: '#526D82',
                                    margin: '0.5vh',
                                    boxSizing: 'border-box',
                                    width: '95%',
                                    fontWeight: '700',
                                    borderRadius: '5px',
                                }} key={ind + 'item'}>
                                    <ListItemText sx={{ color: '#DDE6ED' }} key={ind} primary={val.username} />
                                </ListItem>)
                        })}
                    </List>
                    {/* {JSON.stringify(users[0].username)} */}
                </Box>
            </Box >
            <Box sx={{
                width: '75%',
                height: '100vh',
                float: 'right',
                background: '#DDE6ED',
                backgroundSize: 'cover',
                boxSizing: 'border-box'
            }}>
                <Box sx={{ width: '100%', position: 'sticky' }}>
                    <ResponsiveAppBar username={username} />
                </Box>
                <Box sx={{ height: '68vh', width: '100%', overflowY: 'scroll' }}>
                    {chat && chat.map((i) => (
                        <MH username={i.username} date={i.time} message={i.text} />
                    ))}
                </Box>
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '75%',
                    display: "flex",
                    justifyContent: 'center'
                }}>
                    <Editor setMessage={getMessageData} />

                </Box>
            </Box >
        </>
    )
}

export default Main