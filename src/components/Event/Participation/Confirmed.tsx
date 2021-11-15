import React, {MouseEvent} from "react";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {EventInvitationStatus} from "../../../model/Events";


export interface IConfirmedProps {
    active?: boolean,
    parentChange(invitationResponse: EventInvitationStatus): void
}


/**
 * @param props
 * @constructor
 */
const Confirmed: React.FC<IConfirmedProps> = (props: IConfirmedProps) => {

    /**
     * @param e
     */
    function handleClick(e: MouseEvent<SVGSVGElement>) {
        props.parentChange(EventInvitationStatus.Confirmed);
    }

    function renderPending(): any {
        return <CheckBoxOutlinedIcon
            sx={{ fontSize: "3.5rem", color: "success.main" }}
            onClick={handleClick}
        />
    }

    function renderActive(): any {
        return <CheckBoxIcon
            sx={{ fontSize: "3.5rem", color: "success.main" }}
            onClick={handleClick}
        />
    }

    function renderInActive(): any {
        return <CheckBoxOutlinedIcon
            sx={{ fontSize: "3rem", color: "success.main" }}
            onClick={handleClick}
        />
    }

    if (props.active === undefined) {
        return renderPending();
    }
    return props.active ? renderActive() : renderInActive();
}

export default Confirmed;