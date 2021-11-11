import React from "react";
import {Event} from "../../../model/Events";
import {Typography} from "@mui/material";
import {User} from "../../../model/Users";


interface IUserEventStatusProps {
	loggedUser: User,
	event: Event
}


/**
 * @param props
 * @constructor
 */
const UserEventStatus: React.FC<IUserEventStatusProps> = (props: IUserEventStatusProps) => {
	return (
		<Typography sx={{ paddingTop: "0.25rem" }}>
            <strong>
			    {props.event.getUsersStatusCZ(props.loggedUser)}
            </strong>
		</Typography>
	);
}

export default UserEventStatus;