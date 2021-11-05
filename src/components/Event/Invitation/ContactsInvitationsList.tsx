import React, {useState} from "react";
import {Grid, List, ListItem, Typography} from "@mui/material";
import EventsModel, {
    AttendantsList,
    IAttendantsList, IInvitationsOrganized,
} from "../../../model/Events";
import {IUserContacts} from "../../../model/Users";
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {Icon} from '@iconify/react';
import InvitationSource from "./InvitationSource";


export interface IContactsInvitationsListProps {
    contacts: IUserContacts,
    invitations?: IAttendantsList
}


/**
 * @param props
 * @constructor
 */
const ContactsInvitationsList: React.FC<IContactsInvitationsListProps> = (props: IContactsInvitationsListProps) => {

    const [invitations, setInvitations] = useState<IInvitationsOrganized>(
        props.invitations ?
            EventsModel.getInvitationsOrganized(new AttendantsList(props.invitations)) :
            {
                MobileContacts: [],
                Messenger: [],
                WhatsApp: []
            }
    );

    console.log('render');

    return (
        <Grid container item direction={"column"} px={"2.5%"}>
            <List>
                <InvitationSource
                    invitations={invitations.MobileContacts}
                    contacts={props.contacts.mobileContacts}
                    title={'Mobilní kontakty'}
                    icon={<PhoneIcon fontSize={"large"}/>}
                />
                <InvitationSource
                    invitations={invitations.Messenger}
                    contacts={props.contacts.messenger}
                    title={'Messenger'}
                    icon={<Icon icon="mdi:facebook-messenger" width={"35"}/>}
                />
                <InvitationSource
                    title={'WhatsApp'}
                    invitations={invitations.WhatsApp}
                    contacts={props.contacts.whatsApp}
                    icon={<WhatsAppIcon fontSize={"large"}/>}
                />
            </List>
        </Grid>
    );

}

export default ContactsInvitationsList;