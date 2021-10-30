import React from "react";
import {Grid} from "@mui/material";
import {IAttendantsList} from "../../../../model/Events";
import Confirmed from "./Confirmed";
import Declined from "./Declined";
import Tentative from "./Tentative";

interface IEventParticipationProps {
    attendants: IAttendantsList
}

/**
 * @param props
 * @constructor
 */
const EventParticipation: React.FC<IEventParticipationProps> = (props: IEventParticipationProps) => {

    // <Grid container>
    //     <Grid container item>
    //         <Grid item>
    //
    //         </Grid>
    //     </Grid>
    //     <Grid container item>
    //         <Grid item>
    //
    //         </Grid>
    //         <Grid item>
    //
    //         </Grid>
    //     </Grid>
    // </Grid>

    return (
        <Grid container alignItems={"center"} justifyContent={"space-around"} pt={"1rem"}>
            <Grid item>
                <Confirmed/>
            </Grid>
            <Grid item>
                <Tentative/>
            </Grid>
            <Grid item>
                <Declined/>
            </Grid>
        </Grid>
    );

}

export default EventParticipation;