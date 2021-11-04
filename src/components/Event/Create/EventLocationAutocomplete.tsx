import React from "react";
import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import {ILocation} from "../../../model/Events";

export interface IEventLocationAutocompleteProps {
    value?: string
}

const filter = createFilterOptions<ILocation>();

export default function EventLocationAutocomplete() {

    const [value, setValue] = React.useState<ILocation | null>(null);

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                console.log(newValue);
                if (typeof newValue !== 'string') {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                return filter(options, params);
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
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

const addresses: readonly ILocation[] = [
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