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
    console.log(contactUser);

    const [checked, setChecked] = useState(false);

    const update = () => {
        console.log('Update ContactsListItem');
        let newState = props.contact;
        newState.invited = !checked;
        setChecked(!checked);
        // console.log(newState);
        // props.updateParent(newState);
    }

    console.log('Render ContactsListItem');

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
                            // disabled={props.contact.invited}
                        />
                    </Grid>
                </Grid>
            </ListItem>
            <Divider/>
        </React.Fragment>
    );

}

export default ContactsListItem;