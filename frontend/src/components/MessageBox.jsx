import { Box, Typography } from '@mui/material'
import React from 'react'

const MessageBox = (props) => {
    return (
        <>
            <Box sx={{ minWidth: '8vw', minHeight: '4vh', background: '#526D82', color: '#DDE6ED' }}>
                <Typography>{props.username}</Typography>
                <Typography>{props.message}</Typography>
                <Typography>{props.date}</Typography>
            </Box>
        </>
    )
}

export default MessageBox