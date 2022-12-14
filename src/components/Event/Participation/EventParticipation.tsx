import React, {useState} from "react";
import {Grid} from "@mui/material";
import EventsModel, {Event, EventInvitationStatus} from "../../../model/Events";
import Confirmed from "./Confirmed";
import Declined from "./Declined";
import Tentative from "./Tentative";
import {User} from "../../../model/Users";

interface IEventParticipationProps {
    user: User,
    event: Event,
    updateParent(event: Event): void
}

/**
 * @param props
 * @constructor
 */
const EventParticipation: React.FC<IEventParticipationProps> = (props: IEventParticipationProps) => {

    const [invitationStatus, setInvitationStatus] = useState(props.event.attendants.getUsersPartStatus(props.user));

    /**
     *
     * @param newPartStatus
     */
    function handleChange(newPartStatus: EventInvitationStatus) {
        setInvitationStatus(newPartStatus);
        EventsModel.updateEventAttendance(props.user, props.event, newPartStatus);
        props.updateParent(EventsModel.findById(props.event.id) as Event);
    }

    function renderConfirmed(): any {
        if (invitationStatus === EventInvitationStatus.Pending) {
            return <Confirmed parentChange={handleChange}/>
        }
        return <Confirmed
            active={invitationStatus === EventInvitationStatus.Confirmed}
            parentChange={handleChange}
        />
    }

    function renderTentative(): any {
        if (invitationStatus === EventInvitationStatus.Pending) {
            return <Tentative parentChange={handleChange}/>
        }
        return <Tentative
            active={invitationStatus === EventInvitationStatus.Tentative}
            parentChange={handleChange}
        />
    }

    function renderDeclined(): any {
        if (invitationStatus === EventInvitationStatus.Pending) {
            return <Declined parentChange={handleChange}/>
        }
        return <Declined
            active={invitationStatus === EventInvitationStatus.Declined}
            parentChange={handleChange}
        />
    }

    return (
        <Grid
            container
            alignItems={"center"}
            justifyContent={"space-around"}
            sx={{ paddingY: "0.5rem", minHeight: "76px" }}
        >
            <Grid item>
                {renderConfirmed()}
            </Grid>
            <Grid item>
                {renderTentative()}
            </Grid>
            <Grid item>
                {renderDeclined()}
            </Grid>
        </Grid>
    );

}

export default EventParticipation;