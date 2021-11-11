import React from "react";
import {List, ListItem} from "@mui/material";
import UsersModel, {User} from "../../../model/Users";
import AttendantAvatar from "../Attendants/AttendantAvatar";
import {IEventData} from "../../../model/Events";
import MessageBox from "../../Common/MessageBox";


export interface IInvitedListProps {
	eventData: IEventData,
	message?: string|null
}


/**
 * @param props
 * @constructor
 */
const EventInvitations: React.FC<IInvitedListProps> = (props: IInvitedListProps) => {

	let invitations: (JSX.Element | "")[]|null = null;

	if (props.eventData.attendants !== null) {
		invitations = Object.values(props.eventData.attendants).map((inv, inx) => {
			if (inv.id === props.eventData.organizer) {
				return '';
			}
			let u: User|undefined = UsersModel.findById(inv.id);
			return u !== undefined ?
				<ListItem key={inx}>
					<AttendantAvatar attendant={u}/>
				</ListItem>
				: '';
		});
	}

	const renderMessageBox = () => {
		if (typeof props.message !== 'string') {
			return '';
		}
		return <MessageBox msg={props.message} color={"error.main"}/>
	}

	return (
		<React.Fragment>
			{renderMessageBox()}
			<List>
				{invitations}
			</List>
		</React.Fragment>
	);

}

export default EventInvitations;