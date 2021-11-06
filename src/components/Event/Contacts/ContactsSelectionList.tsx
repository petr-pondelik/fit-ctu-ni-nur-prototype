import React, {useState} from "react";
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

    /**
     * @param newState
     */
    // const update = (newState: IEventContactState) => {
    //     console.log('Update ContactsSelectionList');
    //     console.log(props.contacts);
    //     // props.updateParent(props.contacts);
    // }

    let listItems = props.contacts.map(
        (c: IEventContactState, inx) => {
            // return <ContactsListItem key={inx} contact={c} updateParent={update}/>
            return <ContactsListItem key={inx} contact={c}/>
        }
    );

    console.log('Render ContactsSelectionList');

    return (
        <List>
            {listItems}
        </List>
    );

}

export default ContactsSelectionList;