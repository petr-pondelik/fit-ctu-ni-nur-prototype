import React from "react";
import {TextField} from "@mui/material";


interface IAppTextAreaProps {
    name: string,
    label: string,
    minRows?: number,
    value?: string,
    updateParent(stateFragment: any): void,
}

/**
 * @param props
 * @constructor
 */
const AppTextArea: React.FC<IAppTextAreaProps> = (props: IAppTextAreaProps) => {

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
        <TextField
            name={props.name}
            label={props.label}
            multiline
            minRows={props.minRows ?? 4}
            value={props.value}
            onChange={update}
            fullWidth
        />
    );

}

export default AppTextArea;