import React from "react";
import {User} from "../../../model/Users";
import {Avatar, Grid, Typography} from "@mui/material";

export interface IAttendantAvatarProps {
    attendant: User
}


/**
 * @param props
 * @constructor
 */
const AttendantAvatar: React.FC<IAttendantAvatarProps> = (props: IAttendantAvatarProps) => {

    return (
        <Grid container alignItems={"center"}>
            <Avatar
                alt={props.attendant.getFullName()}
                src={'test'}
            />
            <Typography variant={"body1"} component={"span"} sx={{ pl: "1rem" }}>
                {props.attendant.getFullName()}
            </Typography>
        </Grid>
    );

}

export default AttendantAvatar;