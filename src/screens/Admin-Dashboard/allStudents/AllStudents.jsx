import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import { getAllData } from '../../../firebase/firebasemethod';
import { useEffect, useState } from 'react';
// import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
// import StudentsDetails from './StudentsDetails';
import { useNavigate } from 'react-router-dom';
import StudentsDetails from './StudentsDetails';


export const AllStudents = () => {
  const navigate = useNavigate()
  const [studentsData, setStudentsData] = useState([]);
  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const data = await getAllData('admissions');
        setStudentsData(data);
      } catch (error) {
        console.log('Error fetching students data:', error);
      }
    };
    fetchStudentsData();
  }, []);


  const handleDetailsClick = () => {
    console.log('details worked');
    navigate('/studentDetails')

  }

  return (
    <>
      <Box sx={{ padding: 2 }} >
      <Grid container spacing={2} justifyContent="space-evenly">
        {studentsData.map((student, index) => ( 
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>

          <Card
            key={index}
            sx={{ maxWidth: 315, marginLeft: "12px", marginTop: "10px" }}
          >
            <CardMedia
              sx={{ height: 120 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="Student Picture"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {student.firstName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {student.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Course: {student.courseOption}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {student.stid}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" type='button' onClick={handleDetailsClick}>Details</Button>
            </CardActions>
          </Card>
          </Grid>
        ))}
        </Grid>
      </Box>

    </>
  );
};
