import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface IStateFragment {
    alertOpen: boolean
}

export interface IAlertDialogProps {
    open: boolean,
    parentUpdate: (sf: IStateFragment) => any,
    parentDeleteEvent: () => any
}


const AlertDialog: React.FC<IAlertDialogProps> = (props: IAlertDialogProps) => {

    const handleClose = () => {
        props.parentUpdate({
            alertOpen: false
        });
    };

    const handleSubmit = () => {
        props.parentDeleteEvent();
    };

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Odstranit událost?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Skutečně si přejete odstranit událost?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} autoFocus>Ano</Button>
                    <Button onClick={handleClose}>
                        Ne
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default AlertDialog;