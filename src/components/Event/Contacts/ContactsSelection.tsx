import React from "react";
import {TransitionProps} from "@mui/material/transitions";
import {
    AppBar,
    Button,
    Dialog,
    IconButton,
    Slide, Toolbar,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ContactsSelectionList from "./ContactsSelectionList";
import {IEventContactState} from "../../../model/Events";


export interface IContactsSelectionProps {
    title: string,
    contacts: IEventContactState[],
    open: boolean,
    updateParent: (open: boolean) => any,
    updateParentContactsState: (state: IEventContactState[]) => any
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


/**
 * @param props
 * @constructor
 */
const ContactsSelection: React.FC<IContactsSelectionProps> = (props: IContactsSelectionProps) => {

    const handleClose = () => {
        props.updateParent(false);
    };

    const handleConfirm = () => {
        console.log('ContactsSelection CONFIRM');
        console.log(props);
        props.updateParent(false);
        props.updateParentContactsState(props.contacts);
    };

    console.log('render ContactsSelection');

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {props.title}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleConfirm}>
                        Potvrdit
                    </Button>
                </Toolbar>
            </AppBar>
            <ContactsSelectionList
                contacts={props.contacts}
                // updateParent={updateSelection}
            />
        </Dialog>
    );

}

export default ContactsSelection;