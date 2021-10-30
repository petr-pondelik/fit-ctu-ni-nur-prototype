import React from "react";

import {Button, Grid} from "@mui/material";
import Header from "../../components/Header/Header";

import AddIcon from '@mui/icons-material/Add';

import './Homepage.css';
import EventsList from "../../components/EventsList/EventsList";
import {Event} from "../../model/Events";

export interface IHomepageProps {
    events: Array<Event>
}

const Homepage: React.FC<IHomepageProps> = (props: IHomepageProps) => {
    return (
        <Grid container direction={"column"}>
            <Grid item>
                <Header/>
            </Grid>
            <Grid container item sx={{ paddingX: "5%" }}>
                <Grid container item>
                    <Grid item>
                        <h1>
                            Vaše události <Button><AddIcon fontSize={"large"}/></Button>
                        </h1>
                    </Grid>
                </Grid>
                <Grid container item>
                    <EventsList events={props.events}/>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Homepage;
