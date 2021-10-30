import React from "react";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";


export interface IConfirmedProps {
    activeState?: boolean
}


const Confirmed: React.FC<IConfirmedProps> = (props: IConfirmedProps) => {
    return <CheckBoxOutlinedIcon sx={{ fontSize: "4rem", color: "success.main" }}/>
}

export default Confirmed;