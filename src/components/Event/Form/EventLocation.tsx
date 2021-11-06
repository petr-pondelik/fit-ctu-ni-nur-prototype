import React from "react";
import EventMap from "../Map/EventMap";
import {ILocation} from "../../../model/Events";
import EventLocationAutocomplete from "./EventLocationAutocomplete";
import {Grid} from "@mui/material";


export interface IEventCreateLocationProps {
    location: ILocation|null,
    updateParent(stateFragment: any): void
}


/**
 * @param props
 * @constructor
 */
const EventLocation: React.FC<IEventCreateLocationProps> = (props: IEventCreateLocationProps) => {

    function getLocation(): ILocation {
        return {
            name: props.location ? props.location.name : '',
            address: props.location ? props.location.address : '',
            lat: props.location ? props.location.lat : 50.0595854,
            long: props.location ? props.location.long : 14.3255433
        }
    }

    /**
     * @param stateFragment
     */
    function update(stateFragment: any) {
        let sf: any = {data: stateFragment };
        props.updateParent(sf);
    }

    return (
        <Grid container item direction={"column"}>
            <Grid item mb={"0.75rem"}>
                <EventLocationAutocomplete
                    location={props.location}
                    updateParent={update}
                />
            </Grid>
            <Grid item>
                <EventMap
                    location={getLocation()}
                    isMarkerShown={true}
                    isMarkerDraggable={true}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbhfQQJ63e272JyDZ9nUZq34Q34RHvcZg&callback=initMap"
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{height: `27.5vh`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                    updateParent={update}
                />
            </Grid>
        </Grid>
    );

}

export default EventLocation;