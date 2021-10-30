import React from "react";
import PlaceIcon from '@mui/icons-material/Place';
import {Grid, Typography} from "@mui/material";
import {IPlace} from "../../model/Events";

interface IEventPlaceProps {
    place: IPlace
}

/**
 * @param props
 * @constructor
 */
const EventPlace: React.FC<IEventPlaceProps> = (props: IEventPlaceProps) => {
    return (
        <Grid container alignItems={"center"}>
            <Grid item>
                <PlaceIcon/>
            </Grid>
            <Grid item>
                <Typography pl={"0.5rem"}>
                    {props.place.name}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default EventPlace;