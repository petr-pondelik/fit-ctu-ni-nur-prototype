import React, {MouseEvent} from "react";
import CloseIcon from '@mui/icons-material/Close';
import {SxProps} from "@mui/system";
import {EventInvitationStatus} from "../../../model/Events";

export interface IDeclinedProps {
    active?: boolean,
    parentChange(invitationResponse: EventInvitationStatus): void
}

const PendingStyle: SxProps = {
    fontSize: "1.8rem",
    border: "5px solid",
    borderRadius: "6px",
    borderColor: "error.main",
    marginX: "7px"
}

const ActiveStyle: SxProps = {
    fontSize: "1.8rem",
    border: "5px solid",
    borderRadius: "6px",
    borderColor: "error.main",
    color: "white",
    backgroundColor: "error.main",
    marginX: "7px"
}

const InactiveStyle: SxProps = {
    fontSize: "1.8rem",
    border: "3.5px solid",
    borderRadius: "6px",
    borderColor: "error.main",
    marginX: "7px"
}

const Declined: React.FC<IDeclinedProps> = (props: IDeclinedProps) => {

    /**
     * @param e
     */
    function handleClick(e: MouseEvent<SVGSVGElement>) {
        props.parentChange(EventInvitationStatus.Declined);
    }

    function renderPending(): any {
        return <CloseIcon
            sx={{ color: "error.main", ...PendingStyle }}
            onClick={handleClick}
        />
    }

    function renderActive(): any {
        return <CloseIcon
            sx={{ color: "error.main", ...ActiveStyle }}
            onClick={handleClick}
        />
    }

    function renderInActive(): any {
        return <CloseIcon
            sx={{ color: "error.main", ...InactiveStyle }}
            onClick={handleClick}
        />
    }

    if (props.active === undefined) {
        return renderPending();
    }
    return props.active ? renderActive() : renderInActive();

}

export default Declined;