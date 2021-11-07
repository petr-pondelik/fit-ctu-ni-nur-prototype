import {Box} from "@mui/material";
import React from "react";

interface MessageProps {
    msg?: string|null,
    color: string
}

const MessageBox: React.FC<MessageProps> = (props: MessageProps) => {
    return (
        <Box sx={{color: props.color}}>
            <p style={{margin: 0, fontSize: '0.8rem'}}>{props.msg}</p>
        </Box>
    );
}

export default MessageBox;