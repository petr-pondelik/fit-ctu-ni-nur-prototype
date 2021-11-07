import React from "react";
import {Link} from "react-router-dom";
import LoginForm from "../../components/Login/LoginForm/LoginForm";
import {Button, Grid} from "@mui/material";

interface LoginProps {
    propagateState(key: string, data: any): any
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
                    <Button component={Link} to={"/registration"} variant="contained" fullWidth>Registrovat se</Button>
                </Grid>
            </Grid>
        )
    }
}

export default Login;
