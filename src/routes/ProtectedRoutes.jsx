import { Box } from "@mui/material";
import Loader from "../components/Loader";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebasemethod";

function ProtectedRoutes(props) {
    const { component } = props;

    //state
    const [loader, setLoader] = useState(true);

    //navigate
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log({ user });
            if (user) {
                setLoader(false);
                // alert("Login Successfully");
            } else {
                setLoader(true);
                navigate("/");
                // alert('please Check your Email & Password 1')
            }
        });

        // Cleanup the subscription on unmount
        return () => {
            // unsubscribe()
            console.log('han bhai');
        }

    }, []);  // Provide an empty dependency array

    return (
        <>
            {loader ? (
                <Box
                    sx={{ display: "flex", justifyContent: "center", marginTop: "20%" }}
                >
                    <Loader />
                </Box>
            ) : (
                component
            )}
        </>
    );
}

export default ProtectedRoutes;
