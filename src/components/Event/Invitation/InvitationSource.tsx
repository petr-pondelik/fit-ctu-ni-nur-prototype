import React, {useState} from "react";
import {Grid, ListItem, Typography} from "@mui/material";
import ActionButton from "../../Common/ActionButton";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import UsersModel, {User} from "../../../model/Users";
import AttendantAvatar from "../Attendants/AttendantAvatar";
import ContactsSelection from "../Contacts/ContactsSelection";


export interface IInvitationSourceProps {
    invitations: Array<string>,
    contacts: Array<string>,
    title: string,
    icon: JSX.Element
}


/**
 * @param props
 * @constructor
 */
const InvitationSource: React.FC<IInvitationSourceProps> = (props: IInvitationSourceProps) => {

    const [selectionOpen, setSelectionOpen] = useState(false);

    const renderInvitations = () => {
        if (props.invitations.length > 0) {
            return Object.values(props.invitations).map((id, inx) => {
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

    console.log('render InvitationSource');
    console.log(selectionOpen);

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
            />
        </React.Fragment>
    );

}

export default InvitationSource;