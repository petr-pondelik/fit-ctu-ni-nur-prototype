import React from "react";
import {Typography} from "@mui/material";
import {IEventTime} from "../../model/Events";

interface IEventTimeProps {
    eventTime: IEventTime
}

/**
 * @param props
 * @constructor
 */
const EventTime: React.FC<IEventTimeProps> = (props: IEventTimeProps) => {

    let startDateStr: string = props.eventTime.start.toLocaleDateString('cz-CZ').replaceAll('/', '.');
    let startTimeStr: string = props.eventTime.start.toLocaleTimeString('cz-CZ', { hour12: false, hour: '2-digit', minute: '2-digit' });

    if (props.eventTime.end === undefined) {
        return (
            <Typography gutterBottom variant="body1" component="p" pt={"0.5rem"}>
                Začátek: {startDateStr}, {startTimeStr}
            </Typography>
        );
    } else {
        let endDateStr: string = props.eventTime.end.toLocaleDateString('cz-CZ').replaceAll('/', '.');
        let endTimeStr: string = props.eventTime.end.toLocaleTimeString('cz-CZ', { hour12: false, hour: '2-digit', minute: '2-digit' });

        return (
            <Typography gutterBottom variant="body1" component="p" pt={"0.5rem"}>
                Začátek: {startDateStr}, {startTimeStr} <br/>
                Konec: {endDateStr}, {endTimeStr}
            </Typography>
        );
    }

}

export default EventTime;