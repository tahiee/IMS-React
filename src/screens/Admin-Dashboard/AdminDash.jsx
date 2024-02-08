import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AddCourse from '../Admin-Dashboard/addcourse/AddCourse';
import SingleCourse from '../Admin-Dashboard/singleCourse/SingleCourse';
import AllCourse from '../Admin-Dashboard/allCourse/AllCourse';
import {AllStudents} from '../Admin-Dashboard/allStudents/AllStudents';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function AdminDash() {
  const [state, setState] = React.useState({
    left: false
  });
  const navigate = useNavigate()
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Dashboard', 'AddCourse', 'SingleCourse', 'AllCourse'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => { text === 'Dashboard' ? navigate('/admin') : text === 'AddCourse' ? navigate('addcourse') : text === 'SingleCourse' ? navigate('singlecourse') : text === 'AllCourse' ? navigate('allcourse') : undefined }}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}

      </List>
      <Divider />
      <List>
        {['All Students'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => { text === 'All Students' ? navigate('allstudent') : undefined }} >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  return (
    <>
    <Box className='css-1c9go8c'>
      <Box className=''>
      <Stack direction="row" spacing={1} className='d-flex justify-content-around ' >
      <Button className='absolute' variant="contained" endIcon={<SendIcon />}>
          <div className='text-center mt-[30px]'>
            {['Welcome To Admin Dashboard'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button className='text-black' onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </div>
          </Button>
      </Stack>
      
      
      
      </Box>
          <Routes>
            <Route path='admin/*' element={<AdminDash />} />
            <Route path='singlecourse' element={<SingleCourse />} />
            <Route path='addcourse' element={<AddCourse />} />
            <Route path='allcourse' element={<AllCourse />} />
            <Route path='allstudent' element={<AllStudents />} />
          </Routes>
          </Box>
    </>
  );
}
