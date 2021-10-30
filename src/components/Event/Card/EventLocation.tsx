import React from "react";
import PlaceIcon from '@mui/icons-material/Place';
import {Grid, Typography} from "@mui/material";
import {ILocation} from "../../../model/Events";
import {OverridableStringUnion} from "@mui/types";
import {Variant} from "@mui/material/styles/createTypography";
import {TypographyPropsVariantOverrides} from "@mui/material/Typography/Typography";
import {SxProps} from "@mui/system";

interface IEventLocationProps {
    location: ILocation,
    variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>,
    sx?: SxProps
}

/**
 * @param props
 * @constructor
 */
const EventLocation: React.FC<IEventLocationProps> = (props: IEventLocationProps) => {

    const defaultProps: IEventLocationProps = {
        location: {
            name: '',
            lat: 0,
            long: 0,
        },
        variant: 'body1',
        sx: {}
    };

    return (
        <Grid container alignItems={"center"} sx={props.sx ?? defaultProps.sx}>
            <Grid item>
                <PlaceIcon/>
            </Grid>
            <Grid item>
                <Typography variant={props.variant ?? defaultProps.variant} pl={"0.5rem"}>
                    {props.location.name}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default EventLocation;