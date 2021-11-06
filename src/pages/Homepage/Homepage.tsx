import React, {useState} from "react";
import {Button, Grid, Typography} from "@mui/material";
import HomepageHeader from "../../components/Header/HomepageHeader";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EventsList from "../../components/Event/List/EventsList";
import EventsModel, {Event} from "../../model/Events";
import {User} from "../../model/Users";
import {Link} from "react-router-dom";


export interface IHomepageProps {
    user: User,
}


const Homepage: React.FC<IHomepageProps> = (props: IHomepageProps) => {

    const [events, setEvents] = useState<Event[]>(EventsModel.findByUser(props.user))

    return (
        <Grid container direction={"column"} mt={"5rem"} pb={"1rem"}>
            <Grid item>
                <HomepageHeader/>
            </Grid>
            <Grid container item sx={{ paddingX: "5%" }}>
                <Grid container item alignItems={"center"} sx={{ pt: "1rem", pb: "1.5rem" }}>
                    <Grid item>
                        <Typography variant={"h4"} component={"h1"}>
                            Vaše události
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button component={Link} to={"/event/create"}>
                            <AddBoxOutlinedIcon fontSize={"large"}/>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item>
                    <EventsList
                        user={props.user}
                        events={events}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Homepage;
