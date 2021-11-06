import React from "react";
import {Grid} from "@mui/material";
import CommonHeader from "../../components/Header/CommonHeader";
import EventCreateForm from "../../components/Event/Form/EventForm";
import {User} from "../../model/Users";
import Events from "../../model/Events";


export interface IEventCreateProps {
    user: User
}

export interface IEventCreateState {

}


export default class EventCreate extends React.Component<IEventCreateProps, IEventCreateState> {

    goBackCallback = () => {
        Events.clearUnfinished();
    }

    render() {
        return (
            <Grid container direction={"column"} mt={"4rem"} pb={"1rem"}>
                <Grid item>
                    <CommonHeader title={'Vytvořit událost'} goBackCallback={this.goBackCallback}/>
                </Grid>
                <Grid container item sx={{ paddingX: "5%", paddingY: "2rem" }}>
                    <EventCreateForm user={this.props.user}/>
                </Grid>
            </Grid>
        )
    }

}