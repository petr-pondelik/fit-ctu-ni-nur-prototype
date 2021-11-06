import React from "react";
import {Grid} from "@mui/material";
import {IUserInvitation, User} from "../../model/Users";
import CommonHeader from "../../components/Header/CommonHeader";
import Events, {EventInvitationStatus, IEventContactState, IEventData} from "../../model/Events";
import ContactsInvitation from "../../components/Event/Invitation/ContactsInvitation";
import EInvitationSource from "../../enums/EInvitationSource";


export interface IAttendantsFromContactsProps {
    user: User
}

/**
 * @param props
 * @constructor
 */
const Invitations: React.FC<IAttendantsFromContactsProps> = (props: IAttendantsFromContactsProps) => {

    const [eventData, setEventData] = React.useState<IEventData>(Events.fetchUnfinished());

    /**
     * @param source
     * @param state
     */
    const update = (source: EInvitationSource, state: IEventContactState[]) => {
        console.log('UPDATE Invitations');
        console.log(state);
        let newEventData: IEventData = eventData;
        console.log(newEventData);
        if (newEventData.attendants === undefined) {
            newEventData.attendants = {};
        }
        for (const inv of state) {
            console.log(inv);
            if (inv.invited) {
                newEventData.attendants[parseInt(inv.userId)] = {
                    id: inv.userId,
                    status: EventInvitationStatus.Pending,
                    source: source
                }
            }
        }
        console.log(newEventData);
        setEventData(newEventData);
    }

    console.log('RENDER Invitations');
    console.log(eventData);
    console.log(props.user);
    console.log(Events.getUnfinishedEventContactsState(props.user));

    return (
        <Grid container direction={"column"} mt={"3rem"} pb={"1rem"}>
            <Grid item>
                <CommonHeader title={'Pozvánky na událost'}/>
            </Grid>
            <Grid container item sx={{ paddingX: "5%", paddingY: "2rem" }}>
                <ContactsInvitation
                    eventData={eventData}
                    contacts={Events.getUnfinishedEventContactsState(props.user)}
                    updateParent={update}
                />
            </Grid>
        </Grid>
    );

}

export default Invitations;