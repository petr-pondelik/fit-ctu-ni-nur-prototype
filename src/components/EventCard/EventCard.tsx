import React from "react";
import {Event} from "../../model/Events";
import {Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Typography} from "@mui/material";
import EventTitle from "./EventTitle";
import EventTime from "./EventTime";
import {Link} from "react-router-dom";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { SxProps } from '@mui/system';
import {grey} from "@mui/material/colors";
import UserEventStatus from "./UserEventStatus";
import {User} from "../../model/Users";
import EventPlace from "./EventPlace";

interface IEventCardProps {
    loggedUser: User,
    event: Event
}

const SendIconStyle: SxProps = {
    position: "absolute",
    bottom: "10px",
    right: "30px",
    padding: '0.25rem',
    background: grey['A100'],
    opacity: 0.85
}

const EventCard: React.FC<IEventCardProps> = (props: IEventCardProps) => {
    return (
        <Card sx={{ width: "100%" }}>
            <Link to={"/event/" + props.event.id}>
                <Container sx={{ position: "relative" }}>
                    <CardMedia
                        component={'img'}
                        alt={props.event.title}
                        height="140"
                        image={props.event.imgPath}
                    />
                    <ReadMoreIcon sx={SendIconStyle}/>
                </Container>
            </Link>
            <CardContent>
                <EventTitle title={props.event.title}/>
                <Divider/>
                <UserEventStatus
                    loggedUser={props.loggedUser}
                    event={props.event}
                />
                <EventPlace place={props.event.place}/>
                <EventTime eventTime={props.event.eventTime}/>
            </CardContent>
            <CardActions sx={{ justifyContent: "end" }}>
                <Button component={Link} to={'/event/' + props.event.id} size="small">Detail události</Button>
            </CardActions>
        </Card>
    );
}

export default EventCard;