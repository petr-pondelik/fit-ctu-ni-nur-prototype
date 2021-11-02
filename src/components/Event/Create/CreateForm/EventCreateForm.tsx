import React, {Component} from "react";
import {Grid, Paper} from "@mui/material";
import AppTextField from "../../../Common/AppTextField";
import ImageUpload from "../../../Common/ImageUpload";


interface IEventCreateFormProps {

}

interface IEventCreateFormState {

}


export default class EventCreateForm extends Component<IEventCreateFormProps, IEventCreateFormState> {

    /**
     * @param props
     */
    constructor(props: IEventCreateFormProps) {
        super(props);
    }

    render() {
        return (
            <Grid container item direction={"column"}>
                <Grid item>
                    <AppTextField
                        type={"text"}
                        name={"event-title"}
                        label={"Název"}
                        changeHandler={(e) => {
                        }}
                    />
                </Grid>
                <Grid item mt={"3rem"}>
                    <ImageUpload/>
                </Grid>
            </Grid>
        );
    }

}