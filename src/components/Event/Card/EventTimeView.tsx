import React from "react";
import {Typography} from "@mui/material";
import {EventTime} from "../../../model/Events";
import TimeUtils from "../../../utils/TimeUtils";

interface IEventTimeViewProps {
    eventTime: EventTime
}

/**
 * @param props
 * @constructor
 */
const EventTimeView: React.FC<IEventTimeViewProps> = (props: IEventTimeViewProps) => {

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

export default EventTimeView;