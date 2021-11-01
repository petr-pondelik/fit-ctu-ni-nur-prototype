import React from "react";
import {User} from "../../model/Users";
import {Grid} from "@mui/material";
import {RouteComponentProps} from "react-router-dom";
import Events, {Event} from "../../model/Events";
import CommonHeader from "../../components/Header/CommonHeader";


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
            <Grid container direction={"column"} mt={"4rem"} pb={"1rem"}>
                <Grid item>
                    <CommonHeader title={this.state.event.title}/>
                </Grid>
            </Grid>
        );
    }

}