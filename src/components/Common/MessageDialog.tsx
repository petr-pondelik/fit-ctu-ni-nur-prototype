import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import {Button, DialogActions, DialogContent, DialogContentText} from "@mui/material";


export interface SimpleDialogProps {
	msg: string,
	open: boolean;
	onClose: () => void;
}


export default function MessageDialog(props: SimpleDialogProps) {

	const handleClose = () => {
		props.onClose();
	};

	return (
		<Dialog onClose={handleClose} open={props.open}>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{props.msg}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} autoFocus>
					Zavřít
				</Button>
			</DialogActions>
		</Dialog>
	);

}
