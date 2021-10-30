import React from "react";
import {AppBar, Box, Button, Grid, Toolbar, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {RouteComponentProps, withRouter} from "react-router-dom";

interface ICommonHeaderProps extends RouteComponentProps {
    title: string
}

const CommonHeader: React.FC<ICommonHeaderProps> = (props: ICommonHeaderProps) => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container justifyContent={"space-between"} alignItems={"center"}>
                        <Grid item>
                            <Button color="inherit" sx={{padding: 0, minWidth: "auto"}}>
                                <ArrowBackIcon fontSize={'large'} onClick={props.history.goBack}/>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                                {props.title}
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default withRouter(CommonHeader);