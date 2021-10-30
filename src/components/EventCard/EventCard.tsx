import React from "react";
import {Event} from "../../model/Events";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

interface IEventCardProps {
    event: Event
}

const EventCard: React.FC<IEventCardProps> = (props: IEventCardProps) => {
    return (
        <Card sx={{ width: "100%" }}>
            <CardMedia
                component="img"
                alt={props.event.title}
                height="140"
                image={props.event.imgPath}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.event.description}
                </Typography>
            </CardContent>
            {/*<CardActions>*/}
            {/*    <Button size="small">Share</Button>*/}
            {/*    <Button size="small">Learn More</Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
}

export default EventCard;