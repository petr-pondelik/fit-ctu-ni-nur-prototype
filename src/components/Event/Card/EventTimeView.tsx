import React from "react";
import {Typography} from "@mui/material";
import {EventTime} from "../../../model/Events";
import TimeUtils from "../../../utils/TimeUtils";
import {OverridableStringUnion} from "@mui/types";
import {Variant} from "@mui/material/styles/createTypography";
import {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";

interface IEventTimeViewProps {
    eventTime: EventTime,
    variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
}

/**
 * @param props
 * @constructor
 */
const EventTimeView: React.FC<IEventTimeViewProps> = (props: IEventTimeViewProps) => {

    let startDateStr: string = TimeUtils.formatDateCz(props.eventTime.start);
    let startTimeStr: string = TimeUtils.formatTimeCz(props.eventTime.start);

    if (props.eventTime.end === null) {
        return (
            <Typography gutterBottom variant={props.variant ?? "body1"} component="p" pt={"0.5rem"}>
                Začátek: {startDateStr}, {startTimeStr}
            </Typography>
        );
    } else {
        let endDateStr: string = TimeUtils.formatDateCz(props.eventTime.end);
        let endTimeStr: string = TimeUtils.formatTimeCz(props.eventTime.end);

        return (
            <Typography gutterBottom variant={props.variant ?? "body1"} component="p" pt={"0.5rem"}>
                Začátek: {startDateStr}, {startTimeStr} <br/>
                Konec: {endDateStr}, {endTimeStr}
            </Typography>
        );
    }

}

export default EventTimeView;