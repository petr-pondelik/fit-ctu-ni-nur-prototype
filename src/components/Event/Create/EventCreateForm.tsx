import React, {Component} from "react";
import {Button, Grid, Typography} from "@mui/material";
import AppTextField from "../../Common/AppTextField";
import ImageUpload from "../../Common/ImageUpload";
import {IAttendantsList, ILocation} from "../../../model/Events";
import merge from "merge-objects";
import EventDateTimePicker from "../DateTimePicker/EventDateTimePicker";
import {Event} from "../../../model/Events";
import moment, {Moment} from "moment";
import EventCreateLocation from "./EventCreateLocation";
import AppTextArea from "../../Common/AppTextArea";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import {Link} from "react-router-dom";

interface IEventData {
    title?: string,
    imgPath?: string,
    location?: ILocation,
    eventTime: {
        start?: Moment,
        end?: Moment
    },
    description?: string,
    attendants?: IAttendantsList
}

interface IEventCreateFormProps {
    event?: Event
}

interface IStateFragment {
    data?: IEventData
}

interface IEventCreateFormState {
    data: IEventData
}


export default class EventCreateForm extends Component<IEventCreateFormProps, IEventCreateFormState> {

    getDefaultData(): IEventData {
        if (this.props.event instanceof Event) {
            return {
                title: this.props.event.title,
                imgPath: this.props.event.imgPath,
                location: this.props.event.location,
                eventTime: {
                    start: moment(this.props.event.eventTime.start),
                    end: this.props.event.eventTime.end !== undefined ? moment(this.props.event.eventTime.end) : undefined
                },
                description: undefined,
                attendants: undefined
            }
        }
        return {
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
    }

    /**
     * @param props
     */
    constructor(props: IEventCreateFormProps) {
        super(props);
        this.state = { data: this.getDefaultData() };
    }

    /**
     * @param stateFragment
     */
    update = (stateFragment: IStateFragment) => {
        console.log('EventCreateForm update');
        let stateUpdate: IEventCreateFormState = this.state;
        let newState: IEventCreateFormState = merge(stateUpdate, stateFragment);
        console.log(newState);
        this.setState(newState);
    }

    render() {
        console.log(this.state);

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
                <Grid item mt={"2.5rem"}>
                    <ImageUpload
                        name={"imgPath"}
                        defaultValue={this.state.data.imgPath}
                        updateParent={this.update}
                    />
                </Grid>
                <Grid container item direction={"column"} mt={"2.5rem"}>
                    <EventDateTimePicker
                        name={"eventTime"}
                        value={this.state.data.eventTime}
                        updateParent={this.update}
                    />
                </Grid>
                <Grid item mt={"2.5rem"}>
                    <EventCreateLocation
                        location={this.state.data.location}
                        updateParent={this.update}
                    />
                </Grid>
                <Grid item mt={"2.5rem"}>
                    <AppTextArea
                        name={'description'}
                        label={'Popis'}
                        minRows={5}
                        updateParent={this.update}
                    />
                </Grid>
                <Grid container item alignItems={"center"} mt={"2.5rem"}>
                    <Grid item>
                        <Typography variant={"h5"} component={"h2"}>
                            Pozvaní lidé
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button component={Link} to={`/event/${this.props.event ? 'edit/' + this.props.event.id : 'create'}/attendants`}>
                            <AddBoxOutlinedIcon fontSize={"large"}/>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

}