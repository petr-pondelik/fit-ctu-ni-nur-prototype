import './Registration.css';
import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import {Grid} from "@mui/material";
import ActionButton from "../../components/Common/ActionButton";

const Registration: React.FC = () => {
    return (
        <Grid
            container
            direction={"column"}
            justifyContent={"space-around"}
            height={"100vh"}
            paddingX={"5%"}
            textAlign={"center"}
            rowSpacing={2}
        >
            <Grid item>
                <p>LOGO</p>
            </Grid>
            <Grid item>
                <SignUpForm/>
            </Grid>
        </Grid>
    );
};

export default Registration;
