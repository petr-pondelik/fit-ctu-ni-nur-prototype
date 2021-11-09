import React from "react";
import {List} from "@mui/material";
import ContactsListItem from "./ContactsListItem";
import {IEventContactState} from "../../../model/Events";


export interface IContactsSelectionListProps {
    contacts: IEventContactState[],
}


/**
 * @param props
 * @constructor
 */
const ContactsSelectionList: React.FC<IContactsSelectionListProps> = (props: IContactsSelectionListProps) => {

    let listItems = props.contacts.map(
        (c: IEventContactState, inx) => {
            return <ContactsListItem key={inx} contact={c}/>
        }
    );

    return (
        <List>
            {listItems}
        </List>
    );

}

export default ContactsSelectionList;