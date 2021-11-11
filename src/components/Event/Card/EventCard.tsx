import React from "react";
import {Event} from "../../../model/Events";
import {Card, CardActions, CardContent, Divider} from "@mui/material";
import EventTitle from "./EventTitle";
import EventTime from "./EventTimeView";
import UserEventStatus from "./UserEventStatus";
import Users, {User} from "../../../model/Users";
import EventLocation from "./EventLocation";
import DetailLink from "./DetailLink";
import MediaDetailLink from "./MediaDetailLink";
import EventOrganizer from "./EventOrganizer";

interface IEventCardProps {
    user: User,
    event: Event
}


const EventCard: React.FC<IEventCardProps> = (props: IEventCardProps) => {
    return (
        <Card sx={{ width: "100%" }} elevation={2}>
            <MediaDetailLink
                user={props.user}
                event={props.event}
            />
            <CardContent>
                <EventTitle title={props.event.title}/>
                <Divider sx={{ marginBottom: "1rem" }}/>
                <EventOrganizer organizer={Users.findById(props.event.organizer)}/>
                <EventLocation location={props.event.location}/>
                <EventTime eventTime={props.event.eventTime}/>
                <UserEventStatus
                    loggedUser={props.user}
                    event={props.event}
                />
            </CardContent>
            <CardActions sx={{ justifyContent: "end" }}>
                <DetailLink
                    user={props.user}
                    event={props.event}
                />
            </CardActions>
        </Card>
    );
}

export default EventCard;