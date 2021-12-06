import React, {MouseEvent, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import {SxProps} from "@mui/system";
import {EventInvitationStatus} from "../../../model/Events";
import AlertDialog from "../../Common/AlertDialog";


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

interface IStateFragment {
    alertOpened?: boolean,
}


const Declined: React.FC<IDeclinedProps> = (props: IDeclinedProps) => {

    const [alertOpened, setAlertOpened] = useState(false);

    const update = (sf: IStateFragment) => {
        if(typeof sf.alertOpened === "boolean") {
            setAlertOpened(sf.alertOpened);
        }
    };

    /**
     * @param e
     */
    function handleClick(e: MouseEvent<SVGSVGElement>) {
        setAlertOpened(true);
    }

    const yesAction = () => {
        props.parentChange(EventInvitationStatus.Declined);
        setAlertOpened(false);
    }

    const renderAlertDialog = () => {
        return (
            <AlertDialog
                title={'Změna účasti'}
                question={'Chcete změnit své vyjádření k účasti?'}
                open={alertOpened}
                parentUpdate={update}
                yesAction={yesAction}
            />
        );
    }

    function renderPending(): any {
        return (
            <React.Fragment>
                <CloseIcon
                    sx={{ color: "error.main", ...PendingStyle }}
                    onClick={handleClick}
                />
                {renderAlertDialog()}
            </React.Fragment>
        )
    }

    function renderActive(): any {
        return (
            <CloseIcon
                sx={{ color: "error.main", ...ActiveStyle }}
                onClick={handleClick}
            />
        )
    }

    function renderInActive(): any {
        return (
            <React.Fragment>
                <CloseIcon
                    sx={{ color: "error.main", ...InactiveStyle }}
                    onClick={handleClick}
                />
                {renderAlertDialog()}
            </React.Fragment>
        )
    }

    if (props.active === undefined) {
        return renderPending();
    }

    return props.active ? renderActive() : renderInActive();

}

export default Declined;