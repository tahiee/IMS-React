import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Loader() {
    return (
        <Box sx={{ display: 'flex', height:"150px", width:"150px" }}>
            <Typography variant='h4'>
            <CircularProgress />

            {/* PleaseLogin */}
            </Typography>
            
        </Box>
    );
}