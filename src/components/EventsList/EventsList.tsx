import React from "react";
import {Event} from "../../model/Events";
import EventCard from "../EventCard/EventCard";
import {Grid} from "@mui/material";
import {User} from "../../model/Users";

interface IEventsListProps {
    loggedUser: User,
    events: Array<Event>
}

const EventsList: React.FC<IEventsListProps> = (props: IEventsListProps) => {

    let eventCards = props.events.map((e: Event) => {
        return (
            <Grid item>
                <EventCard
                    loggedUser={props.loggedUser}
                    event={e}
                />
            </Grid>
        );
    });

    return (
        <Grid container direction={"column"} rowSpacing={3}>
            {eventCards}
        </Grid>
    );
}

export default EventsList;