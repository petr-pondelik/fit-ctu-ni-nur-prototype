import React, {useState} from "react";
import {Grid, ListItem, Typography} from "@mui/material";
import ActionButton from "../../Common/ActionButton";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import UsersModel, {IUserInvitation, User} from "../../../model/Users";
import AttendantAvatar from "../Attendants/AttendantAvatar";
import ContactsSelection from "./ContactsSelection";
import {IEventContactState} from "../../../model/Events";
import EInvitationSource from "../../../enums/EInvitationSource";


export interface IContactsSourceProps {
    source: EInvitationSource,
    invitations: Array<IUserInvitation>,
    contacts: IEventContactState[],
    title: string,
    icon: JSX.Element,
    parentUpdateInvitations: (source: EInvitationSource, state: IEventContactState[]) => any
}


/**
 * @param props
 * @constructor
 */
const ContactsSource: React.FC<IContactsSourceProps> = (props: IContactsSourceProps) => {

    const [selectionOpen, setSelectionOpen] = useState(false);

    /**
     * @param state
     */
    const updateInvitations = (state: IEventContactState[]) => {
        console.log('ContactsSource updateInvitations');
        console.log(state);
        console.log(props.invitations);
        console.log(props.contacts);
        props.parentUpdateInvitations(props.source, state);
    }

    const renderInvitations = () => {
        if (props.invitations.length > 0) {
            return Object.values(props.invitations).map((inv, inx) => {
                let u: User | undefined = UsersModel.findById(inv.id);
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

    console.log('RENDER ContactsSource: ' + props.title);
    console.log(props.invitations);
    console.log(props.contacts);

    return (
        <React.Fragment>
            <ListItem selected={true} sx={{paddingY: "0.75rem", marginTop: "2rem", marginBottom: "0.5rem"}}>
                <Grid container justifyContent={"space-between"} alignItems={"center"} flexWrap={"nowrap"}>
                    <Grid container item>
                        {props.icon}
                        <Typography variant={"h6"} component={"p"} sx={{pl: "0.75rem"}}>
                            {props.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ActionButton clickHandler={(e) => setSelectionOpen(true)}>
                            <AddBoxOutlinedIcon fontSize={"large"}/>
                        </ActionButton>
                    </Grid>
                </Grid>
            </ListItem>
            {renderInvitations()}
            <ContactsSelection
                title={props.title}
                contacts={props.contacts}
                open={selectionOpen}
                updateParent={setSelectionOpen}
                updateParentContactsState={updateInvitations}
            />
        </React.Fragment>
    );

}

export default ContactsSource;