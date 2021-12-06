import React, {useEffect, useState} from "react";
import {Grid, Typography} from "@mui/material";
import HomepageHeader from "../../components/Header/HomepageHeader";
import EventsList from "../../components/Event/List/EventsList";
import EventsModel, {Event} from "../../model/Events";
import {User} from "../../model/Users";
import {useHistory} from "react-router-dom";
import {AppState} from "../../App";
import FloatingActionButtons from "../../components/Common/FloatingActionButton";
import Messages from "../../model/Messages";
import MessageDialog from "../../components/Common/MessageDialog";


export interface IHomepageProps {
    user: User,
    updateParent: (key: keyof AppState, data: any) => any
}


const Homepage: React.FC<IHomepageProps> = (props: IHomepageProps) => {

    const [events] = useState<Event[]>(EventsModel.findByUser(props.user));
    const [messageOpened, setMessageOpened] = useState(Messages.data.length > 0);


    const history = useHistory();

    useEffect(() => {
        let anchorId: string = history.location.hash.substr(1);
        if (anchorId !== '') {
            let eventCard: HTMLElement = document.querySelector(`#event-${anchorId}`) as HTMLElement;
            if (eventCard instanceof HTMLElement) {
                window.scrollTo(0, (eventCard.offsetTop < window.innerHeight/2) ? 0 : eventCard.offsetTop - 70);
            }
        }
    }, []);

    const renderFloatingCreateBtn = () => {
        if (events.length > 0) {
            return <FloatingActionButtons/>
        }
    }

    const renderMessage = () => {
        console.log('renderMessage');
        if (Messages.data.length < 1) {
            return;
        }
        let msg = Messages.pop()?.msg;
        if (msg) {
            return (
                <MessageDialog
                    msg={msg}
                    open={messageOpened}
                    onClose={() => setMessageOpened(false)}
                />
            )
        }
    }

    console.log('Render homepage');

    return (
        <Grid container direction={"column"} mt={"5rem"} pb={"1rem"}>
            <Grid item>
                <HomepageHeader updateParent={props.updateParent} />
            </Grid>
            <Grid container item sx={{ paddingX: "5%" }}>
                <Grid container item alignItems={"center"} sx={{ pt: "1rem", pb: "1.5rem" }}>
                    <Grid item>
                        <Typography variant={"h4"} component={"h1"}>
                            Vaše události
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item>
                    <EventsList
                        user={props.user}
                        events={events}
                    />
                </Grid>
            </Grid>
            {renderFloatingCreateBtn()}
            {renderMessage()}
        </Grid>
    );
};

export default Homepage;
