import React from "react";
import {Event} from "../../model/Events";
import EventCard from "../EventCard/EventCard";
import {Grid} from "@mui/material";

interface IEventsListProps {
    events: Array<Event>
}

const EventsList: React.FC<IEventsListProps> = (props: IEventsListProps) => {

    let eventCards = props.events.map((e: Event) => {
        return (
            <Grid item>
                <EventCard event={e}/>
            </Grid>
        );
    });

    console.log(props.events);

    return (
        <Grid container direction={"column"} rowSpacing={3}>
            {eventCards}
        </Grid>
    );
}

export default EventsList;