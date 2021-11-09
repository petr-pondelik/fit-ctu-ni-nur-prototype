import React from "react";
import {CardMedia, Container} from "@mui/material";
import {Event} from "../../../model/Events";
import {Link} from "react-router-dom";
import {User} from "../../../model/Users";


export interface ICardMediaProps {
    user: User,
    event: Event
}


/**
 * @param props
 * @constructor
 */
const MediaDetailLink: React.FC<ICardMediaProps> = (props: ICardMediaProps) => {

    let actionUrl: string = props.event.isOrganisedBy(props.user) ? '/event/edit/' : '/event/view/';

    return (
        <Link to={actionUrl + props.event.id}>
        <Container sx={{ position: "relative", padding: 0 }}>
            <CardMedia
                component={'img'}
                alt={props.event.title}
                height="140"
                image={props.event.imgPath ?? '/static/images/default/empty.jpg'}
            />
        </Container>
        </Link>
    );

}

export default MediaDetailLink;