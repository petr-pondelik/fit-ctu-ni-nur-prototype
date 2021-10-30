import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import {SxProps} from "@mui/system";

export interface IDeclinedProps {
    activeState?: boolean
}

const PendingStyle: SxProps = {
    fontSize: "2.35rem",
    border: "5px solid",
    borderRadius: "6px",
    borderColor: "error.main",
    marginX: "8px"
}

const Declined: React.FC<IDeclinedProps> = (props: IDeclinedProps) => {
    return <CloseIcon sx={{ color: "error.main", ...PendingStyle }}/>
}

export default Declined;