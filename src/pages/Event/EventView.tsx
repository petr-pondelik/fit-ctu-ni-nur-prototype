import React from "react";
import EventsModel, {Event} from "../../model/Events";
import {Grid} from "@mui/material";
import CommonHeader from "../../components/Header/CommonHeader";
import {useParams} from "react-router-dom";
import {IRouteParams} from "../../interfaces/IRouteParams";
import Content from "../../components/Event/View/Content";


export interface IEventViewProps {
}


const EventView: React.FC<IEventViewProps> = (props: IEventViewProps) => {

    const params = useParams<IRouteParams>();
    console.log(params.id);

    let event: Event|undefined = EventsModel.findById(params.id);
    console.log(event);

    if (event === undefined) {
        return <React.Fragment/>;
    }

    return (
        <Grid container direction={"column"} pb={"1rem"}>
            <Grid item>
                <CommonHeader title={event.title}/>
            </Grid>
            <Grid container item sx={{paddingX: "5%"}}>
                <Content event={event}/>
            </Grid>
        </Grid>
    );

}

export default EventView;