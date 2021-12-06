import React, {useEffect} from "react";
import EventsModel, {Event} from "../../model/Events";
import {Grid} from "@mui/material";
import CommonHeader, {ActionType} from "../../components/Header/CommonHeader";
import {useHistory, useParams} from "react-router-dom";
import {IRouteParams} from "../../interfaces/IRouteParams";
import Content from "../../components/Event/View/Content";
import {User} from "../../model/Users";


export interface IEventViewProps {
    user: User
}


const EventView: React.FC<IEventViewProps> = (props: IEventViewProps) => {

    const params = useParams<IRouteParams>();
    const history = useHistory();

    let event: Event|undefined = EventsModel.findById(params.id);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    if (event === undefined) {
        return <React.Fragment/>;
    }

    return (
        <Grid container direction={"column"} mt={"5rem"} pb={"1rem"}>
            <Grid item>
                <CommonHeader title={event.title} showDialog={false} actionType={ActionType.BACK} yesAction={() => history.push(`/#${params.id}`)}/>
            </Grid>
            <Grid container item sx={{paddingY: "2rem" }} id={"start"}>
                <Content
                    user={props.user}
                    event={event}
                />
            </Grid>
        </Grid>
    );

}

export default EventView;