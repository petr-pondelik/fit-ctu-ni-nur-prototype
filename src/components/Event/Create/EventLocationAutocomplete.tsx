import React from "react";
import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import {ILocation} from "../../../model/Events";


export interface IEventLocationAutocompleteProps {
    location?: ILocation,
    updateParent(stateFragment: any): void
}

let addressesOriginal: ILocation[] = [
    {
        name: 'Sinobo Stadium',
        address: 'U Slavie 1540/2a, 100 00 Praha 10-Vršovice',
        lat: 50.0674643,
        long: 14.4705921
    },
    {
        name: 'Lucerna',
        address: 'Štěpánská 61, 116 02 Nové Město',
        lat: 50.0814607,
        long: 14.4230261
    },
    {
        name: 'Kavárna Kabinet',
        address: 'Terronská 619, 160 00 Praha 6-Bubeneč',
        lat: 50.102453,
        long: 14.3929309
    }
];

let addresses: ILocation[] = [
    {
        name: 'Sinobo Stadium',
        address: 'U Slavie 1540/2a, 100 00 Praha 10-Vršovice',
        lat: 50.0674643,
        long: 14.4705921
    },
    {
        name: 'Lucerna',
        address: 'Štěpánská 61, 116 02 Nové Město',
        lat: 50.0814607,
        long: 14.4230261
    },
    {
        name: 'Kavárna Kabinet',
        address: 'Terronská 619, 160 00 Praha 6-Bubeneč',
        lat: 50.102453,
        long: 14.3929309
    }
];


/**
 * @param props
 * @constructor
 */
const EventLocationAutocomplete: React.FC<IEventLocationAutocompleteProps> = (props: IEventLocationAutocompleteProps) => {

    const [value, setValue] = React.useState<ILocation | null>(props.location ?? null);

    /**
     * @param newValue
     */
    function update(newValue: ILocation | null) {
        console.log('EventLocationAutocomplete update');
        setValue(newValue);
        let sf = {location: newValue ?? undefined};
        console.log(sf);
        props.updateParent(sf);
    }

    addresses = JSON.parse(JSON.stringify(addressesOriginal));
    console.log(addressesOriginal);
    console.log(addresses);

    return (
        <Autocomplete
            defaultValue={value}
            onChange={(event, newValue) => {
                if (typeof newValue !== 'string') {
                    update(newValue);
                }
            }}
            options={addresses}
            getOptionLabel={(option) => {
                return `${option.name}, ${option.address}`;
            }}
            renderOption={
                (props, option) => {
                    return <li {...props}>{option.name}<br/>{option.address}</li>
                }
            }
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Vyhledat místo"/>
            )}
            fullWidth
        />
    );
}


export default EventLocationAutocomplete;