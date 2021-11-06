import React, {useState} from "react";
import {Grid, List} from "@mui/material";
import EventsModel, {
    AttendantsList, IEventContactState, IEventData, IInvitationsOrganized, IUserContactsStates,
} from "../../../model/Events";
import {IUserContacts} from "../../../model/Users";
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {Icon} from '@iconify/react';
import ContactsSource from "../Contacts/ContactsSource";
import EInvitationSource from "../../../enums/EInvitationSource";


export interface IContactsInvitationsListProps {
    eventData: IEventData,
    contacts: IUserContactsStates,
    updateParent: (source: EInvitationSource, state: IEventContactState[]) => any
}


/**
 * @param props
 * @constructor
 */
const ContactsInvitation: React.FC<IContactsInvitationsListProps> = (props: IContactsInvitationsListProps) => {

    const [eventData, setEventData] = useState<IEventData>(props.eventData);

    let invitations: IInvitationsOrganized = eventData.attendants ?
            EventsModel.getInvitationsOrganized(new AttendantsList(eventData.attendants)) :
            {
                MobileContacts: [],
                Messenger: [],
                WhatsApp: []
            };

    /**
     * @param source
     * @param state
     */
    const updateInvitations = (source: EInvitationSource, state: IEventContactState[]) => {
        console.log('UPDATE ContactsInvitation');
        console.log(state);
        props.updateParent(source, state);
    }

    console.log('RENDER ContactsInvitation');
    console.log(eventData);
    console.log(invitations);

    return (
        <Grid container item direction={"column"} px={"2.5%"}>
            <p>{JSON.stringify(props.eventData)}</p>
            <List>
                <ContactsSource
                    source={EInvitationSource.MobileContacts}
                    invitations={invitations.MobileContacts}
                    contacts={props.contacts.mobileContacts}
                    title={EInvitationSource.MobileContacts}
                    icon={<PhoneIcon fontSize={"large"}/>}
                    parentUpdateInvitations={updateInvitations}
                />
                <ContactsSource
                    source={EInvitationSource.Messenger}
                    invitations={invitations.Messenger}
                    contacts={props.contacts.messenger}
                    title={EInvitationSource.Messenger}
                    icon={<Icon icon="mdi:facebook-messenger" width={"35"}/>}
                    parentUpdateInvitations={updateInvitations}
                />
                <ContactsSource
                    source={EInvitationSource.WhatsApp}
                    title={EInvitationSource.WhatsApp}
                    invitations={invitations.WhatsApp}
                    contacts={props.contacts.whatsApp}
                    icon={<WhatsAppIcon fontSize={"large"}/>}
                    parentUpdateInvitations={updateInvitations}
                />
            </List>
        </Grid>
    );

}

export default ContactsInvitation;