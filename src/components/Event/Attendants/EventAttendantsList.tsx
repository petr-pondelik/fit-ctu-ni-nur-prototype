import React from "react";
import EventsModel, {AttendantsList, IAttendantsOrganized} from "../../../model/Events";
import {Grid, List, ListItem, Typography} from "@mui/material";
import AttendantAvatar from "./AttendantAvatar";
import UsersModel, {User} from "./../../../model/Users";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {SxProps} from "@mui/system";


export interface IEventAttendantsListProps {
    attendants: AttendantsList
}

const OutlinedIconStyle: SxProps = {
    fontSize: "1.3rem",
    border: "3px solid",
    borderRadius: "6px",
    borderColor: "black",
    marginX: "4px"
}

/**
 * @param props
 * @constructor
 */
const EventAttendantsList: React.FC<IEventAttendantsListProps> = (props: IEventAttendantsListProps) => {

    let attendantsOrganized: IAttendantsOrganized = EventsModel.getAttendantsOrganized(props.attendants);

    let confirmedAttendants = Object.values(attendantsOrganized.Confirmed).map((id, inx) => {
        let u: User|undefined = UsersModel.findById(id);
        return u !== undefined ?
            <ListItem key={inx}>
                <AttendantAvatar attendant={u}/>
            </ListItem>
            : '';
    });

    let tentativeAttendants = Object.values(attendantsOrganized.Tentative).map((id, inx) => {
        let u: User|undefined = UsersModel.findById(id);
        return u !== undefined ?
            <ListItem key={inx}>
                <AttendantAvatar attendant={u}/>
            </ListItem>
            : '';
    });

    let declinedAttendants = Object.values(attendantsOrganized.Declined).map((id, inx) => {
        let u: User|undefined = UsersModel.findById(id);
        return u !== undefined ?
            <ListItem key={inx}>
                <AttendantAvatar attendant={u}/>
            </ListItem>
            : '';
    });

    let pendingAttendants = Object.values(attendantsOrganized.Pending).map((id, inx) => {
        let u: User|undefined = UsersModel.findById(id);
        return u !== undefined ?
            <ListItem key={inx}>
                <AttendantAvatar attendant={u}/>
            </ListItem>
            : '';
    });

    return (
        <Grid container>
            <Grid item>
                <Typography variant={"h5"} component={"h2"}>
                    Pozvaní lidé
                </Typography>
            </Grid>
            <Grid container item direction={"column"} pt={"1rem"} px={"2.5%"}>
                <List>
                    <ListItem selected={true} sx={{ paddingY: "0.75rem",  marginTop: "1rem", marginBottom: "0.5rem" }}>
                        <CheckBoxOutlinedIcon fontSize={"large"}/>
                        <Typography variant={"h6"} component={"p"} sx={{pl: "0.75rem"}}>
                            Zúčastní se
                        </Typography>
                    </ListItem>
                    {confirmedAttendants}
                    <ListItem selected={true} sx={{ paddingY: "0.75rem", marginTop: "2rem", marginBottom: "0.5rem" }}>
                        <HelpCenterOutlinedIcon fontSize={"large"}/>
                        <Typography variant={"h6"} component={"p"} sx={{pl: "0.75rem"}}>
                            Váhají
                        </Typography>
                    </ListItem>
                    {tentativeAttendants}
                    <ListItem selected={true} sx={{ paddingY: "0.75rem", marginTop: "2rem", marginBottom: "0.5rem" }}>
                        <CloseIcon sx={ OutlinedIconStyle }/>
                        <Typography variant={"h6"} component={"p"} sx={{pl: "0.75rem"}}>
                            Nezúčastí se
                        </Typography>
                    </ListItem>
                    {declinedAttendants}
                    <ListItem selected={true} sx={{ paddingY: "0.75rem", marginTop: "2rem", marginBottom: "0.5rem" }}>
                        <MoreHorizOutlinedIcon sx={ OutlinedIconStyle }/>
                        <Typography variant={"h6"} component={"p"} sx={{pl: "0.75rem"}}>
                            Neodpověděli
                        </Typography>
                    </ListItem>
                    {pendingAttendants}
                </List>
            </Grid>
        </Grid>
    );

}

export default EventAttendantsList;