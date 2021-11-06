import React from "react";
import {Grid} from "@mui/material";
import CommonHeader from "../../components/Header/CommonHeader";
import EventCreateForm from "../../components/Event/Form/EventForm";
import {User} from "../../model/Users";
import Events from "../../model/Events";
import {RouteComponentProps} from "react-router-dom";
import {FormOperations} from "../../enums/FormOperations";


export interface IEventCreateProps extends RouteComponentProps {
    user: User
}

export interface IEventCreateState {

}


export default class EventCreate extends React.Component<IEventCreateProps, IEventCreateState> {

    goBack = () => {
        this.props.history.push('/');
        Events.clearUnfinished();
    }

    render() {
        return (
            <Grid container direction={"column"} mt={"4rem"} pb={"1rem"}>
                <Grid item>
                    <CommonHeader title={'Vytvořit událost'} goBack={this.goBack}/>
                </Grid>
                <Grid container item sx={{ paddingX: "5%", paddingY: "2rem" }}>
                    <EventCreateForm operation={FormOperations.Create} user={this.props.user}/>
                </Grid>
            </Grid>
        )
    }

}