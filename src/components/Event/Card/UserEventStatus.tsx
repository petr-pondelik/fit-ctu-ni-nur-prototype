import React from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Event} from "../../../model/Events";
import {Grid, Typography} from "@mui/material";
import {User} from "../../../model/Users";
import {SxProps} from "@mui/system";

interface IUserEventStatusProps {
    loggedUser: User,
    event: Event
}

const StatusStyle: SxProps = {

};

/**
 * @param props
 * @constructor
 */
const UserEventStatus: React.FC<IUserEventStatusProps> = (props: IUserEventStatusProps) => {
    return (
        <Grid container alignItems={"center"} pt={"0.5rem"}>
            <Grid item>
                <PersonOutlineIcon/>
            </Grid>
            <Grid item>
                <Typography sx={StatusStyle} pl={"0.5rem"}>
                    {props.event.getUsersStatusCZ(props.loggedUser)}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default UserEventStatus;