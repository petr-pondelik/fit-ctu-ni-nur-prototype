import React, {MouseEvent} from "react";
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import {EventInvitationStatus} from "../../../../model/Events";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export interface ITentativeProps {
    active?: boolean,
    parentChange(invitationResponse: EventInvitationStatus): void
}


/**
 * @param props
 * @constructor
 */
const Tentative: React.FC<ITentativeProps> = (props: ITentativeProps) => {

    /**
     * @param e
     */
    function handleClick(e: MouseEvent<SVGSVGElement>) {
        props.parentChange(EventInvitationStatus.Tentative);
    }

    function renderPending(): any {
        return <HelpCenterOutlinedIcon
            sx={{ fontSize: "4rem", color: "text.disabled" }}
            onClick={handleClick}
        />
    }

    function renderActive(): any {
        return <HelpCenterIcon
            sx={{ fontSize: "4rem", color: "text.disabled" }}
            onClick={handleClick}
        />
    }

    function renderInActive(): any {
        return <HelpCenterOutlinedIcon
            sx={{ fontSize: "3rem", color: "text.disabled" }}
            onClick={handleClick}
        />
    }

    if (props.active === undefined) {
        return renderPending();
    }
    return props.active ? renderActive() : renderInActive();
}

export default Tentative;