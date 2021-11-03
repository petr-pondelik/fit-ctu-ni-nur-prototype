import React from "react";
import {CardMedia, Container} from "@mui/material";
import {Event} from "../../../model/Events";
import {Link} from "react-router-dom";
import {User} from "../../../model/Users";


export interface ICardMediaProps {
    user: User,
    event: Event
}


// const SendIconStyle: SxProps = {
//     position: "absolute",
//     bottom: "10px",
//     right: "30px",
//     padding: '0.25rem',
//     background: grey['A100'],
//     opacity: 0.85
// }


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
                image={props.event.imgPath}
            />
            {/*<ReadMoreIcon sx={SendIconStyle}/>*/}
        </Container>
        </Link>
    );

}

export default MediaDetailLink;