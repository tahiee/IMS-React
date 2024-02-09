import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { deleteDocument, getAllData } from "../../../firebase/firebasemethod";
import { auth } from "../../../firebase/firebaseConfig";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const AllCourse = () => {
  const [getAllCourse, setGetAllCourse] = useState([]);

  //Button Effect
  const [open, setOpen] = React.useState(false);
  const handleClick = async (id) => {
    console.log(id);
    try {
      const deletkrnahai = await deleteDocument("AddCourse", id);
      console.log(deletkrnahai);
      const result = getAllCourse.filter(
        (courseObj) => courseObj.documentId != id
      );
      console.log(result);
      setGetAllCourse(result);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  //Button Effect End

  useEffect(() => {
    const fetchGetAllCourse = async () => {
      try {
        const data = await getAllData("AddCourse");
        setGetAllCourse(data);
      } catch (error) {
        console.log("Error fetching students data:", error);
      }
    };
    fetchGetAllCourse();
  }, []);

  return (
    <>
      <Container sx={{ padding: 2 }}>
        <Grid container spacing={2} justifyContent="space-evenly">
          {getAllCourse.map((AllCourse, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  maxWidth: 675,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20 }}
                    variant="h5"
                    component="div"
                  >
                    Sir Name:{AllCourse.SirNameValue}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 20 }}
                    variant="h5"
                    component="div"
                  >
                    Days:{AllCourse.Days}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 20 }}
                    variant="h5"
                    component="div"
                  >
                    Course:{AllCourse.SubjectValue}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      handleClick(AllCourse.documentId);
                    }}
                  >
                    Delete
                  </Button>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      variant="filled"
                      sx={{ width: "100%" }}
                    >
                      Successfully Deleted!
                    </Alert>
                  </Snackbar>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AllCourse;
