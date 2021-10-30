import {IUserInvitation, User} from "./Users";

export enum EventInvitationStatus {
    Confirmed = 1,
    Tentative,
    Declined,
    Pending
}

export const EventInvitationStatusCZ: Array<string> = [
    'Organizátor',
    'Účastním se',
    'Váhám',
    'Odmítl jsem účast',
    'Nevyjádřil jsem se'
]

export interface ILocation {
    name: string,
    lat: number,
    long: number,
}

export interface IEventTime {
    start: Date;
    end?: Date;
}

export interface IEvent {
    id: string,
    title: string,
    imgPath: string,
    location: ILocation,
    eventTime: IEventTime,
    description: string,
    organizer: string,
    attendants: IAttendantsList
}

export interface IAttendantsList {
    [key: number]: IUserInvitation
}

export class Event {

    id: string;
    title: string;
    imgPath: string;
    location: ILocation;
    eventTime: IEventTime;
    description: string;
    organizer: string;
    attendants: IAttendantsList;

    /**
     * @param data
     */
    constructor(data: IEvent) {
        this.id = data.id;
        this.title = data.title;
        this.imgPath = data.imgPath;
        this.location = data.location;
        this.eventTime = data.eventTime;
        this.organizer = data.organizer;
        this.description = data.description;
        this.attendants = data.attendants;
    }

    /**
     * @param user
     */
    getUsersStatus(user: User) {
        if (this.organizer === user.id) {
            return EventInvitationStatusCZ[0];
        }
        for (const [id, invitation] of Object.entries(this.attendants)) {
            if (id === user.id) {
                console.log(invitation.status);
                console.log(EventInvitationStatusCZ[invitation.status]);
                return EventInvitationStatusCZ[invitation.status]
            }
        }
    }

}

class EventsModel {

    dataDefinition: Array<IEvent> = [
        {
            id: '1',
            title: 'Třídní sraz',
            imgPath: '/static/images/events/1/cover.jpg',
            location: {
                name: 'Lucerna',
                lat: 50.0814607,
                long: 14.4230261,
            },
            eventTime: {
                start: new Date('2021-12-18T18:00:00'),
                end: new Date('2021-12-18T23:30:00'),
            },
            description: 'Letošní třídní sraz bude v Lucerně.',
            organizer: '2',
            attendants: {
                1: { status: EventInvitationStatus.Pending },
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
            id: '2',
            title: 'Káva a Evženií',
            imgPath: '/static/images/events/2/cover.jpg',
            location: {
                name: 'Kavárna Kabinet',
                lat: 50.102453,
                long: 14.3929309,
            },
            eventTime: {
                start: new Date('2021-12-19T15:00:00'),
                end: undefined,
            },
            description: 'Nedělní kávové odpoledne s Evženií.',
            organizer: '1',
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

        events.sort((a, b) => {
            return a.eventTime.start.getTime() - b.eventTime.start.getTime();
        });

        this.data = events;
        sessionStorage.setItem('events', JSON.stringify(this.data));
    }

    /**
     * @param id
     */
    findById(id: string): Event|undefined {
        let res: Event|undefined = undefined;
        this.data.find((e) => {
            if (e.id === id) {
                res = e;
            }
        });
        return res;
    }

    /**
     * @param user
     */
    findByUser(user: User): Array<Event> {
        let res: Array<Event> = [];
        this.data.find(
            (e) => {
                if (Object.keys(e.attendants).includes((user.id as unknown) as string)) {
                    res.push(e);
                }
            });
        return res;
    }

}

export default new EventsModel();