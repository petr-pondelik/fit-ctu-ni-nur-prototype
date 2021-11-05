import {withGoogleMap, GoogleMap, Marker, withScriptjs} from "react-google-maps"
import {ILocation} from "../../../model/Events";
import React from "react";


interface IEventMapProps {
    isMarkerShown: boolean,
    isMarkerDraggable: boolean,
    location: ILocation,
    updateParent?: (stateFragment: any) => void
}


/**
 * @param props
 * @constructor
 */
const EventMap: React.FC<IEventMapProps> = (props: IEventMapProps) => {

    /**
     * @param lat
     * @param lng
     */
    const update = (lat: number, lng: number) => {
        if (props.updateParent !== undefined) {
            let sf: any = {
                location: {
                    lat: lat,
                    long: lng
                }
            };
            props.updateParent(sf);
        }
    };

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
                            update(e.latLng.lat(), e.latLng.lng());
                        }}
                    />
                }
            </GoogleMap>
        </React.Fragment>
    )

}

export default withScriptjs(withGoogleMap(EventMap));
