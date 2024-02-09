import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
import { getAllData } from "../../../firebase/firebasemethod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentsDetails = () => {
  let navigate = useNavigate();

  const [studentsData, setStudentsData] = useState([]);
  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const data = await getAllData("admissions");
        setStudentsData(data);
      } catch (error) {
        console.log("Error fetching students data:", error);
      }
    };
    fetchStudentsData();
  }, []);
  return (
    <>
      <div className="text-center mt-2">StudentsDetails</div>
      <Box sx={{ padding: 2 }}>
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
                    {student.firstName} {student.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {student.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Course: {student.courseOption}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Capmus: {student.campus}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Birth Date: {student.birthdayDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone Number: {student.phoneNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cnic: {student.cnicNumber}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default StudentsDetails;
