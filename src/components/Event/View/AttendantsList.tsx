import React from "react";
import {IAttendantsList} from "../../../model/Events";
import {Grid, Typography} from "@mui/material";


export interface IAttendantsListProps {
    attendants: IAttendantsList
}


/**
 * @param props
 * @constructor
 */
const AttendantsList: React.FC<IAttendantsListProps> = (props: IAttendantsListProps) => {

    return (
        <Grid container>
            <Typography variant={"h5"} component={"h2"}>
                Účastníci
            </Typography>
        </Grid>
    );

}

export default AttendantsList;