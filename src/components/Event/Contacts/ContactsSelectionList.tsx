import React from "react";
import {Divider, List, ListItem, ListItemText} from "@mui/material";
import AttendantAvatar from "../Attendants/AttendantAvatar";
import ContactAvatar from "./ContactsListItem";


export interface IContactsSelectionListProps {
    contacts: Array<string>,
}


/**
 * @param props
 * @constructor
 */
const ContactsSelectionList: React.FC<IContactsSelectionListProps> = (props: IContactsSelectionListProps) => {

    let listItems = props.contacts.map((c: string, inx) => {
            return (
                <React.Fragment key={inx}>
                    <ListItem button>
                        <ContactAvatar contact={c}/>
                        {/*<ListItemText primary="Phone ringtone" secondary="Titania"/>*/}
                    </ListItem>
                    <Divider/>
                </React.Fragment>
            )
        });

    return (
        <List>
            {listItems}
        </List>
    );

}

export default ContactsSelectionList;