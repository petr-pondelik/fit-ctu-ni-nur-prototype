import React, {Component} from "react";
import {Button, Grid, Typography} from "@mui/material";
import AppTextField from "../../Common/AppTextField";
import ImageUpload from "../../Common/ImageUpload";
import Events, {AttendantsList, Event, IAttendantsList, IEventData, ILocation} from "../../../model/Events";
import EventDateTimePicker from "../DateTimePicker/EventDateTimePicker";
import EventLocation from "./EventLocation";
import AppTextArea from "../../Common/AppTextArea";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {User} from "../../../model/Users";
import * as _ from "lodash"
import EventInvitationsEdit from "../Invitation/EventInvitationsEdit";
import {FormOperations} from "../../../enums/FormOperations";
import EditIcon from '@mui/icons-material/Edit';
import ActionButton from "../../Common/ActionButton";
import AlertDialog from "../../Common/AlertDialog";
import {ValidationFunction, ValidationTuple} from "../../../types/CustomeTypes";
import moment from "moment";
import EventInvitationsCreate from "../Invitation/EventInvitationsCreate";
import Messages from "../../../model/Messages";


interface IEventCreateFormProps extends RouteComponentProps {
    operation: FormOperations,
    user: User,
    event?: Event
}

interface IEventCreateFormState {
    data: IEventData,
    alertOpened: boolean,
    confirmCreateOpened: boolean,
    confirmUpdateOpened: boolean,
    messages: IMessagesState
}

interface IStateFragment {
    data?: IEventData,
    alertOpened?: boolean,
    messages?: IMessagesState
}

interface IValidationFunctions {
    title: ValidationFunction,
    imgPath: ValidationFunction,
    eventTime: ValidationFunction,
    location: ValidationFunction,
    description: ValidationFunction,
    attendants: ValidationFunction
}

interface IMessages {
    validation: {
        title: { required: string },
        imgPath: {},
        eventTime: { required: string },
        location: { required: string },
        description: {},
        attendants: { required: string }
    },
    global: {}
}

interface IValidationMessages {
    title: string | null,
    imgPath: string | null,
    eventTime: string | null,
    location: string | null,
    description: string | null,
    attendants: string | null
}


interface IMessagesState {
    validation: IValidationMessages,
    global: string | null
}


class EventForm extends Component<IEventCreateFormProps, IEventCreateFormState> {

    validated: boolean = false;

    stateUpdate?: IStateFragment;

    messages: IMessages = {
        validation: {
            title: {
                required: 'Zadejte n??zev ud??losti.'
            },
            imgPath: {},
            eventTime: {
                required: 'Zvolte ??as ud??losti.'
            },
            location: {
                required: 'Vyberte m??sto ud??losti.'
            },
            description: {},
            attendants: {
                required: 'Pozv??te alespo?? jednoho ??lov??ka.'
            }
        },
        global: {}
    };

