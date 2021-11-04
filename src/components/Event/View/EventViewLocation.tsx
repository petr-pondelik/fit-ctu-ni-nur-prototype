import React from "react";
import {ILocation} from "../../../model/Events";
import EventMap from "../Map/EventMap";
import EventLocation from "../Card/EventLocation";


export interface IEventViewLocationProps {
    location: ILocation,
}


/**
 * @param props
 * @constructor
 */
const EventViewLocation: React.FC<IEventViewLocationProps> = (props: IEventViewLocationProps) => {

    return (
        <React.Fragment>
            <EventLocation
                location={props.location}
                variant={"h6"}
                sx={{ pb: "1rem" }}
            />
            <EventMap
                location={props.location}
                isMarkerShown={true}
                isMarkerDraggable={false}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbhfQQJ63e272JyDZ9nUZq34Q34RHvcZg&callback=initMap"
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `27.5vh`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />
        </React.Fragment>
    );

}

export default EventViewLocation;