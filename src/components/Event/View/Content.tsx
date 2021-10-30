import React from "react";
import {Card, CardMedia, Grid, Paper, Typography} from "@mui/material";
import {Event} from "../../../model/Events";
import EventTime from "../Card/EventTime";
import EventViewLocation from "./EventViewLocation";
import AttendantsList from "./AttendantsList";
import EventParticipation from "./Participation/EventParticipation";

export interface IContentProps {
    event: Event
}

const Content: React.FC<IContentProps> = (props: IContentProps) => {
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
            <Grid item pt={"0.5rem"}>
                <EventParticipation attendants={props.event.attendants}/>
            </Grid>
            <Grid item pt={"1rem"}>
                <AttendantsList attendants={props.event.attendants} />
            </Grid>
        </Grid>
    );
}

export default Content;