    validationFunctions: IValidationFunctions;

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
                start: moment(new Date()).add(5, 'minute').toDate(),
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
            alertOpened: false,
            confirmCreateOpened: false,
            confirmUpdateOpened: false,
            messages: {
                validation: {
                    title: null,
                    imgPath: null,
                    eventTime: null,
                    location: null,
                    description: null,
                    attendants: null
                },
                global: null
            }
        };
        this.validationFunctions = {
            title: this.validateTitle,
            imgPath: this.validateImgPath,
            eventTime: this.validateEventTime,
            location: this.validateLocation,
            description: this.validateDescription,
            attendants: this.validateAttendants
        }
    }

    /**
     * @param key
     */
    getData = (key: string) => {
        let keyTyped = key as keyof IEventData;
        return this.state.data[keyTyped];
    }

    /**
     * @param key
     */
    getValidationFunction = (key: string) => {
        let validationFcKey: keyof IValidationFunctions = key as keyof IValidationFunctions;
        return this.validationFunctions[validationFcKey];
    }

    prepareValidationMessagesObj = () => {
        this.stateUpdate = {
            messages: {
                validation: {
                    title: null,
                    imgPath: null,
                    eventTime: null,
                    location: null,
                    description: null,
                    attendants: null
                },
                global: null
            }
        }
    }

    /**
     * @param key
     * @param msg
     */
    setValidationMessage = (key: string, msg: string | null) => {
        let keyTyped: keyof IValidationMessages = key as keyof IValidationMessages;
        if (this.stateUpdate && this.stateUpdate.messages && this.stateUpdate.messages.validation) {
            this.stateUpdate.messages.validation[keyTyped] = msg;
        }
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
        sessionStorage.setItem('eventChanges', JSON.stringify(newState));
        this.setState(newState);
    }

    createEvent = () => {
        this.validate();
        if (!this.validated) {
            window.scrollTo(0, 0);
            return;
        }
        this.setState({confirmCreateOpened: false});
        let resId = Events.insert(this.state.data);
        Events.clearUnfinished();
        Messages.push('Ud??lost ??sp????n?? vytvo??ena.');
        this.props.history.push(`/#${resId}`);
    }

    updateEvent = () => {
        this.validate();
        if (!this.validated) {
            window.scrollTo(0, 0);
            return;
        }
        console.log(Events.fetchUnfinished());
        if (!this.state.confirmUpdateOpened) {
            // @ts-ignore
            if (Events.fetchUnfinished() !== undefined && !_.isEqual(new AttendantsList(Events.fetchUnfinished().attendants), this.props.event.attendants))
            {
                this.setState({confirmUpdateOpened: true});
                return;
            }
        }
        if (this.props.event instanceof Event) {
            Events.update(this.props.event, this.state.data);
            Events.clearUnfinished();
            Messages.push('Ud??lost ??sp????n?? upravena.');
            this.props.history.push(`/#${this.props.event.id}`);
        }
    }

    deleteEvent = () => {
        if (this.props.event instanceof Event) {
            Events.delete(this.props.event);
            this.setState({alertOpened: false});
        }
        Messages.push('Ud??lost ??sp????n?? odstran??na.');
        this.props.history.push(`/`);
    }

    openAlertDialog = () => {
        this.setState({alertOpened: true});
    }

    openConfirmCreateDialog = () => {
        this.setState({confirmCreateOpened: true});
    }

    /**
     * @param title
     */
    validateTitle = (title: string | null): ValidationTuple => {
        if (typeof this.state.data.title !== 'string' || this.state.data.title === '') {
            return [false, this.messages.validation.title.required];
        }
        return [true, null];
    }

    /**
     * @param imgPath
     */
    validateImgPath = (imgPath: string | null): ValidationTuple => {
        return [true, null];
    }

    /**
     * @param eventTime
     */
    validateEventTime = (eventTime: { start: Date | null, end: Date | null }): ValidationTuple => {
        if (!(this.state.data.eventTime.start instanceof Date)) {
            return [false, this.messages.validation.eventTime.required];
        }
        return [true, null];
    }

    /**
     * @param location
     */
    validateLocation = (location: ILocation | null): ValidationTuple => {
        if (location === null) {
            return [false, this.messages.validation.location.required];
        }
        return [true, null];
    }

    /**
     * @param description
     */
    validateDescription = (description: string | null): ValidationTuple => {
        return [true, null];
    }

    /**
     * @param attendants
     */
    validateAttendants = (attendants: IAttendantsList|null): ValidationTuple => {
        if (attendants === null || Object.values(attendants).length < 1) {
            return [false, this.messages.validation.attendants.required];
        }
        return [true, null];
    }

    validate = () => {
        this.prepareValidationMessagesObj();
        let isValid = true;
        for (const dataKey of Object.keys(this.validationFunctions)) {
            let res: [boolean, string | null] = this.getValidationFunction(dataKey)(this.getData(dataKey));
            if (!res[0]) {
                this.setValidationMessage(dataKey, res[1])
                isValid = false;
            }
        }
        this.validated = isValid;
        if (this.stateUpdate !== undefined) {
            let newState: IEventCreateFormState = _.merge(this.state, this.stateUpdate);
            this.setState(newState);
        }
    }

    renderInvitationsIcon = () => {
        return this.state.data.attendants !== null && Object.values(this.state.data.attendants).length > 0 ?
            <EditIcon fontSize={"medium"}/> : <AddBoxOutlinedIcon fontSize={"large"}/>
    }

    renderActionBtn = () => {
        if (this.props.operation === FormOperations.Create) {
            return (
                <Grid item sx={{marginY: "0.75rem"}}>
                    <ActionButton variant={"contained"} clickHandler={this.openConfirmCreateDialog}>
                        Zalo??it ud??lost
                    </ActionButton>
                </Grid>
            );
        }
        return (
            <Grid item sx={{marginY: "0.75rem"}}>
                <ActionButton variant={"contained"} clickHandler={this.updateEvent}>
                    Ulo??it zm??ny
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
                    Smazat ud??lost
                </ActionButton>
            </Grid>
        );
    }

    renderEventInvitations = () => {
        if (this.props.operation === FormOperations.Create) {
            return <EventInvitationsCreate
                eventData={this.state.data}
                message={this.state.messages.validation.attendants}
            />
        } else {
            return <EventInvitationsEdit
                eventData={this.state.data}
                message={this.state.messages.validation.attendants}
            />
        }
    }

    render() {

        return (
            <React.Fragment>
                <Grid container item direction={"column"}>
                    <Grid item sx={{ marginY: "2rem"}}>
                        <AppTextField
                            type={"text"}
                            name={"title"}
                            label={"N??zev"}
                            defaultValue={this.state.data.title}
                            message={this.state.messages.validation.title}
                            updateParent={this.update}
                        />
                    </Grid>
                    <Grid item sx={{ marginY: "2rem"}}>
                        <ImageUpload
                            name={"imgPath"}
                            defaultValue={this.state.data.imgPath}
                            updateParent={this.update}
                        />
                    </Grid>
                    <Grid container item direction={"column"} sx={{ marginY: "2rem"}}>
                        <EventDateTimePicker
                            name={"eventTime"}
                            value={this.state.data.eventTime}
                            updateParent={this.update}
                        />
                    </Grid>
                    <Grid item sx={{ marginY: "2rem"}}>
                        <EventLocation
                            location={this.state.data.location}
                            message={this.state.messages.validation.location}
                            updateParent={this.update}
                        />
                    </Grid>
                    <Grid item sx={{ marginY: "2rem"}}>
                        <AppTextArea
                            name={'description'}
                            label={'Popis'}
                            minRows={5}
                            defaultValue={this.state.data.description}
                            updateParent={this.update}
                        />
                    </Grid>
                    <Grid container alignItems={"center"} sx={{ marginY: "2rem"}} id={"invitations"}>
                        <Grid container item alignItems={"center"} onClick={() => this.toInvitations()}>
                            <Grid item>
                                <Typography variant={"h5"} component={"h2"}>
                                    Pozv??nky na ud??lost
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button>
                                    {this.renderInvitationsIcon()}
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container item direction={"column"} pt={"1rem"} px={"2.5%"}>
                            {this.renderEventInvitations()}
                        </Grid>
                    </Grid>
                    <Grid container direction={"column"} item>
                        {this.renderActionBtn()}
                        {this.renderDeleteBtn()}
                    </Grid>
                </Grid>
                <AlertDialog
                    title={'Odstranit ud??lost'}
                    question={'Skute??n?? si p??ejete odstranit ud??lost?'}
                    open={this.state.alertOpened}
                    yesAction={this.deleteEvent}
                    noAction={() => { this.setState({ alertOpened: false }) }}
                />
                <AlertDialog
                    title={'Vytvo??it ud??lost'}
                    question={'P??ejete si vytvo??it ud??lost a rozeslat pozv??nky?'}
                    open={this.state.confirmCreateOpened}
                    yesAction={this.createEvent}
                    noAction={() => { this.setState({ confirmCreateOpened: false }) }}
                />
                <AlertDialog
                    title={'Upravit pozv??nky'}
                    question={'P??ejete si upravit ud??lost a rozeslat informace o zm??n??ch pozv??nek?'}
                    open={this.state.confirmUpdateOpened}
                    yesAction={this.updateEvent}
                    noAction={() => { this.setState({ confirmUpdateOpened: false }) }}
                />
            </React.Fragment>
        );
    }

}

export default withRouter(EventForm);