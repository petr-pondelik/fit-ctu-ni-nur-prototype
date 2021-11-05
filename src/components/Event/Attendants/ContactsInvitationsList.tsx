import React, {useState} from "react";
import {Grid, List, ListItem, Typography} from "@mui/material";
import EventsModel, {
    AttendantsList,
    IAttendantsList,
} from "../../../model/Events";
import UsersModel, {IUserContacts, User} from "../../../model/Users";
import AttendantAvatar from "./AttendantAvatar";
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {Icon} from '@iconify/react';
import ActionButton from "../../Common/ActionButton";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";


export interface IContactsInvitationsListProps {
    contacts: IUserContacts,
    invitations?: IAttendantsList
}


/**
 * @param props
 * @constructor
 */
const ContactsInvitationsList: React.FC<IContactsInvitationsListProps> = (props: IContactsInvitationsListProps) => {

    console.log(props.contacts);
    console.log(props.invitations);

    const [invitations, setInvitations] = useState(
        props.invitations ?
            EventsModel.getInvitationsOrganized(new AttendantsList(props.invitations)) :
            {
                MobileContacts: [],
                Messenger: [],
                WhatsApp: []
            }
    );

    const renderMobileContactsInvitations = () => {
        if (invitations.MobileContacts.length > 0) {
            return Object.values(invitations.MobileContacts).map((id, inx) => {
                let u: User | undefined = UsersModel.findById(id);
                return u !== undefined ?
                    <ListItem key={inx}>
                        <AttendantAvatar attendant={u}/>
                    </ListItem>
                    : '';
            });
        }
        return <ListItem>
            Žádné pozvánky
        </ListItem>
    }

    const renderMessengerInvitations = () => {
        if (invitations.Messenger.length > 0) {
            return Object.values(invitations.Messenger).map((id, inx) => {
                let u: User | undefined = UsersModel.findById(id);
                return u !== undefined ?
                    <ListItem key={inx}>
                        <AttendantAvatar attendant={u}/>
                    </ListItem>
                    : '';
            });
        }
        return <ListItem>
            Žádné pozvánky
        </ListItem>
    }

    const renderWhatsAppInvitations = () => {
        if (invitations.WhatsApp.length > 0) {
            return Object.values(invitations.WhatsApp).map((id, inx) => {
                let u: User | undefined = UsersModel.findById(id);
                return u !== undefined ?
                    <ListItem key={inx}>
                        <AttendantAvatar attendant={u}/>
                    </ListItem>
                    : '';
            });
        }
        return <ListItem>
            Žádné pozvánky
        </ListItem>
    }

    return (
        <Grid container item direction={"column"} pt={"1rem"} px={"2.5%"}>
            <List>
                <ListItem selected={true} sx={{paddingY: "1.25rem", marginBottom: "0.5rem"}}>
                    <Grid container justifyContent={"space-between"} alignItems={"center"} flexWrap={"nowrap"}>
                        <Grid container item>
                            <PhoneIcon fontSize={"large"}/>
                            <Typography variant={"h6"} component={"p"} sx={{pl: "0.75rem"}}>
                                Mobilní kontakty
                            </Typography>
                        </Grid>
                        <Grid item>
                            <ActionButton clickHandler={(e) => console.log('CLICKED')}>
                                <AddBoxOutlinedIcon fontSize={"large"}/>
                            </ActionButton>
                        </Grid>
                    </Grid>
                </ListItem>
                {renderMobileContactsInvitations()}
                <ListItem selected={true} sx={{paddingY: "1.25rem", marginTop: "1.25rem", marginBottom: "0.5rem"}}>
                    <Grid container justifyContent={"space-between"} alignItems={"center"} flexWrap={"nowrap"}>
                        <Grid container item>
                            <Icon icon="mdi:facebook-messenger" width={"35"}/>
                            <Typography variant={"h6"} component={"p"} sx={{pl: "0.75rem"}}>
                                Messenger
                            </Typography>
                        </Grid>
                        <Grid item>
                            <ActionButton clickHandler={(e) => console.log('CLICKED')}>
                                <AddBoxOutlinedIcon fontSize={"large"}/>
                            </ActionButton>
                        </Grid>
                    </Grid>
                </ListItem>
                {renderMessengerInvitations()}
                <ListItem selected={true} sx={{paddingY: "1.25rem", marginTop: "1.25rem", marginBottom: "0.5rem"}}>
                    <Grid container justifyContent={"space-between"} alignItems={"center"} flexWrap={"nowrap"}>
                        <Grid container item>
                            <WhatsAppIcon fontSize={"large"}/>
                            <Typography variant={"h6"} component={"p"} sx={{pl: "0.75rem"}}>
                                WhatsApp
                            </Typography>
                        </Grid>
                        <Grid item>
                            <ActionButton clickHandler={(e) => console.log('CLICKED')}>
                                <AddBoxOutlinedIcon fontSize={"large"}/>
                            </ActionButton>
                        </Grid>
                    </Grid>
                </ListItem>
                {renderWhatsAppInvitations()}
            </List>
        </Grid>
    );

}

export default ContactsInvitationsList;