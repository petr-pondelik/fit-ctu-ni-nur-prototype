import React, {useState} from "react";
import {Avatar, Checkbox, Divider, Grid, ListItem, Typography} from "@mui/material";
import Users from "../../../model/Users";
import {IEventContactState} from "../../../model/Events";


export interface IContactsListItemProps {
    contact: IEventContactState,
    // updateParent: (newState: IEventContactState) => any
}


/**
 * @param props
 * @constructor
 */
const ContactsListItem: React.FC<IContactsListItemProps> = (props: IContactsListItemProps) => {

    let contactUser = Users.findById(String(props.contact.userId));

    const [checked, setChecked] = useState(false);

    const update = () => {
        let newState = props.contact;
        newState.invited = !checked;
        setChecked(!checked);
    }

    console.log('Render ContactsListItem');
    console.log(props.contact);
    console.log(contactUser);

    return (
        <React.Fragment>
            <ListItem button onClick={update}>
                <Grid container justifyContent={"space-between"} flexWrap={"nowrap"} sx={{pl: "1rem"}}>
                    <Grid container item alignItems={"center"}>
                        <Avatar
                            alt={contactUser?.getFullName()}
                            src={'test'}
                        />
                        <Typography variant={"body1"} component={"span"} sx={{pl: "1rem"}}>
                            {contactUser?.getFullName()}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            checked={checked}
                            value={checked}
                        />
                    </Grid>
                </Grid>
            </ListItem>
            <Divider/>
        </React.Fragment>
    );

}

export default ContactsListItem;