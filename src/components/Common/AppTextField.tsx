import React from "react";
import {TextField} from "@mui/material";
import {OverridableStringUnion} from "@mui/types";
import {TextFieldPropsSizeOverrides} from "@mui/material/TextField/TextField";

interface AppTextFieldProps {
    type?: string,
    name: string,
    label: string,
    size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>,
    defaultValue?: string|null,
    message?: string|null,
    updateParent(stateFragment: any): void,
}

const AppTextField: React.FC<AppTextFieldProps> = (props: AppTextFieldProps) => {

    /**
     * @param event
     */
    function update(event: React.ChangeEvent<HTMLInputElement>) {
        let key: string = event.currentTarget.name;
        let newVal: string = event.currentTarget.value as string;
        let stateFragment: any = { data: {} };
        stateFragment.data[key] = newVal;
        props.updateParent(stateFragment);
    }

    return (
        <React.Fragment>
            <TextField
                variant={"standard"}
                type={props.type ?? 'text'}
                name={props.name}
                label={props.label}
                size={props.size ?? 'medium'}
                defaultValue={props.defaultValue ?? undefined}
                onChange={update}
                error={typeof props.message === 'string'}
                helperText={props.message}
                fullWidth
            />
        </React.Fragment>
    );
}

export default AppTextField;