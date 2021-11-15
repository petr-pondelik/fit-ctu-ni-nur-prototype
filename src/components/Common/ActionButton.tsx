import React from "react";
import {Button} from "@mui/material";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsColorOverrides, ButtonPropsVariantOverrides} from "@mui/material/Button/Button";

interface ActionButtonProps {
    text?: string,
    children?: JSX.Element|JSX.Element[]|string,
    variant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>,
    color?: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning', ButtonPropsColorOverrides>
    fullWidth?: boolean,
    clickHandler?: (event: React.MouseEvent<HTMLElement>) => any
}

const ActionButton: React.FC<ActionButtonProps> = (props: ActionButtonProps) => {
    return (
        <Button
            variant={props.variant ?? "text"}
            color={props.color ?? 'primary'}
            onClick={props.clickHandler}
            fullWidth={props.fullWidth ?? true}
            sx={{ paddingY: "0.6rem" }}
        >
            {props.text ?? props.children}
        </Button>
    )
}

export default ActionButton;