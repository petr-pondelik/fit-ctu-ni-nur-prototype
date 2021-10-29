import React from "react";
import {Button} from "@mui/material";

interface ActionButtonProps {
    text: string,
    clickHandler(event: React.MouseEvent<HTMLElement>): any
}

const ActionButton: React.FC<ActionButtonProps> = (props: ActionButtonProps) => {
    return (
        <Button
            variant={"contained"}
            onClick={props.clickHandler}
            fullWidth
        >
            {props.text}
        </Button>
    )
}

export default ActionButton;