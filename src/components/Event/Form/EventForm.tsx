import React, {Component} from "react";
import {Button, Grid, Typography} from "@mui/material";
import AppTextField from "../../Common/AppTextField";
import ImageUpload from "../../Common/ImageUpload";
import Events, {Event, IEventData} from "../../../model/Events";
import EventDateTimePicker from "../DateTimePicker/EventDateTimePicker";
import EventLocation from "./EventLocation";
import AppTextArea from "../../Common/AppTextArea";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {User} from "../../../model/Users";
import * as _ from "lodash"
import EventInvitations from "../Invitation/EventInvitations";
import {FormOperations} from "../../../enums/FormOperations";
import EditIcon from '@mui/icons-material/Edit';
import ActionButton from "../../Common/ActionButton";
import AlertDialog from "../../Common/AlertDialog";


interface IEventCreateFormProps extends RouteComponentProps {
    operation: FormOperations,
    user: User,
    event?: Event
}

interface IStateFragment {
    data?: IEventData,
    alertOpen?: boolean
}

interface IEventCreateFormState {
    data: IEventData,
    alertOpen: boolean
}


class EventForm extends Component<IEventCreateFormProps, IEventCreateFormState> {

    getDefaultData(): IEventData {
        let unfinished: IEventData | undefined = Events.fetchUnfinished();
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
        this.state = {
            data: this.getDefaultData(),
            alertOpen: false
        };
    }

    toInvitations = () => {
        Events.storeUnfinished(this.state.data);
        this.props.history.push(`/event/${this.props.event ? 'edit/' + this.props.event.id : 'create'}/attendants`);
    }

    /**
     * @param stateFragment
     */
    update = (stateFragment: IStateFragment) => {
        let newState = _.merge(this.state, stateFragment);
        this.setState(newState);
    }

    createEvent = () => {
        console.log('Create Event');
        Events.insert(this.state.data);
        Events.clearUnfinished();
        this.props.history.push(`/`);
    }

    updateEvent = () => {
        console.log('Update Event');
        Events.update(this.state.data);
        Events.clearUnfinished();
        this.props.history.push(`/`);
    }

    deleteEvent = () => {
        if (this.props.event instanceof Event) {
            Events.delete(this.props.event);
            this.setState({alertOpen: false});
        }
        this.props.history.push(`/`);
    }

    openAlertDialog = () => {
        this.setState({alertOpen: true});
    }

    renderInvitationsIcon = () => {
        return this.state.data.attendants !== null && Object.values(this.state.data.attendants).length > 0 ?
            <EditIcon fontSize={"medium"}/> : <AddBoxOutlinedIcon fontSize={"large"}/>
    }

    renderActionBtn = () => {
        if (this.props.operation === FormOperations.Create) {
            return (
                <Grid item sx={{marginY: "0.75rem"}}>
                    <ActionButton variant={"contained"} clickHandler={this.createEvent}>
                        Založit událost
                    </ActionButton>
                </Grid>
            );
        }
        return (
            <Grid item sx={{marginY: "0.75rem"}}>

                <ActionButton variant={"contained"} clickHandler={this.updateEvent}>
                    Uložit změny
                </ActionButton>
            </Grid>
        );
    }

    renderDeleteBtn = () => {
        if (this.props.operation === FormOperations.Create) {
            return '';
        }
        return (
            <Grid item sx={{marginY: "0.75rem"}}>
                <ActionButton variant={"contained"} color={"error"} clickHandler={this.openAlertDialog}>
                    Smazat událost
                </ActionButton>
            </Grid>
        );
    }

    render() {
        console.log('RENDER EventForm');
        console.log(this.state);

        return (
            <React.Fragment>
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
                    <Grid container alignItems={"center"} mt={"2.5rem"}>
                        <Grid container item alignItems={"center"}>
                            <Grid item>
                                <Typography variant={"h5"} component={"h2"}>
                                    Pozvánky na událost
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => this.toInvitations()}>
                                    {this.renderInvitationsIcon()}
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container item direction={"column"} pt={"1rem"} px={"2.5%"}>
                            <EventInvitations eventData={this.state.data}/>
                        </Grid>
                    </Grid>
                    <Grid container direction={"column"} item mt={"2.5rem"}>
                        {this.renderActionBtn()}
                        {this.renderDeleteBtn()}
                    </Grid>
                </Grid>
                <AlertDialog
                    open={this.state.alertOpen}
                    parentUpdate={this.update}
                    parentDeleteEvent={this.deleteEvent}
                />
            </React.Fragment>
        );
    }

}

export default withRouter(EventForm);