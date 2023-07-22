import { Box, Typography } from '@mui/material'
import React from 'react'

const MH = (props) => {
    return (
        <>
            <Box sx={{ borderRadius: '8px', padding: '2vh', float: 'right', margin: '3vh', width: '50%', minHeight: '4vh', background: '#526D82', color: '#DDE6ED' }}>
                <Typography sx={{ fontSize: 'small', fontWeight: '600', background: '#27374D', padding: '0.5vh', borderRadius: '5px' }} >{props.username}</Typography>
                <Typography dangerouslySetInnerHTML={{ __html: props.message }}></Typography>
                <Typography sx={{ fontSize: 'x-small', fontWeight: '600' }}>{props.date}</Typography>
            </Box>
        </>
    )
}

export default MH