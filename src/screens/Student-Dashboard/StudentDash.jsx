import { Box, Typography } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import studentDashvideo from "../../../img/student ani.mp4";
const StudentDash = () => {
  const navigate = useNavigate();
  const GotoForms = () => {
    navigate("/admission");
  };
  return (
    <>
      <video
        autoPlay
        loop
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <source src={studentDashvideo} type="video/mp4" />
      </video>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Typography className="text-center mt-4" variant="h5">
          Welcome to Student Dashboard
        </Typography>
        <Box className="d-flex justify-content-around text-center mt-4">
          <Button onClick={GotoForms}>Admission Form</Button>
        </Box>
      </div>
    </>
  );
};

export default StudentDash;
