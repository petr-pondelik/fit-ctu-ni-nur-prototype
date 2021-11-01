import React from "react";
import {Grid} from "@mui/material";
import CommonHeader from "../../components/Header/CommonHeader";


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
            <Grid container direction={"column"} mt={"4rem"} pb={"1rem"}>
                <Grid item>
                    <CommonHeader title={'Vytvořit událost'}/>
                </Grid>
            </Grid>
        )
    }

}