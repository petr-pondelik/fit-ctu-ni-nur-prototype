import React from "react";
import EventsModel, {AttendantsList, IAttendantsOrganized} from "../../../model/Events";
import {Grid, List, ListItem, Typography} from "@mui/material";
import AttendantAvatar from "./AttendantAvatar";
import UsersModel, {User} from "./../../../model/Users";


export interface IEventAttendantsListProps {
    attendants: AttendantsList
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
                    <ListItem selected={true} sx={{ paddingY: "1.25rem", marginBottom: "0.5rem" }}>
                        Zúčastní se
                    </ListItem>
                    {confirmedAttendants}
                    <ListItem selected={true} sx={{ paddingY: "1.25rem", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
                        Váhají
                    </ListItem>
                    {tentativeAttendants}
                    <ListItem selected={true} sx={{ paddingY: "1.25rem", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
                        Nezúčastí se
                    </ListItem>
                    {declinedAttendants}
                    <ListItem selected={true} sx={{ paddingY: "1.25rem", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
                        Neodpověděli
                    </ListItem>
                    {pendingAttendants}
                </List>
            </Grid>
        </Grid>
    );

}

export default EventAttendantsList;