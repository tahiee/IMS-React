import { Box, Typography } from '@mui/material'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const StudentDash = () => {
const navigate = useNavigate()
  const GotoForms = () => {
    navigate('/admission')
  }
  return (
    <>
      <Typography className='text-center mt-4' variant='h5'>Welcome to Student Dashboard</Typography>
      <Box className='d-flex justify-content-around text-center mt-4'>
        <Button onClick={GotoForms} >Admission Form</Button>
      </Box>
    </>
  )
}

export default StudentDash