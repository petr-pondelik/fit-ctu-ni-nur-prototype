import React, {Component} from "react";
import {Grid} from "@mui/material";
import AppTextField from "../../../Common/AppTextField";
import ImageUpload from "../../../Common/ImageUpload";
import {IAttendantsList, ILocation} from "../../../../model/Events";
import merge from "merge-objects";
import EventDateTimePicker from "../../DateTimePicker/EventDateTimePicker";

interface IEventData {
    title?: string,
    imgPath?: string,
    location?: ILocation,
    eventTime: {
        start?: string,
        end?: string
    },
    description?: string,
    attendants?: IAttendantsList
}

interface IEventCreateFormProps {

}

interface IStateFragment {
    data?: IEventData
}

interface IEventCreateFormState {
    data: IEventData
}


export default class EventCreateForm extends Component<IEventCreateFormProps, IEventCreateFormState> {

    /**
     * @param props
     */
    constructor(props: IEventCreateFormProps) {
        super(props);
        this.state = {
            data: {
                title: undefined,
                imgPath: undefined,
                location: undefined,
                eventTime: {
                    start: undefined,
                    end: undefined
                },
                description: undefined,
                attendants: undefined
            }
        };
    }

    /**
     * @param stateFragment
     */
    update = (stateFragment: IStateFragment) => {
        let stateUpdate: IEventCreateFormState = this.state;
        let newState: IEventCreateFormState = merge(stateUpdate, stateFragment);
        this.setState(newState);
    }

    render() {
        return (
            <Grid container item direction={"column"}>
                <Grid item>
                    <AppTextField
                        type={"text"}
                        name={"title"}
                        label={"Název"}
                        defaultValue={this.state.data.title}
                        updateParent={this.update}
                    />
                </Grid>
                <Grid item mt={"2rem"}>
                    <ImageUpload
                        name={"imgPath"}
                        defaultValue={this.state.data.imgPath}
                        updateParent={this.update}
                    />
                </Grid>
                <EventDateTimePicker
                    name={"eventTime"}
                    value={this.state.data.eventTime}
                    updateParent={this.update}
                />
            </Grid>
        );
    }

}