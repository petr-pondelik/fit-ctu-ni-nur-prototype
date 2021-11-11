import React from "react";
import {Grid, List, ListItem, Typography} from "@mui/material";
import UsersModel, {User} from "../../../model/Users";
import AttendantAvatar from "../Attendants/AttendantAvatar";
import EventsModel, {AttendantsList, IAttendantsOrganized, IEventData} from "../../../model/Events";
import MessageBox from "../../Common/MessageBox";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import {SxProps} from "@mui/system";


export interface IInvitedListProps {
	eventData: IEventData,
	message?: string | null
}


const OutlinedIconStyle: SxProps = {
	fontSize: "1.3rem",
	border: "3px solid",
	borderRadius: "6px",
	borderColor: "black",
	marginX: "4px"
}


/**
 * @param props
 * @constructor
 */
const EventInvitationsEdit: React.FC<IInvitedListProps> = (props: IInvitedListProps) => {

	let attendantsOrganized: IAttendantsOrganized = {
		Confirmed: [],
		Tentative: [],
		Declined: [],
		Pending: []
	}

	if (props.eventData.attendants !== null) {
		attendantsOrganized = EventsModel.getAttendantsOrganized(new AttendantsList(props.eventData.attendants));
	}

	let confirmedAttendants = Object.values(attendantsOrganized.Confirmed).map((id, inx) => {
		let u: User | undefined = UsersModel.findById(id);
		return u !== undefined ?
			<ListItem key={inx}>
				<AttendantAvatar attendant={u}/>
			</ListItem>
			: '';
	});

	let tentativeAttendants = Object.values(attendantsOrganized.Tentative).map((id, inx) => {
		let u: User | undefined = UsersModel.findById(id);
		return u !== undefined ?
			<ListItem key={inx}>
				<AttendantAvatar attendant={u}/>
			</ListItem>
			: '';
	});

	let declinedAttendants = Object.values(attendantsOrganized.Declined).map((id, inx) => {
		let u: User | undefined = UsersModel.findById(id);
		return u !== undefined ?
			<ListItem key={inx}>
				<AttendantAvatar attendant={u}/>
			</ListItem>
			: '';
	});

	let pendingAttendants = Object.values(attendantsOrganized.Pending).map((id, inx) => {
		let u: User | undefined = UsersModel.findById(id);
		return u !== undefined ?
			<ListItem key={inx}>
				<AttendantAvatar attendant={u}/>
			</ListItem>
			: '';
	});

	const renderMessageBox = () => {
		if (typeof props.message !== 'string') {
			return '';
		}
		return <MessageBox msg={props.message} color={"error.main"}/>
	}

	return (
		<Grid container>
			{renderMessageBox()}
			<Grid container item direction={"column"} px={"2.5%"}>
				<List>
					<ListItem selected={true} sx={{paddingY: "0.75rem", marginTop: "1rem", marginBottom: "0.5rem"}}>
						<CheckBoxOutlinedIcon fontSize={"large"}/>
						<Typography variant={"h6"} component={"p"} sx={{pl: "0.75rem"}}>
							Zúčastní se
						</Typography>
					</ListItem>
					{confirmedAttendants}
					<ListItem selected={true} sx={{paddingY: "0.75rem", marginTop: "2rem", marginBottom: "0.5rem"}}>
						<HelpCenterOutlinedIcon fontSize={"large"}/>
						<Typography variant={"h6"} component={"p"} sx={{pl: "0.75rem"}}>
							Váhají
						</Typography>
					</ListItem>
					{tentativeAttendants}
					<ListItem selected={true} sx={{paddingY: "0.75rem", marginTop: "2rem", marginBottom: "0.5rem"}}>
						<CloseIcon sx={OutlinedIconStyle}/>
						<Typography variant={"h6"} component={"p"} sx={{pl: "0.75rem"}}>
							Nezúčastí se
						</Typography>
					</ListItem>
					{declinedAttendants}
					<ListItem selected={true} sx={{paddingY: "0.75rem", marginTop: "2rem", marginBottom: "0.5rem"}}>
						<MoreHorizOutlinedIcon sx={OutlinedIconStyle}/>
						<Typography variant={"h6"} component={"p"} sx={{pl: "0.75rem"}}>
							Neodpověděli
						</Typography>
					</ListItem>
					{pendingAttendants}
				</List>
			</Grid>
		</Grid>
	);

}

export default EventInvitationsEdit;