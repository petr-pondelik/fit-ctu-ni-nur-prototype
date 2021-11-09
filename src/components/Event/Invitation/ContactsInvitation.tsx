import React, {useState} from "react";
import {Grid, List} from "@mui/material";
import EventsModel, {
    AttendantsList, IEventContactState, IEventData, IInvitationsOrganized, IUserContactsStates,
} from "../../../model/Events";
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {Icon} from '@iconify/react';
import ContactsSource from "../Contacts/ContactsSource";
import EInvitationSource from "../../../enums/EInvitationSource";


export interface IContactsInvitationsListProps {
    eventData: IEventData,
    contacts: IUserContactsStates,
    updateParent: (source: EInvitationSource, state: IEventContactState[]) => any,
    parentCancelInvitation: (userId: string) => any
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
        props.updateParent(source, state);
    }

    /**
     * @param userId
     */
    const cancelInvitation = (userId: string) => {
        props.parentCancelInvitation(userId);
    }

    return (
        <Grid container item direction={"column"} px={"2.5%"}>
            <List>
                <ContactsSource
                    source={EInvitationSource.MobileContacts}
                    invitations={invitations.MobileContacts}
                    contacts={props.contacts.mobileContacts}
                    title={EInvitationSource.MobileContacts}
                    icon={<PhoneIcon fontSize={"large"}/>}
                    parentUpdateInvitations={updateInvitations}
                    parentCancelInvitation={cancelInvitation}
                />
                <ContactsSource
                    source={EInvitationSource.Messenger}
                    invitations={invitations.Messenger}
                    contacts={props.contacts.messenger}
                    title={EInvitationSource.Messenger}
                    icon={<Icon icon="mdi:facebook-messenger" width={"35"}/>}
                    parentUpdateInvitations={updateInvitations}
                    parentCancelInvitation={cancelInvitation}
                />
                <ContactsSource
                    source={EInvitationSource.WhatsApp}
                    title={EInvitationSource.WhatsApp}
                    invitations={invitations.WhatsApp}
                    contacts={props.contacts.whatsApp}
                    icon={<WhatsAppIcon fontSize={"large"}/>}
                    parentUpdateInvitations={updateInvitations}
                    parentCancelInvitation={cancelInvitation}
                />
            </List>
        </Grid>
    );

}

export default ContactsInvitation;