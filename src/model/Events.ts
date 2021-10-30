import {IUserEventsList, IUserInvitation, User} from "./Users";

export enum EventInvitationStatus {
    Confirmed = 1,
    Tentative,
    Declined,
    Pending
}

interface IPlace {
    name: string,
    lat: number,
    long: number,
}

interface IEventTime {
    start: Date;
    end?: Date;
}

export interface IEvent {
    id: number,
    title: string,
    imgPath: string,
    place: IPlace,
    eventTime: IEventTime,
    description: string,
    organizer: number,
    attendants: IAttendantsList
}

export interface IAttendantsList {
    [key: number]: IUserInvitation
}

export class Event {

    id: number;
    title: string;
    imgPath: string;
    place: IPlace;
    eventTime: IEventTime;
    description: string;
    organizer: number;
    attendants: IAttendantsList;

    /**
     * @param data
     */
    constructor(data: IEvent) {
        this.id = data.id;
        this.title = data.title;
        this.imgPath = data.imgPath;
        this.place = data.place;
        this.eventTime = data.eventTime;
        this.organizer = data.organizer;
        this.description = data.description;
        this.attendants = data.attendants;
    }

}

class EventsModel {

    dataDefinition: Array<IEvent> = [
        {
            id: 1,
            title: 'Třídní sraz',
            imgPath: '/static/images/events/1/cover.jpg',
            place: {
                name: 'Lucerna',
                lat: 50.0809028,
                long: 14.4242057,
            },
            eventTime: {
                start: new Date('2021-12-18T18:00:00'),
                end: new Date('1995-12-18T18:00:00'),
            },
            description: 'Letošní třídní sraz bude v Lucerně.',
            organizer: 1,
            attendants: {
                1: { status: EventInvitationStatus.Confirmed },
                2: { status: EventInvitationStatus.Confirmed },
                3: { status: EventInvitationStatus.Confirmed },
                4: { status: EventInvitationStatus.Tentative },
                5: { status: EventInvitationStatus.Declined },
                6: { status: EventInvitationStatus.Confirmed },
                7: { status: EventInvitationStatus.Tentative },
                8: { status: EventInvitationStatus.Tentative },
                9: { status: EventInvitationStatus.Pending }
            }
        },
        {
            id: 2,
            title: 'Káva a Evženií',
            imgPath: '/static/images/events/2/cover.jpg',
            place: {
                name: 'Kavárna Kabinet',
                lat: 50.102453,
                long: 14.3929309,
            },
            eventTime: {
                start: new Date('2021-12-19T15:00:00'),
                end: undefined,
            },
            description: 'Nedělní kávové odpoledne s Evženií.',
            organizer: 1,
            attendants: {
                1: { status: EventInvitationStatus.Confirmed },
                10: { status: EventInvitationStatus.Confirmed }
            }
        }
    ];

    data: Array<Event>;

    constructor() {
        let events: Array<Event> = [];

        /** Synchronize session storage with defined events */
        for (const e of this.dataDefinition) {
            events.push(new Event(e));
        }

        this.data = events;
        sessionStorage.setItem('events', JSON.stringify(this.data));
        console.log(this.data);
    }

    /**
     * @param user
     */
    findByUser(user: User): Array<Event> {
        let res: Array<Event> = [];
        this.data.find(
            (e) => {
                console.log(Object.keys(e.attendants));
                console.log(user.id);
                if (Object.keys(e.attendants).includes((user.id as unknown) as string)) {
                    console.log('MATCH');
                    res.push(e);
                }
            });
        console.log(res);
        return res;
    }

}

export default EventsModel;