import React, {Component} from "react";
import {Grid} from "@mui/material";
import AppTextField from "../../../Common/AppTextField";
import ImageUpload from "../../../Common/ImageUpload";
import AppDateTimePicker from "../../../Common/AppDateTimePicker";
import ActionButton from "../../../Common/ActionButton";


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
                <Grid item mt={"2rem"}>
                    <ImageUpload/>
                </Grid>
                <Grid container item direction={"column"} mt={"2rem"}>
                    <Grid item sx={{ textAlign: "center" }}>
                        <AppDateTimePicker
                            toolbarTitle={"Zvolte datum a čas začátku"}
                            textHelper={"Datum a čas začátku"}
                        />
                    </Grid>
                    <Grid item>
                        <AppDateTimePicker
                            toolbarTitle={"Zvolte datum a čas konce"}
                            textHelper={"Datum a čas konce"}
                        />
                    </Grid>
                </Grid>
                <Grid container item direction={"column"} mt={"1rem"}>
                    <Grid item>
                        <ActionButton
                            text={"Přidat čas konce"}
                            clickHandler={() => console.log('clicked')}
                        />
                    </Grid>
                    <Grid item>
                        <ActionButton
                            text={"Odebrat čas konce"}
                            clickHandler={() => console.log('clicked')}
                        />
                    </Grid>
                </Grid>
            </Grid>
        );
    }

}