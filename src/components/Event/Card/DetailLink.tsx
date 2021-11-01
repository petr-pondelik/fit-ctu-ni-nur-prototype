import React from "react";
import {User} from "../../../model/Users";
import {Event} from "../../../model/Events";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

export interface IDetailLinkProps {
    user: User,
    event: Event
}

/**
 * @param props
 * @constructor
 */
const DetailLink: React.FC<IDetailLinkProps> = (props: IDetailLinkProps) => {

    let actionUrl: string = props.event.isOrganisedBy(props.user) ? '/event/edit/' : '/event/view/';
    let btnDescription: string = props.event.isOrganisedBy(props.user) ? 'Upravit událost' : 'Detail události';

    return <Button component={Link} to={actionUrl + props.event.id} size="small">{btnDescription}</Button>

}

export default DetailLink;