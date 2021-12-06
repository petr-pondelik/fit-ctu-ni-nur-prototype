import React, {MouseEvent, useState} from "react";
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import {EventInvitationStatus} from "../../../model/Events";
import AlertDialog from "../../Common/AlertDialog";


export interface ITentativeProps {
    active?: boolean,
    parentChange(invitationResponse: EventInvitationStatus): void
}

interface IStateFragment {
    alertOpened?: boolean,
}


/**
 * @param props
 * @constructor
 */
const Tentative: React.FC<ITentativeProps> = (props: ITentativeProps) => {

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
        props.parentChange(EventInvitationStatus.Tentative);
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
                <HelpCenterOutlinedIcon
                    sx={{ fontSize: "3.5rem", color: "text.disabled" }}
                    onClick={handleClick}
                />
                {renderAlertDialog()}
            </React.Fragment>
        )
    }

    function renderActive(): any {
        return <HelpCenterIcon
            sx={{ fontSize: "3.5rem", color: "text.disabled" }}
            onClick={handleClick}
        />
    }

    function renderInActive(): any {
        return (
            <React.Fragment>
                <HelpCenterOutlinedIcon
                    sx={{ fontSize: "3rem", color: "text.disabled" }}
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

export default Tentative;