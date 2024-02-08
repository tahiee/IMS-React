import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRef } from "react";
import { auth } from "../../../firebase/firebaseConfig";
import { sendData } from "../../../firebase/firebasemethod";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

export default function AddCourse() {
  const SirNameValue = useRef();
  const Days = useRef();
  const SubjectValue = useRef();

  const addCourseDetails = (e) => {
    e.preventDefault();
    console.log("addcoursedetails clicked");
    const user = auth.currentUser;
    const obj = {
      SirNameValue: SirNameValue.current.value,
      Days: Days.current.value,
      SubjectValue: SubjectValue.current.value,
      CourseId: user.uid,
    };
    try {
      sendData(obj, "AddCourse")
        .then((res) => {
          alert("Course Added Successfully");
          console.log("Course Add Hogya Firease May", res);
        })
        .catch((err) => {
          console.log("kuch masla hai", err);
        });
    } catch (error) {
      console.log("yeah tryCatch ka error hai", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "12px",
      }}
    >
      <Card sx={{ minWidth: 355 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} variant="h5" component="div">
            Add Course
          </Typography>
          <Grid item sx={{ marginTop: "12px" }} md={6} mb={4}>
            <TextField
              inputRef={SirNameValue}
              type="text"
              fullWidth
              id="SirName"
              label="Sir Name"
              variant="outlined"
              size="large"
            />
          </Grid>
          <Grid item sx={{ marginTop: "" }} md={6} mb={4}>
            <TextField
              inputRef={Days}
              type="text"
              fullWidth
              id="Days"
              label="Days"
              variant="outlined"
              size="large"
            />
          </Grid>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" size="large">
                <InputLabel id="subject-label">Course Option</InputLabel>
                <Select
                  inputRef={SubjectValue}
                  labelId="subject-label"
                  id="subject"
                  defaultValue={"Web & App Development"}
                  label="Course Option"
                >
                  <MenuItem value="" disabled>
                    Course want to Inrolled
                  </MenuItem>
                  <MenuItem value={"Web & App Development"}>
                    Web & App Development
                  </MenuItem>
                  <MenuItem value={"Flutter"}>Flutter</MenuItem>
                  <MenuItem value={"ChatBoat"}>ChatBoat</MenuItem>
                  <MenuItem value={"Graphic Desgine"}>Graphic Desgine</MenuItem>
                  <MenuItem value={"BlockChain"}>BlockChain</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            sx={{ marginLeft: "10px" }}
            variant="outlined"
            color="success"
            size="large"
            onClick={addCourseDetails}
          >
            Add Course
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
