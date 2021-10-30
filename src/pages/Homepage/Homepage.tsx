import React from "react";

import {Button, Grid} from "@mui/material";
import Header from "../../components/Header/Header";

import AddIcon from '@mui/icons-material/Add';

import './Homepage.css';
import EventsList from "../../components/EventsList/EventsList";
import {Event} from "../../model/Events";
import {User} from "../../model/Users";

export interface IHomepageProps {
    loggedUser: User,
    events: Array<Event>
}

const Homepage: React.FC<IHomepageProps> = (props: IHomepageProps) => {
    return (
        <Grid container direction={"column"} py={"1rem"}>
            <Grid item>
                <Header/>
            </Grid>
            <Grid container item sx={{ paddingX: "5%" }}>
                <Grid container item alignItems={"center"}>
                    <Grid item>
                        <h1>Vaše události</h1>
                    </Grid>
                    <Grid item>
                        <Button><AddIcon fontSize={"large"}/></Button>
                    </Grid>
                </Grid>
                <Grid container item>
                    <EventsList
                        loggedUser={props.loggedUser}
                        events={props.events}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Homepage;
