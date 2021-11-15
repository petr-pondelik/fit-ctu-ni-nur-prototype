import {Grid, Typography} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import React from "react";
import {User} from "../../../model/Users";


export interface IEventOrganizerProps {
	organizer?: User
}


/**
 * @param props
 * @constructor
 */
const EventOrganizer: React.FC<IEventOrganizerProps> = (props: IEventOrganizerProps) => {

	return (
		<Grid container alignItems={"center"}>
			<Grid item>
				<Typography variant={"body1"} component={"p"} sx={{ paddingLeft: "0.2rem" }}>
					Organizuje {props.organizer ? props.organizer.getFullName() : ''}
				</Typography>
			</Grid>
		</Grid>
	);

}

export default EventOrganizer;