import React from "react";
import {AppBar, Box, Button, Grid, Toolbar, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {RouteComponentProps, withRouter} from "react-router-dom";


interface ICommonHeaderProps extends RouteComponentProps {
    title: string,
    children?: JSX.Element,
    goBack?: (data?: any) => any
}


/**
 * @param props
 * @constructor
 */
const CommonHeader: React.FC<ICommonHeaderProps> = (props: ICommonHeaderProps) => {

    function renderIcon() {
        if (props.children === undefined) {
            return '';
        }
        return (
            <Grid item>
                <Typography variant="h5" component="div" sx={{flexGrow: 1, pr: "0.5rem", pt: "0.25rem"}}>
                    {props.children}
                </Typography>
            </Grid>
        );
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar sx={{ position: "fixed"}}>
                <Toolbar>
                    <Grid container justifyContent={"space-between"} alignItems={"center"}>
                        <Grid item>
                            <Button color="inherit" sx={{padding: 0, minWidth: "auto"}}>
                                <ArrowBackIcon fontSize={'large'} onClick={props.goBack}/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems={"center"} justifyContent={"end"}>
                                {renderIcon()}
                                <Grid item>
                                    <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                                        {props.title}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default withRouter(CommonHeader);