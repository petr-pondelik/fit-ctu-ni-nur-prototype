import {LocalizationProvider, MobileDateTimePicker} from '@mui/lab';
import {TextField, Typography} from "@mui/material";
import React from "react";
import AdapterMoment from '@mui/lab/AdapterMoment';
import moment, {Moment} from 'moment';
import 'moment/locale/cs';
import {SxProps} from "@mui/system";
import {Label} from "@mui/icons-material";

moment.locale('cs');

export interface IAppDateTimePickerProps {
    toolbarTitle?: string,
    textHelper?: string
}

/**
 * @param props
 * @constructor
 */
const AppDateTimePicker: React.FC<IAppDateTimePickerProps> = (props: IAppDateTimePickerProps) => {

    const [value, setValue] = React.useState<Moment | null>(
        moment(new Date('2018-01-01T00:00:00.000Z')),
    );

    const TextFieldStyle: SxProps = {
        marginY: "0.5rem",
        borderColor: "text.secondary",
        color: "text.secondary"
    };

    /**
     * @param neValue
     */
    function onDateTimeChange(neValue: Moment | null) {
        setValue(neValue);
    }

    return (
        <React.Fragment>
            {/*<Label>T</Label>*/}
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDateTimePicker
                    value={value}
                    onChange={(newValue) => onDateTimeChange(newValue)}
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
                />
            </LocalizationProvider>
        </React.Fragment>
    );

}

export default AppDateTimePicker;