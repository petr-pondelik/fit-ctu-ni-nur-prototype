import React from "react";
import {Event} from "../../../model/Events";
import {Card, CardActions, CardContent, Divider} from "@mui/material";
import EventTitle from "./EventTitle";
import EventTime from "./EventTimeView";
import UserEventStatus from "./UserEventStatus";
import {User} from "../../../model/Users";
import EventLocation from "./EventLocation";
import DetailLink from "./DetailLink";
import MediaDetailLink from "./MediaDetailLink";

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
                <Divider/>
                <UserEventStatus
                    loggedUser={props.user}
                    event={props.event}
                />
                <EventLocation location={props.event.location}/>
                <EventTime eventTime={props.event.eventTime}/>
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