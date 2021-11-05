import React from "react";
import {TransitionProps} from "@mui/material/transitions";
import {
    AppBar,
    Button,
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Slide, Toolbar,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ContactsSelectionList from "./ContactsSelectionList";


export interface IContactsSelectionProps {
    title: string,
    contacts: Array<string>,
    open: boolean,
    updateParent: (open: boolean) => any
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
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {props.title}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        Potvrdit
                    </Button>
                </Toolbar>
            </AppBar>
            <ContactsSelectionList contacts={props.contacts}/>
        </Dialog>
    );

}

export default ContactsSelection;