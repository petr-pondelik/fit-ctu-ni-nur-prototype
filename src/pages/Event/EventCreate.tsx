import React from "react";
import {Grid} from "@mui/material";
import CommonHeader, {ActionType} from "../../components/Header/CommonHeader";
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

    componentDidMount() {
        let anchor: string = this.props.history.location.hash;
        if (anchor !== '') {
            setTimeout(() => {
                let elem: HTMLElement = document.querySelector(anchor) as HTMLElement;
                if (elem instanceof HTMLElement) {
                    window.scrollTo(0, elem.offsetTop - 70);
                }
            }, 5)
        } else {
            window.scrollTo(0, 0);
        }
    }

    goBack = () => {
        this.props.history.push('/');
        Events.clearUnfinished();
    }

    render() {
        return (
            <Grid container direction={"column"} mt={"2rem"} pb={"1rem"}>
                <Grid item>
                    <CommonHeader
                        title={'Vytvořit událost'}
                        showDialog={true}
                        actionType={ActionType.BACK}
                        yesAction={this.goBack}
                    />
                </Grid>
                <Grid container item sx={{ paddingX: "5%", paddingY: "2rem" }}>
                    <EventCreateForm operation={FormOperations.Create} user={this.props.user}/>
                </Grid>
            </Grid>
        )
    }

}