import React from "react";
import {Event} from "../../../model/Events";
import EventCard from "../Card/EventCard";
import {Grid} from "@mui/material";
import {User} from "../../../model/Users";

interface IEventsListProps {
    user: User,
    events: Array<Event>
}

const EventsList: React.FC<IEventsListProps> = (props: IEventsListProps) => {

    let eventCards = props.events.map((e: Event, inx) => {
        return (
            <Grid item key={inx}>
                <EventCard
                    user={props.user}
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