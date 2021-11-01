import React from "react";
import {Button, Grid, Typography} from "@mui/material";
import HomepageHeader from "../../components/Header/HomepageHeader";
import AddIcon from '@mui/icons-material/Add';
import EventsList from "../../components/Event/List/EventsList";
import {Event} from "../../model/Events";
import {User} from "../../model/Users";
import {Link} from "react-router-dom";


export interface IHomepageProps {
    user: User,
    events: Array<Event>
}


const Homepage: React.FC<IHomepageProps> = (props: IHomepageProps) => {
    return (
        <Grid container direction={"column"} mt={"4rem"} pb={"1rem"}>
            <Grid item>
                <HomepageHeader/>
            </Grid>
            <Grid container item sx={{ paddingX: "5%" }}>
                <Grid container item alignItems={"center"} sx={{ py: "1.25rem" }}>
                    <Grid item>
                        <Typography variant={"h4"} component={"h1"}>
                            Vaše události
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button component={Link} to={"/event/create"}>
                            <AddIcon fontSize={"large"}/>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item>
                    <EventsList
                        user={props.user}
                        events={props.events}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Homepage;
