import React from "react";
import {Grid} from "@mui/material";
import {User} from "../../model/Users";
import CommonHeader from "../../components/Header/CommonHeader";
import Events, {IEventData} from "../../model/Events";
import ContactsInvitationsList from "../../components/Event/Invitation/ContactsInvitationsList";


export interface IAttendantsFromContactsProps {
    user: User
}


/**
 * @param props
 * @constructor
 */
const Invitations: React.FC<IAttendantsFromContactsProps> = (props: IAttendantsFromContactsProps) => {

    const [eventData, setEventData] = React.useState<IEventData|undefined>(Events.fetchUnfinished());

    console.log(eventData);
    console.log(props.user);

    return (
        <Grid container direction={"column"} mt={"3rem"} pb={"1rem"}>
            <Grid item>
                <CommonHeader title={'Pozvánky na událost'}/>
            </Grid>
            <Grid container item sx={{ paddingX: "5%", paddingY: "2rem" }}>
                <ContactsInvitationsList
                    contacts={props.user.contacts}
                    invitations={eventData?.attendants}
                />
            </Grid>
        </Grid>
    );

}

export default Invitations;