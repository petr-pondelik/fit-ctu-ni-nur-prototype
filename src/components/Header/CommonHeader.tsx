import React, {useState} from "react";
import {AppBar, Box, Button, Grid, Toolbar, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {RouteComponentProps, withRouter} from "react-router-dom";
import AlertDialog from "../Common/AlertDialog";
import Events, {AttendantsList} from "../../model/Events";
import * as _ from "lodash";


export enum ActionType {
    BACK = 'back',
    SAVE = 'save'
}

interface ICommonHeaderProps extends RouteComponentProps {
    title: string,
    children?: JSX.Element,
    actionType: ActionType,
    showDialog?: boolean,
    yesAction?: (data?: any) => any,
    noAction?: (data: any) => any,
    entity?: any
}

interface IStateFragment {
    alertOpened?: boolean,
}

/**
 * @param props
 * @constructor
 */
const CommonHeader: React.FC<ICommonHeaderProps> = (props: ICommonHeaderProps) => {

    const [alertOpened, setAlertOpened] = useState(false);

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

    const openAlertDialog = () => {
        // if (Events.fetchUnfinished() !== undefined) {
        //     // @ts-ignore
        //     console.log(new AttendantsList(Events.fetchUnfinished().attendants));
        //     console.log(props.entity.attendants);
        // }
        if (window.location.pathname === '/event/create' && Events.fetchUnfinished() !== undefined && Events.fetchUnfinished()?.attendants !== null) {
            setAlertOpened(true);
            return;
        }
        if (window.location.pathname === '/event/create' && sessionStorage.getItem('eventChanges') === null && typeof props.yesAction === 'function') {
            props.yesAction();
            return;
        }

        if (window.location.pathname.startsWith('/event/edit') && Events.fetchUnfinished() !== undefined) {
            // // @ts-ignore
            // console.log(new AttendantsList(Events.fetchUnfinished().attendants));
            // console.log(props.entity.attendants);
            // // @ts-ignore
            // console.log(_.isEqual(new AttendantsList(Events.fetchUnfinished().attendants), props.entity.attendants));
            // @ts-ignore
            if (_.isEqual(new AttendantsList(Events.fetchUnfinished().attendants), props.entity.attendants) && sessionStorage.getItem('eventChanges') === null && typeof props.yesAction === 'function') {
                props.yesAction();
                return;
            } else {
                setAlertOpened(true);
                return;
            }
        }

        if (window.location.pathname.startsWith('/event/edit') && sessionStorage.getItem('eventChanges') === null && typeof props.yesAction === 'function') {
            props.yesAction();
            return;
        }

        setAlertOpened(true);
    }

    const update = (sf: IStateFragment) => {
        if(typeof sf.alertOpened === "boolean") {
            setAlertOpened(sf.alertOpened);
        }
    };

    const renderActionIcon = () => {
        let onClickFunc = (props.showDialog === false && typeof props.yesAction === 'function') ? props.yesAction : openAlertDialog;
        return <ArrowBackIcon fontSize={'large'} onClick={onClickFunc}/>;
    }

    const renderAlertDialog = () => {
        if (props.showDialog === false) {
            return;
        }
        if (typeof props.yesAction === 'function') {
            return (
                <AlertDialog
                    title={props.actionType === ActionType.BACK ? 'Neuložené změny' : 'Uložit změny'}
                    question={props.actionType === ActionType.BACK ? 'Zahodit neuložené změny?' : 'Uložit provedené změny?'}
                    open={alertOpened}
                    parentUpdate={update}
                    yesAction={props.yesAction}
                    noAction={props.noAction}
                />
            );
        }
    }

    return (
        <React.Fragment>
            <Box sx={{flexGrow: 1}}>
                <AppBar sx={{ position: "fixed"}}>
                    <Toolbar>
                        <Grid container justifyContent={"space-between"} alignItems={"center"}>
                            <Grid item>
                                <Button color="inherit" sx={{padding: 0, minWidth: "auto"}}>
                                    {renderActionIcon()}
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
            {renderAlertDialog()}
        </React.Fragment>
    );
};

export default withRouter(CommonHeader);