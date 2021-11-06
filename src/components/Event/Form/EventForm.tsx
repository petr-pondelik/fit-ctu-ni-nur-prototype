import React, {Component} from "react";
import {Button, Grid, Typography} from "@mui/material";
import AppTextField from "../../Common/AppTextField";
import ImageUpload from "../../Common/ImageUpload";
import Events, {IEventData} from "../../../model/Events";
import EventDateTimePicker from "../DateTimePicker/EventDateTimePicker";
import {Event} from "../../../model/Events";
import EventLocation from "./EventLocation";
import AppTextArea from "../../Common/AppTextArea";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {User} from "../../../model/Users";
import * as _ from "lodash"


interface IEventCreateFormProps extends RouteComponentProps {
    user: User,
    event?: Event
}

interface IStateFragment {
    data?: IEventData
}

interface IEventCreateFormState {
    data: IEventData
}


class EventForm extends Component<IEventCreateFormProps, IEventCreateFormState> {

    getDefaultData(): IEventData {
        let unfinished: IEventData|undefined = Events.fetchUnfinished();
        if (unfinished !== undefined) {
            return {
                title: unfinished.title,
                imgPath: unfinished.imgPath,
                location: unfinished.location,
                eventTime: {
                    start: unfinished.eventTime.start !== null ? new Date(unfinished.eventTime.start) : null,
                    end: unfinished.eventTime.end !== null ? new Date(unfinished.eventTime.end) : null
                },
                description: unfinished.description,
                organizer: unfinished.organizer,
                attendants: unfinished.attendants
            }
        }
        if (this.props.event instanceof Event) {
            return {
                title: this.props.event.title,
                imgPath: this.props.event.imgPath,
                location: this.props.event.location,
                eventTime: {
                    start: this.props.event.eventTime.start,
                    end: this.props.event.eventTime.end !== null ? this.props.event.eventTime.end : null
                },
                description: this.props.event.description,
                organizer: this.props.event.organizer,
                attendants: this.props.event.attendants
            }
        }
        return {
            title: null,
                imgPath: null,
            location: null,
            eventTime: {
            start: null,
                end: null
            },
            description: null,
            organizer: this.props.user.id,
            attendants: null
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
        let newState = _.merge(this.state, stateFragment);
        this.setState(newState);
    }

    toAttendantsAction = () => {
        Events.storeUnfinished(this.state.data);
        this.props.history.push(`/event/${this.props.event ? 'edit/' + this.props.event.id : 'create'}/attendants`);
    }

    render() {
        console.log('RENDER EventForm');
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
                    <EventLocation
                        location={this.state.data.location}
                        updateParent={this.update}
                    />
                </Grid>
                <Grid item mt={"2.5rem"}>
                    <AppTextArea
                        name={'description'}
                        label={'Popis'}
                        minRows={5}
                        defaultValue={this.state.data.description}
                        updateParent={this.update}
                    />
                </Grid>
                <Grid container item alignItems={"center"} mt={"2.5rem"}>
                    <Grid item>
                        <Typography variant={"h5"} component={"h2"}>
                            Pozvánky na událost
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => this.toAttendantsAction()}>
                            <AddBoxOutlinedIcon fontSize={"large"}/>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

}

export default withRouter(EventForm);