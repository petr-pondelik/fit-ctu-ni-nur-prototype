import React from "react";
import {AttendantsList} from "../../../model/Events";
import {Grid, Typography} from "@mui/material";


export interface IEventAttendantsListProps {
    attendants: AttendantsList
}


/**
 * @param props
 * @constructor
 */
const EventAttendantsList: React.FC<IEventAttendantsListProps> = (props: IEventAttendantsListProps) => {

    return (
        <Grid container>
            <Typography variant={"h5"} component={"h2"}>
                Účastníci
            </Typography>
        </Grid>
    );

}

export default EventAttendantsList;