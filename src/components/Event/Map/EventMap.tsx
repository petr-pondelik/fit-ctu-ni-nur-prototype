import {withGoogleMap, GoogleMap, Marker, withScriptjs} from "react-google-maps"
import {ILocation} from "../../../model/Events";
import React from "react";


interface IEventMapProps {
    isMarkerShown: boolean,
    isMarkerDraggable: boolean,
    location: ILocation,
}


/**
 * @param props
 * @constructor
 */
const EventMap: React.FC<IEventMapProps> = (props: IEventMapProps) => {

    return (
        <React.Fragment>
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{lat: props.location.lat, lng: props.location.long}}
                center={{lat: props.location.lat, lng: props.location.long}}
            >
                {
                    props.isMarkerShown &&
                    <Marker
                        position={{lat: props.location.lat, lng: props.location.long}}
                        draggable={props.isMarkerDraggable}
                        onDragEnd={(e) => {
                            console.log([e.latLng.lat(), e.latLng.lng()])
                        }}
                    />
                }
            </GoogleMap>
        </React.Fragment>
    )

}

export default withScriptjs(withGoogleMap(EventMap));
