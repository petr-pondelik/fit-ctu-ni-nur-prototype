import React from "react";
import EventsModel, {Event} from "../../model/Events";
import {Grid} from "@mui/material";
import CommonHeader from "../../components/Header/CommonHeader";
import {useParams} from "react-router-dom";
import {IRouteParams} from "../../interfaces/IRouteParams";
import Content from "../../components/Event/View/Content";
import {User} from "../../model/Users";


export interface IEventViewProps {
    user: User
}


const EventView: React.FC<IEventViewProps> = (props: IEventViewProps) => {

    const params = useParams<IRouteParams>();

    let event: Event|undefined = EventsModel.findById(params.id);

    if (event === undefined) {
        return <React.Fragment/>;
    }

    return (
        <Grid container direction={"column"} mt={"5rem"} pb={"1rem"}>
            <Grid item>
                <CommonHeader title={event.title}/>
            </Grid>
            <Grid container item sx={{ paddingX: "5%", paddingY: "2rem" }}>
                <Content
                    user={props.user}
                    event={event}
                />
            </Grid>
        </Grid>
    );

}

export default EventView;