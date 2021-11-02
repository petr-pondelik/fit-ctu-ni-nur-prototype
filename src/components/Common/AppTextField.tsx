import React from "react";
import {TextField} from "@mui/material";
import MessageBox from "./MessageBox";
import {OverridableStringUnion} from "@mui/types";
import {TextFieldPropsSizeOverrides} from "@mui/material/TextField/TextField";

interface AppTextFieldProps {
    type?: string,
    name: string,
    label: string,
    size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>,
    changeHandler(event: React.ChangeEvent<HTMLInputElement>): void,
    message?: string
}

const AppTextField: React.FC<AppTextFieldProps> = (props: AppTextFieldProps) => {
    return (
        <React.Fragment>
            <TextField
                variant={"standard"}
                type={props.type ?? 'text'}
                name={props.name}
                label={props.label}
                size={props.size ?? 'medium'}
                onChange={props.changeHandler}
                fullWidth
            />
            <MessageBox
                msg={props.message}
                color={'error.main'}
            />
        </React.Fragment>
    );
}

export default AppTextField;