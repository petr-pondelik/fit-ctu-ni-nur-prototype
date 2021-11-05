import React from "react";
import {Avatar, Grid, Typography} from "@mui/material";
import Users from "../../../model/Users";


export interface IContactsListItemProps {
    contact: string
}


/**
 * @param props
 * @constructor
 */
const ContactsListItem: React.FC<IContactsListItemProps> = (props: IContactsListItemProps) => {

    console.log(props.contact);

    let contactUser = Users.findById(props.contact);
    console.log(contactUser);

    return (
        <Grid container alignItems={"center"} sx={{ pl: "1rem" }}>
            <Avatar
                alt={contactUser?.getFullName()}
                src={'test'}
            />
            <Typography variant={"body1"} component={"span"} sx={{ pl: "1rem" }}>
                {contactUser?.getFullName()}
            </Typography>
        </Grid>
    );

}

export default ContactsListItem;