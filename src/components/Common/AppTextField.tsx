import React from "react";
import {TextField} from "@mui/material";
import MessageBox from "./MessageBox";

interface AppTextFieldProps {
    type: string,
    name: string,
    label: string,
    changeHandler(event: React.ChangeEvent<HTMLInputElement>): void,
    message?: string
}

const AppTextField: React.FC<AppTextFieldProps> = (props: AppTextFieldProps) => {
    return (
        <React.Fragment>
            <TextField
                type={props.type}
                name={props.name}
                label={props.label}
                variant={"standard"}
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