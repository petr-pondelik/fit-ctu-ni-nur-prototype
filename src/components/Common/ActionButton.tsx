import React from "react";
import {Button} from "@mui/material";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsVariantOverrides} from "@mui/material/Button/Button";

interface ActionButtonProps {
    text?: string,
    children?: JSX.Element|string,
    variant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>,
    fullWidth?: boolean,
    clickHandler: (event: React.MouseEvent<HTMLElement>) => any
}

const ActionButton: React.FC<ActionButtonProps> = (props: ActionButtonProps) => {
    return (
        <Button
            variant={props.variant ?? "text"}
            onClick={props.clickHandler}
            fullWidth={props.fullWidth ?? true}
        >
            {props.text ?? props.children}
        </Button>
    )
}

export default ActionButton;