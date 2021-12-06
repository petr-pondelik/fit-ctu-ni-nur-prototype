import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export interface IAlertDialogProps {
    title: string,
    question: string,
    open: boolean,
    parentUpdate?: (sf?: any) => any,
    yesAction: (data?: any) => any,
    noAction?: (data?: any) => any
}


const AlertDialog: React.FC<IAlertDialogProps> = (props: IAlertDialogProps) => {

    const handleClose = () => {
        if (typeof props.parentUpdate === 'function') {
            props.parentUpdate({
                alertOpened: false
            });
        }
        if (typeof props.noAction === 'function') {
            props.noAction();
        }
    };

    const handleSubmit = () => {
        props.yesAction();
    };

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={() => {
                    if (typeof props.parentUpdate === 'function') {
                        props.parentUpdate({alertOpened: false});
                    }
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.question}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Ne
                    </Button>
                    <Button onClick={handleSubmit} autoFocus>Ano</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default AlertDialog;