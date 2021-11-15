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
import {useHistory} from "react-router-dom";

interface IEventCardProps {
    user: User,
    event: Event
}

const EventCard: React.FC<IEventCardProps> = (props: IEventCardProps) => {

    let actionUrl: string = props.event.isOrganisedBy(props.user) ? '/event/edit/' : '/event/view/';

    let history = useHistory();

    const getBackgroundColor = () => {
        return props.user.id !== props.event.organizer ? '' : '#fff8e1';
    }

    const renderEventOrganizer = () => {
        return props.user.id !== props.event.organizer ? <EventOrganizer organizer={Users.findById(props.event.organizer)}/> : '';
    }

    return (
        <Card
            sx={{ width: "100%", backgroundColor: getBackgroundColor() }}
            elevation={props.user.id !== props.event.organizer ? 2 : 5}
            onClick={() => {history.push(actionUrl + props.event.id)}}
            id={`event-${props.event.id}`}
        >
            <MediaDetailLink
                user={props.user}
                event={props.event}
            />
            <CardContent>
                <EventTitle title={props.event.title}/>
                <Divider sx={{ marginBottom: "1rem" }}/>
                <UserEventStatus
                    loggedUser={props.user}
                    event={props.event}
                />
                {renderEventOrganizer()}
                <EventLocation location={props.event.location} sx={{paddingTop: "1rem"}}/>
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