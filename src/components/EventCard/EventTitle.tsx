import React from "react";
import {Typography} from "@mui/material";

interface IEventTitleProps {
    title: string
}

/**
 * @param props
 * @constructor
 */
const EventTitle: React.FC<IEventTitleProps> = (props: IEventTitleProps) => {
    return (
        <Typography gutterBottom variant="h5" component="h2">
            {props.title}
        </Typography>
    );
}

export default EventTitle;