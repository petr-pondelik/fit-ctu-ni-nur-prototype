import React from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const Header: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        EVENTER
                    </Typography>
                    <Button color="inherit" sx={{ padding: 0, minWidth: "auto" }}>
                        <PersonIcon fontSize={'large'}/>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
