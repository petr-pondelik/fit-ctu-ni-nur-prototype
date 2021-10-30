import {withGoogleMap, GoogleMap, Marker, withScriptjs} from "react-google-maps"
import {Event} from "../../../model/Events";
import React from "react";

interface IEventMapProps {
    isMarkerShown: boolean,
    isMarkerDraggable: boolean,
    event: Event
}


/**
 * @param props
 * @constructor
 */
const EventMap: React.FC<IEventMapProps> = (props: IEventMapProps) => {

    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{lat: props.event.location.lat, lng: props.event.location.long}}
        >
            {
                props.isMarkerShown &&
                <Marker
                    position={{lat: props.event.location.lat, lng: props.event.location.long}}
                    draggable={props.isMarkerDraggable}
                    onDragEnd={(e) => {
                        console.log([e.latLng.lat(), e.latLng.lng()])
                    }}
                />
            }
        </GoogleMap>
    )

}

export default withScriptjs(withGoogleMap(EventMap));
