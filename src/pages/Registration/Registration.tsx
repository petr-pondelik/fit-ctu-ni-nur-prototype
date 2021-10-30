import './Registration.css';
import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import {Grid} from "@mui/material";

const Registration: React.FC = () => {
    return (
        <Grid
            container
            direction={"column"}
            justifyContent={"space-around"}
            height={"100vh"}
            textAlign={"center"}
            rowSpacing={2}
        >
            <Grid item>
                <h1>EVENTER</h1>
            </Grid>
            <Grid item>
                <SignUpForm/>
            </Grid>
        </Grid>
    );
};

export default Registration;
