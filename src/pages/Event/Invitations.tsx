import React from "react";
import {Grid} from "@mui/material";
import {User} from "../../model/Users";
import CommonHeader, {ActionType} from "../../components/Header/CommonHeader";
import Events, {EventInvitationStatus, IEventContactState, IEventData, IUserContactsStates} from "../../model/Events";
import ContactsInvitation from "../../components/Event/Invitation/ContactsInvitation";
import EInvitationSource from "../../enums/EInvitationSource";
import {RouteComponentProps, withRouter} from "react-router-dom";


interface IRouteParams {
    id?: string
}

export interface IAttendantsFromContactsProps extends RouteComponentProps<IRouteParams> {
    user: User
}

export interface IAttendantsFromContactsState {
    eventData: IEventData,
    contactsState: IUserContactsStates,
    alertOpened: boolean,
    originalContactsState: IUserContactsStates
}


/**
 * @param props
 * @constructor
 */
class Invitations extends React.Component<IAttendantsFromContactsProps, IAttendantsFromContactsState> {

    /**
     * @param props
     */
    constructor(props: IAttendantsFromContactsProps) {
        super(props);
        let eventData = Events.fetchUnfinished();
        if (eventData === undefined) {
            eventData = {
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
        this.state = {
            eventData: eventData,
            contactsState: Events.getUnfinishedEventContactsState(this.props.user),
            alertOpened: false,
            originalContactsState: Events.getUnfinishedEventContactsState(this.props.user)
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    /**
     * @param source
     * @param state
     */
    update = (source: EInvitationSource, state: IEventContactState[]) => {
        let newEventData: IEventData = this.state.eventData;
        if (newEventData.attendants === null) { newEventData.attendants = {}; }
        let newContactsState = this.state.contactsState;
        for (const st of state) {
            if (!st.invited) {
                delete newEventData.attendants[parseInt(st.userId)];
            }
        }
        for (const inv of state) {
            if (inv.invited) {
                newEventData.attendants[parseInt(inv.userId)] = {
                    id: inv.userId,
                    status: EventInvitationStatus.Pending,
                    source: source
                }
            }
            for (const [source, sourceList] of Object.entries(this.state.contactsState)) {
                for (const [inx, cs] of Object.entries(sourceList)) {
                    if ((cs as IEventContactState).userId === inv.userId) {
                        newContactsState[source as keyof IUserContactsStates][inx as unknown as number].invited = inv.invited;
                    }
                }
            }
        }
        this.setState({
            eventData: newEventData,
            contactsState: newContactsState
        });
    }

    /**
     * @param userId
     */
    cancelInvitation = (userId: string) => {
        let newEventData: IEventData = Object.assign(this.state.eventData);
        if (newEventData.attendants === null) { return; }
        delete newEventData.attendants[parseInt(userId)];

        let newContactsState = this.state.contactsState;

        for (const [source, sourceList] of Object.entries(this.state.contactsState)) {
            for (const [inx, cs] of Object.entries(sourceList)) {
                if ((cs as IEventContactState).userId === userId) {
                    newContactsState[source as keyof IUserContactsStates][inx as unknown as number].invited = false;
                }
            }
        }

        this.setState({
            eventData: newEventData,
            contactsState: newContactsState
        });
    }

    goBack = () => {
        let id: string|undefined = this.props.match.params.id;
        this.props.history.push( `/event/${id ? 'edit/' + id : 'create'}#invitations`);
    }

    saveInvitations = () => {
        Events.storeUnfinished(this.state.eventData);
        let id: string|undefined = this.props.match.params.id;
        this.props.history.push( `/event/${id ? 'edit/' + id : 'create'}#invitations`);
    }

    selectionDiffers = () => {
        for (const [gKey, group] of Object.entries(this.state.contactsState)) {
            for (const cKey of Object.keys(group)) {
                // @ts-ignore
                if (this.state.contactsState[gKey][cKey].invited !== this.state.originalContactsState[gKey][cKey].invited) {
                    return true;
                }
            }
        }
        return false;
    }

    render = () => {
        return (
            <Grid container direction={"column"} mt={"2rem"} pb={"1rem"}>
                <Grid item>
                    <CommonHeader
                        title={'Pozv??nky na ud??lost'}
                        actionType={ActionType.SAVE}
                        // showDialog={this.selectionDiffers()}
                        showDialog={false}
                        yesAction={this.saveInvitations}
                        noAction={this.goBack}
                    />
                </Grid>
                <Grid container direction={"column"} item sx={{paddingX: "5%", paddingY: "2rem"}}>
                    <Grid item>
                    <ContactsInvitation
                        eventData={this.state.eventData}
                        contacts={this.state.contactsState}
                        updateParent={this.update}
                        parentCancelInvitation={this.cancelInvitation}
                    />
                    </Grid>
                    {/*<Grid item sx={{paddingX: "5%", paddingY: "2rem"}}>*/}
                    {/*    <ActionButton variant={"contained"} clickHandler={this.saveInvitations}>*/}
                    {/*        Potvrdit v??b??r*/}
                    {/*    </ActionButton>*/}
                    {/*</Grid>*/}
                </Grid>
            </Grid>
        );
    }

}

export default withRouter(Invitations);