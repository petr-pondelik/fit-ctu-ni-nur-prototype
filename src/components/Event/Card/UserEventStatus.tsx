import React from "react";
import {Event} from "../../../model/Events";
import {Grid, Typography} from "@mui/material";
import {User} from "../../../model/Users";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";


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
		<Grid container alignItems={"center"} sx={{paddingTop: "0.25rem"}}>
			<Grid item>
				<PersonOutlineIcon/>
			</Grid>
			<Grid item>
				<Typography variant={"body1"} component={"p"} sx={{ paddingLeft: "0.5rem" }}>
					<strong>
						{props.event.getUsersStatusCZ(props.loggedUser)}
					</strong>
				</Typography>
			</Grid>
		</Grid>
	);
}

export default UserEventStatus;