import {LocalizationProvider, MobileDateTimePicker} from '@mui/lab';
import {TextField} from "@mui/material";
import React from "react";
import AdapterMoment from '@mui/lab/AdapterMoment';
import moment, {Moment} from 'moment';
import 'moment/locale/cs';
import {SxProps} from "@mui/system";
moment.locale('cs');


export interface IAppDateTimePickerProps {
    name: string,
    value: Date,
    label?: string,
    toolbarTitle?: string,
    textHelper?: string,
    updateParent(stateFragment: any): void
}


/**
 * @param props
 * @constructor
 */
const AppDateTimePicker: React.FC<IAppDateTimePickerProps> = (props: IAppDateTimePickerProps) => {

    const [value, setValue] = React.useState<Moment | null>(moment(props.value));

    const TextFieldStyle: SxProps = {
        marginY: "0.5rem",
        borderColor: "text.secondary",
        color: "text.secondary"
    };

    /**
     * @param newValue
     */
    function update(newValue: Moment | null) {
        setValue(newValue);
        let stateFragment: any = { data: {} };
        stateFragment.data[props.name] = newValue?.toISOString();
        props.updateParent(stateFragment);
    }

    return (
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDateTimePicker
                    value={moment(value)}
                    onError={(e) => console.log(e)}
                    onChange={(newValue) => update(newValue)}
                    renderInput={
                        (params) => {
                            return <TextField
                                sx={TextFieldStyle}
                                fullWidth
                                {...params}
                            />
                        }
                    }
                    minDateTime={moment(new Date())}
                    toolbarTitle={props.toolbarTitle}
                    label={props.label}
                />
            </LocalizationProvider>
        </React.Fragment>
    );

}

export default AppDateTimePicker;