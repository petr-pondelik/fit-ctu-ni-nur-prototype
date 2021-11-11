import React, {useState} from "react";
import {Grid, ListItem, Typography} from "@mui/material";
import ActionButton from "../../Common/ActionButton";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import UsersModel, {IUserInvitation, User} from "../../../model/Users";
import AttendantAvatar from "../Attendants/AttendantAvatar";
import ContactsSelection from "./ContactsSelection";
import {IEventContactState} from "../../../model/Events";
import EInvitationSource from "../../../enums/EInvitationSource";
import ClearIcon from '@mui/icons-material/Clear';


export interface IContactsSourceProps {
    source: EInvitationSource,
    invitations: Array<IUserInvitation>,
    contacts: IEventContactState[],
    title: string,
    icon: JSX.Element,
    parentUpdateInvitations: (source: EInvitationSource, state: IEventContactState[]) => any,
    parentCancelInvitation: (userId: string) => any
}


/**
 * @param props
 * @constructor
 */
const ContactsSource: React.FC<IContactsSourceProps> = (props: IContactsSourceProps) => {

    const [selectionOpen, setSelectionOpen] = useState(false);

    /**
     * @param e
     */
    const cancelInvitation = (e: React.MouseEvent<SVGSVGElement>) => {
        props.parentCancelInvitation(e.currentTarget.id);
    }

    /**
     * @param state
     */
    const updateInvitations = (state: IEventContactState[]) => {
        props.parentUpdateInvitations(props.source, state);
    }

    const renderInvitations = () => {
        if (props.invitations.length > 0) {
            return Object.values(props.invitations).map((inv, inx) => {
                let u: User | undefined = UsersModel.findById(inv.id);
                return u !== undefined ?
                    <ListItem key={inx} sx={{ paddingRight: "2.175rem" }}>
                        <AttendantAvatar attendant={u}/>
                        <ClearIcon id={inv.id} onClick={cancelInvitation}/>
                    </ListItem>
                    : '';
            });
        }
        return <ListItem>
            Žádné pozvánky
        </ListItem>
    }

    return (
        <React.Fragment>
            <ListItem
                selected={true}
                sx={{paddingY: "0.75rem", marginTop: "2rem", marginBottom: "0.5rem"}}
                onClick={() => setSelectionOpen(true)}
            >
                <Grid container justifyContent={"space-between"} alignItems={"center"} flexWrap={"nowrap"}>
                    <Grid container item>
                        {props.icon}
                        <Typography variant={"h6"} component={"p"} sx={{pl: "0.75rem"}}>
                            {props.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ActionButton clickHandler={() => {}}>
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