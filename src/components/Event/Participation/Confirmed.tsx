import React, {MouseEvent, useState} from "react";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {EventInvitationStatus} from "../../../model/Events";
import AlertDialog from "../../Common/AlertDialog";


export interface IConfirmedProps {
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
const Confirmed: React.FC<IConfirmedProps> = (props: IConfirmedProps) => {

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
        props.parentChange(EventInvitationStatus.Confirmed);
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
                <CheckBoxOutlinedIcon
                    sx={{ fontSize: "3.5rem", color: "success.main" }}
                    onClick={handleClick}
                />
                {renderAlertDialog()}
            </React.Fragment>
        )
    }

    function renderActive(): any {
        return (
            <CheckBoxIcon
                sx={{ fontSize: "3.5rem", color: "success.main" }}
                onClick={handleClick}
            />
        )
    }

    function renderInActive(): any {
        return (
            <React.Fragment>
                <CheckBoxOutlinedIcon
                    sx={{ fontSize: "3rem", color: "success.main" }}
                    onClick={handleClick}
                />
                {renderAlertDialog()}
            </React.Fragment>
        );
    }

    if (props.active === undefined) {
        return renderPending();
    }

    return (
        props.active ? renderActive() : renderInActive()
    );
}

export default Confirmed;