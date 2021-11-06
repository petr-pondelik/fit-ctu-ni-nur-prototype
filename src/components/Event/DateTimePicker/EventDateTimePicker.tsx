import React from "react";
import {Grid} from "@mui/material";
import AppDateTimePicker from "../../Common/AppDateTimePicker";
import moment, {Moment} from "moment";
import ActionButton from "../../Common/ActionButton";


export interface IEventDateTimePickerProps {
    name: string,
    value: {
        start: Date|null,
        end: Date|null
    },
    updateParent(stateFragment: any): void
}

type EventDateTimeType = 'start' | 'startEnd';

/**
 * @param props
 * @constructor
 */
const EventDateTimePicker: React.FC<IEventDateTimePickerProps> = (props: IEventDateTimePickerProps) => {

    function getEventDateTimeType(): EventDateTimeType {
        return props.value.end === null ? 'start' : 'startEnd';
    }

    const [type, setType] = React.useState<EventDateTimeType>(getEventDateTimeType());

    /**
     * @param stateFragment
     */
    function update(stateFragment: any) {
        console.log('UPDATE EventDateTimePicker');
        let sf: any = {data: {eventTime: {}}};
        console.log(stateFragment);
        if (stateFragment.data.start !== undefined) {
            console.log(new Date(stateFragment.data.start));
            sf.data.eventTime.start = new Date(stateFragment.data.start);
        } else {
            sf.data.eventTime.end = new Date(stateFragment.data.end);
        }
        console.log(sf);
        props.updateParent(sf);
    }

    function addEnd() {
        setType('startEnd');
    }

    function removeEnd() {
        setType('start');
        let sf: any = {data: {eventTime: {}}};
        sf.data.eventTime.start = props.value?.start;
        sf.data.eventTime.end = null;
        props.updateParent(sf);
    }

    function renderStart() {
        return <Grid item sx={{textAlign: "center"}}>
            <AppDateTimePicker
                name={"start"}
                value={props.value.start !== null ? props.value.start : moment(new Date()).add(5, 'minute').toDate()}
                toolbarTitle={"Zvolte datum a čas začátku"}
                textHelper={"Datum a čas začátku"}
                label={"Začátek"}
                updateParent={update}
            />
        </Grid>
    }

    function renderEnd() {
        if (type !== 'startEnd') {
            return '';
        }
        return <Grid item>
            <AppDateTimePicker
                name={"end"}
                value={(props.value.end !== null) ? props.value.end : moment(new Date()).add(5, 'minute').toDate()}
                toolbarTitle={"Zvolte datum a čas konce"}
                textHelper={"Datum a čas konce"}
                label={"Konec"}
                updateParent={update}
            />
        </Grid>
    }

    function renderAddEndBtn() {
        if (type === 'start') {
            return <Grid item>
                <ActionButton variant={"contained"} clickHandler={addEnd}>
                    Přidat čas konce
                </ActionButton>
            </Grid>
        }
        return '';
    }

    function renderRemoveEndBtn() {
        if (type === 'startEnd') {
            return <Grid item>
                <ActionButton variant={"contained"} clickHandler={removeEnd}>
                    Odebrat čas konce
                </ActionButton>
            </Grid>
        }
        return '';
    }

    return (
        <React.Fragment>
            {renderStart()}
            {renderEnd()}
            <Grid container item direction={"column"} mt={"0.25rem"}>
                {renderAddEndBtn()}
                {renderRemoveEndBtn()}
            </Grid>
        </React.Fragment>
    );

}

export default EventDateTimePicker;