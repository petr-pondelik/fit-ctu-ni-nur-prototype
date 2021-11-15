import React, {useEffect} from "react";
import {User} from "../../model/Users";
import {Grid} from "@mui/material";
import {RouteComponentProps} from "react-router-dom";
import Events, {Event} from "../../model/Events";
import CommonHeader from "../../components/Header/CommonHeader";
import EventCreateForm from "../../components/Event/Form/EventForm";
import {FormOperations} from "../../enums/FormOperations";


interface IRouteParams {
    id: string
}

export interface IEventEditProps extends RouteComponentProps<IRouteParams>{
    user: User
}

export interface IEventEditState {
    event: Event
}


export default class EventEdit extends React.Component<IEventEditProps, IEventEditState> {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    goBack = () => {
        this.props.history.push(`/#${this.props.match.params.id}`);
        Events.clearUnfinished();
    }

    /**
     * @param props
     */
    constructor(props: IEventEditProps) {
        super(props);
        let e: Event|undefined = Events.findById(props.match.params.id);
        if (e instanceof Event) {
            this.state = {
                event: e
            }
        }
    }

    render() {
        return (
            <Grid container direction={"column"} mt={"2rem"} pb={"1rem"}>
                <Grid item>
                    <CommonHeader title={this.state.event.title} goBack={this.goBack}/>
                </Grid>
                <Grid container item sx={{ paddingX: "5%", paddingY: "2rem" }}>
                    <EventCreateForm operation={FormOperations.Update} user={this.props.user} event={this.state.event} />
                </Grid>
            </Grid>
        );
    }

}