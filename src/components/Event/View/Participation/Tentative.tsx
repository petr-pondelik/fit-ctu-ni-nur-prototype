import React from "react";
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';

export interface ITentativeProps {
    activeState?: boolean
}


const Tentative: React.FC<ITentativeProps> = (props: ITentativeProps) => {
    return <HelpCenterOutlinedIcon sx={{ fontSize: "4rem", color: "text.disabled" }}/>
}

export default Tentative;