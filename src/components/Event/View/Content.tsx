import React, {useState} from "react";
import {Card, CardMedia, Grid, Paper, Typography} from "@mui/material";
import {Event} from "../../../model/Events";
import EventTime from "../Card/EventTimeView";
import EventViewLocation from "./EventViewLocation";
import EventParticipation from "../Participation/EventParticipation";
import {User} from "../../../model/Users";

export interface IContentProps {
    loggedUser: User,
    event: Event
}

const Content: React.FC<IContentProps> = (props: IContentProps) => {

    console.log(props.event.attendants);

    const [attendance, setAttendance] = useState(props.event.attendants[props.loggedUser.id as unknown as number].status);

    /**
     * @param event
     */
    function updateEvent(event: Event) {
        // console.log('updateEvent');
        // console.log(event);
        // console.log(event.attendants.data[props.loggedUser.id].status);
        setAttendance(event.attendants[props.loggedUser.id as unknown as number].status);
    }

    // if (attendants[1].status !== 1) {
    //     return <div></div>;
    // }

    return (

        <Grid container direction={"column"} py={"2rem"}>
            <Grid item>
                <Card elevation={2}>
                    <CardMedia
                        component={'img'}
                        alt={props.event.title}
                        height="140"
                        image={props.event.imgPath}
                    />
                </Card>
            </Grid>
            <Grid item pt={"1rem"}>
                <EventTime eventTime={props.event.eventTime}/>
            </Grid>
            <Grid item pt={"1rem"}>
                <EventViewLocation event={props.event}/>
            </Grid>
            <Grid item pt={"1rem"}>
                <Typography variant="body1" color="text.secondary">
                    {props.event.description}
                </Typography>
            </Grid>
            <Grid item pt={"0.5rem"} paddingY={"2rem"}>
                <Typography variant={"h5"} component={"h2"}>
                    Má účast {attendance}
                </Typography>
                <EventParticipation
                    loggedUser={props.loggedUser}
                    event={props.event}
                    updateParent={updateEvent}
                />
            </Grid>
            <Grid item pt={"1rem"}>
                <EventAttendantsList attendants={stateEvent.attendants} />
            </Grid>
        </Grid>
    );
}

export default Content;