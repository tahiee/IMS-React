import React, { useRef } from "react";
import "../style.css";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import { sendData } from "../firebase/firebasemethod";
import { auth } from "../firebase/firebaseConfig";
import { getSingleData } from "../firebase/firebasemethod";
import { useNavigate } from "react-router-dom";

const Admission = () => {
  const firstValue = useRef();
  const lastValue = useRef();
  const cnicValue = useRef();
  // const campusValue = useRef();
  const birthValue = useRef();
  const emailValue = useRef();
  const phoneValue = useRef();
  const courseValue = useRef();

  let navigate = useNavigate();

  const ToFirebase = async (e) => {
    e.preventDefault();
    console.log("firebase function called ");
    const user = auth.currentUser;
    // if (user) {
    const obj = {
      firstName: firstValue.current.value,
      lastName: lastValue.current.value,
      cnicNumber: cnicValue.current.value,
      // campus: campusValue.current.value,
      birthdayDate: birthValue.current.value,
      email: emailValue.current.value,
      phoneNumber: phoneValue.current.value,
      courseOption: courseValue.current.value,
      stid: user.uid,
    };

    try {
      const dataExist = await getSingleData("admissions", user.uid);
      console.log(dataExist);
      if (dataExist.length !== 0) {
        alert("You Had Already Submint the Form");
      } else {
        sendData(obj, "admissions")
          .then((res) => {
            console.log("Data sent to Firebase successfully", res);
            alert("Data sent to Firebase successfully");
          })
          .catch((error) => {
            console.error("Error sending data to Firebase:", error);
            alert("Failed to send data to Firebase");
          });
      }
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };

  return (
    <>
      <Container className="vh-102 gradient-custom">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className="h-100 w-100"
        >
          <Grid item xs={12} lg={9} xl={6}>
            <Card
              className="shadow-2-strong card-registration"
              style={{ borderRadius: 15 }}
            >
              <CardContent className="p-4 p-md-5">
                <Typography variant="h5" className="mb-4 pb-2 pb-md-0 mb-md-5">
                  Admission/Registration Form
                </Typography>
                <form>
                  <Grid container rowSpacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="firstName"
                        label="First Name"
                        inputRef={firstValue}
                        variant="outlined"
                        size="large"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        inputRef={lastValue}
                        variant="outlined"
                        size="large"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="number"
                        fullWidth
                        id="lastName"
                        label="CNIC Number"
                        inputRef={cnicValue}
                        variant="outlined"
                        size="large"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {/* <FormControl fullWidth variant="outlined" size="large">
                        <InputLabel id="subject-label">Campus</InputLabel>
                        <Select
                          labelId="subject-label"
                          id="subject"
                          label="Course Option"
                          defaultValue={"Bhadurabad"}
                          inputRef={campusValue}
                        >
                          <MenuItem value="" disabled>
                            Campus want to Inrolled
                          </MenuItem>
                          <MenuItem value={"Bhadurabad"}>Bhadurabad</MenuItem>
                          <MenuItem value={"Gulshan"}>Gulshan</MenuItem>
                        </Select>
                      </FormControl> */}
                    </Grid>
                  </Grid>

                  <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        type="date"
                        fullWidth
                        id="birthdayDate"
                        inputRef={birthValue}
                        variant="outlined"
                        size="large"
                        required
                      />
                    </Grid>
                    <Grid item md={6} mb={4}>
                      <Typography variant="h6" className="mb-2 pb-1">
                        Gender:{" "}
                      </Typography>
                      <RadioGroup row name="gender" defaultValue="male">
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>

                  <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="email"
                        id="emailAddress"
                        label="Your Email Address"
                        inputRef={emailValue}
                        variant="outlined"
                        size="large"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="number"
                        id="phoneNumber"
                        label="Phone Number"
                        inputRef={phoneValue}
                        variant="outlined"
                        size="large"
                        required
                      />
                    </Grid>
                  </Grid>

                  <Grid container rowSpacing={2}>
                    <Grid item xs={12} sx={{ marginTop: "30px" }}>
                      <FormControl fullWidth variant="outlined" size="large">
                        <InputLabel id="subject-label">
                          Course Option
                        </InputLabel>
                        <Select
                          labelId="subject-label"
                          id="subject"
                          defaultValue={"Web & App Development"}
                          label="Course Option"
                          inputRef={courseValue}
                          required
                        >
                          <MenuItem value="" disabled>
                            Course want to Inrolled
                          </MenuItem>
                          <MenuItem value={"Web & App Development"}>
                            Web & App Development
                          </MenuItem>
                          <MenuItem value={"ChatBoat"}>ChatBoat</MenuItem>
                          <MenuItem value={"Flutter"}>Flutter</MenuItem>
                          <MenuItem value={"Graphic Desgine"}>
                            Graphic Desgine
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Box sx={{display:"flex",justifyContent:'space-between',marginTop:"20px"}}>
                    <Box className="">
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        onClick={ToFirebase}
                      >
                        Submit
                      </Button>
                    </Box>
                    <Box className="">
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => navigate(-1)}
                      >
                        Back
                      </Button>
                    </Box>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Admission;
