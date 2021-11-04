import React from "react";
import {Grid} from "@mui/material";
import AppDateTimePicker from "../../Common/AppDateTimePicker";
import moment from "moment";
import ActionButton from "../../Common/ActionButton";


export interface IEventDateTimePickerProps {
    name: string,
    value: {
        start?: string,
        end?: string
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
        return props.value !== undefined && props.value.end !== undefined ? 'startEnd' : 'start';
    }

    const [type, setType] = React.useState<EventDateTimeType>(getEventDateTimeType())

    /**
     * @param stateFragment
     */
    function update(stateFragment: any) {
        let sf: any = {data: {eventTime: {}}};
        if (stateFragment.data.start !== undefined) {
            sf.data.eventTime.start = stateFragment.data.start;
        } else {
            sf.data.eventTime.end = stateFragment.data.end;
        }
        props.updateParent(sf);
    }

    function addEnd() {
        setType('startEnd');
    }

    function removeEnd() {
        setType('start');
        let sf: any = {data: {eventTime: {}}};
        sf.data.eventTime.start = props.value?.start;
        sf.data.eventTime.end = undefined;
        props.updateParent(sf);
    }

    function renderStart() {
        return <Grid item sx={{textAlign: "center"}}>
            <AppDateTimePicker
                name={"start"}
                value={props.value.start !== undefined ? moment(new Date(props.value.start)) : moment(new Date()).add(5, 'minute')}
                toolbarTitle={"Zvolte datum a čas začátku"}
                textHelper={"Datum a čas začátku"}
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
                value={
                    (props.value.end !== undefined) ?
                        moment(new Date(props.value.end)) : moment(new Date()).add(5, 'minute')
                }
                toolbarTitle={"Zvolte datum a čas konce"}
                textHelper={"Datum a čas konce"}
                updateParent={update}
            />
        </Grid>
    }

    function renderAddEndBtn() {
        if (type === 'start') {
            return <Grid item>
                <ActionButton
                    text={"Přidat čas konce"}
                    clickHandler={addEnd}
                />
            </Grid>
        }
        return '';
    }

    function renderRemoveEndBtn() {
        if (type === 'startEnd') {
            return <Grid item>
                <ActionButton
                    text={"Odebrat čas konce"}
                    clickHandler={removeEnd}
                />
            </Grid>
        }
        return '';
    }

    return (
        <Grid container item direction={"column"} mt={"2rem"}>
            {renderStart()}
            {renderEnd()}
            <Grid container item direction={"column"} mt={"1rem"}>
                {renderAddEndBtn()}
                {renderRemoveEndBtn()}
            </Grid>
        </Grid>
    );

}

export default EventDateTimePicker;