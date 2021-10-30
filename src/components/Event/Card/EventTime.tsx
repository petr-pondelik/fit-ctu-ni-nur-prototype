import React from "react";
import {Typography} from "@mui/material";
import {IEventTime} from "../../../model/Events";
import TimeUtils from "../../../utils/TimeUtils";

interface IEventTimeProps {
    eventTime: IEventTime
}

/**
 * @param props
 * @constructor
 */
const EventTime: React.FC<IEventTimeProps> = (props: IEventTimeProps) => {

    let startDateStr: string = TimeUtils.formatDateCz(props.eventTime.start);
    let startTimeStr: string = TimeUtils.formatTimeCz(props.eventTime.start);

    if (props.eventTime.end === undefined) {
        return (
            <Typography gutterBottom variant="body1" component="p" pt={"0.5rem"}>
                Začátek: {startDateStr}, {startTimeStr}
            </Typography>
        );
    } else {
        let endDateStr: string = TimeUtils.formatDateCz(props.eventTime.start);
        let endTimeStr: string = TimeUtils.formatTimeCz(props.eventTime.start);

        return (
            <Typography gutterBottom variant="body1" component="p" pt={"0.5rem"}>
                Začátek: {startDateStr}, {startTimeStr} <br/>
                Konec: {endDateStr}, {endTimeStr}
            </Typography>
        );
    }

}

export default EventTime;