import React from "react";
import LoginForm from "../../components/Login/LoginForm/LoginForm";
import {Grid} from "@mui/material";
import {AppState} from "../../App";
import ActionButton from "../../components/Common/ActionButton";

interface LoginProps {
    propagateState: (key: keyof AppState, data: any) => any
}

class Login extends React.Component<LoginProps> {

    /**
     * @param key
     * @param data
     */
    updateState = (key: any, data: any) => {
        this.props.propagateState(key, data);
    }

    render() {
        return (
            <Grid
                container
                direction={"column"}
                justifyContent={"space-around"}
                minHeight={"100vh"}
                paddingX={"5%"}
                textAlign={"center"}
            >
                <Grid item>
                    <h1>EVENTER</h1>
                </Grid>
                <Grid item>
                    <LoginForm propagateState={this.updateState}/>
                </Grid>
                <Grid item>
                    <p className={'ion-text-center'}>Ještě nemáte účet?</p>
                    <ActionButton variant={"contained"}>Registrovat se</ActionButton>
                </Grid>
            </Grid>
        )
    }
}

export default Login;
