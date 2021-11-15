import React from "react";
import {Event} from "../../../model/Events";
import EventCard from "../Card/EventCard";
import {Grid, Typography} from "@mui/material";
import {User} from "../../../model/Users";
import ActionButton from "../../Common/ActionButton";
import {useHistory} from "react-router-dom";

interface IEventsListProps {
    user: User,
    events: Array<Event>
}

const EventsList: React.FC<IEventsListProps> = (props: IEventsListProps) => {

    let history = useHistory();

    if (props.events.length < 1) {
        return (
            <Grid container direction={"column"} justifyContent={"space-around"} height={"30vh"}>
                <Grid item>
                    <Typography variant={"body1"} component={'p'} sx={{ textAlign: "center", color: "#757575", marginBottom: "2rem" }}>
                        Dosud jste nevytvořil ani jste nebyl pozván na žádnou událost.
                    </Typography>
                    <ActionButton variant={"contained"} clickHandler={() => history.push('/event/create')}>
                        Vytvořit událost
                    </ActionButton>
                </Grid>
            </Grid>
        )
    }

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