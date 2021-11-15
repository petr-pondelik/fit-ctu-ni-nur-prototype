import React from "react";
import {AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import UsersModel from "../../model/Users";
import {AppState} from "../../App";

export interface IHomepageHeaderProps {
    updateParent: (key: keyof AppState, data: any) => any
}

/**
 * @param props
 * @constructor
 */
const HomepageHeader: React.FC<IHomepageHeaderProps> = (props: IHomepageHeaderProps) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        UsersModel.logOut();
        props.updateParent('user', undefined);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        EVENTER
                    </Typography>
                    <Button color="inherit" onClick={handleClick} sx={{ padding: 0, minWidth: "auto" }}>
                        <PersonIcon fontSize={'large'} sx={{ color: "grey-50" }}/>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleLogout}>Odhlásit se</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default HomepageHeader;
