import React from "react";
import {Button, Grid} from "@mui/material";
import CommonHeader from "../../components/Header/CommonHeader";
import AppTextField from "../../components/Common/AppTextField";
import EventCreateForm from "../../components/Event/Create/CreateForm/EventCreateForm";


export interface IEventCreateProps {

}

export interface IEventCreateState {

}


export default class EventCreate extends React.Component<IEventCreateProps, IEventCreateState> {

    /**
     * @param props
     */
    constructor(props: IEventCreateProps) {
        super(props);
    }

    render() {
        return (
            <Grid container direction={"column"} mt={"5rem"} pb={"1rem"}>
                <Grid item>
                    <CommonHeader title={'Vytvořit událost'}/>
                </Grid>
                <Grid container item sx={{ paddingX: "5%", paddingY: "2rem" }}>
                    <EventCreateForm/>
                </Grid>
            </Grid>
        )
    }

}