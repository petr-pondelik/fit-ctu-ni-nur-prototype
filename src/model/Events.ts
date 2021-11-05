import {IUserInvitation, User} from "./Users";
import Cookies from 'js-cookie';
import {Moment} from "moment";
import EInvitationSource from "../enums/EInvitationSource";

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
    address: string,
    lat: number,
    long: number,
}

export interface IEventTime {
    start: string;
    end?: string;
}

export interface IEventData {
    title?: string,
    imgPath?: string,
    location?: ILocation,
    eventTime: {
        start?: Moment,
        end?: Moment
    },
    description?: string,
    organizer: string,
    attendants?: IAttendantsList
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

export interface IAttendantsOrganized {
    Confirmed: Array<string>,
    Tentative: Array<string>,
    Declined: Array<string>,
    Pending: Array<string>
}

export interface IInvitationsOrganized {
    MobileContacts: Array<string>
    Messenger: Array<string>,
    WhatsApp: Array<string>
}

export class AttendantsList {

    [key: number]: IUserInvitation

    /**
     * @param data
     */
    constructor(data: IAttendantsList) {
        for (const [inx, p] of Object.entries(data)) {
            this[inx as unknown as number] = p;
        }
    }

    /**
     * @param user
     */
    getUsersPartStatus(user: User): EventInvitationStatus | undefined {
        for (const [id, p] of Object.entries(this)) {
            if (id === user.id) {
                return p.status;
            }
        }
        return undefined;
    }

}

export class EventTime {

    start: Date;
    end?: Date;

    /**
     * @param data
     */
    constructor(data: IEventTime) {
        this.start = new Date(data.start);
        data.end === undefined ? this.end = undefined : this.end = new Date(data.end);
    }

}

export class Event {

    id: string;
    title: string;
    imgPath: string;
    location: ILocation;
    eventTime: EventTime;
    description: string;
    organizer: string;
    attendants: AttendantsList;

    /**
     * @param data
     */
    constructor(data: IEvent) {
        this.id = data.id;
        this.title = data.title;
        this.imgPath = data.imgPath;
        this.location = data.location;
        this.eventTime = new EventTime(data.eventTime);
        this.organizer = data.organizer;
        this.description = data.description;
        this.attendants = new AttendantsList(data.attendants);
    }

    /**
     * @param user
     */
    isOrganisedBy(user: User): boolean {
        return this.organizer === user.id;
    }

    /**
     * @param user
     */
    getUsersStatusCZ(user: User): string|undefined {
        if (this.organizer === user.id) {
            return EventInvitationStatusCZ[0];
        }
        for (const [id, invitation] of Object.entries(this.attendants)) {
            if (id === user.id) {
                return EventInvitationStatusCZ[invitation.status]
            }
        }
        return undefined;
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
                address: 'Štěpánská 61, 116 02 Nové Město',
                lat: 50.0814607,
                long: 14.4230261,
            },
            eventTime: {
                start: '2021-12-18T18:00:00',
                end: '2021-12-18T23:30:00',
            },
            description: 'Letošní třídní sraz bude v Lucerně.',
            organizer: '2',
            attendants: {
                1: {
                    status: EventInvitationStatus.Pending,
                    source: EInvitationSource.MobileContacts
                },
                2: {
                    status: EventInvitationStatus.Confirmed,
                    source: EInvitationSource.MobileContacts
                },
                3: {
                    status: EventInvitationStatus.Confirmed,
                    source: EInvitationSource.Messenger
                },
                4: {
                    status: EventInvitationStatus.Tentative,
                    source: EInvitationSource.Messenger
                },
                5: {
                    status: EventInvitationStatus.Declined,
                    source: EInvitationSource.MobileContacts
                },
                6: {
                    status: EventInvitationStatus.Confirmed,
                    source: EInvitationSource.Messenger
                },
                7: {
                    status: EventInvitationStatus.Tentative,
                    source: EInvitationSource.Messenger
                },
                8: {
                    status: EventInvitationStatus.Tentative,
                    source: EInvitationSource.MobileContacts
                }
            }
        },
        {
            id: '2',
            title: 'Káva a Evženií',
            imgPath: '/static/images/events/2/cover.jpg',
            location: {
                name: 'Kavárna Kabinet',
                address: 'Terronská 619, 160 00 Praha 6-Bubeneč',
                lat: 50.102453,
                long: 14.3929309,
            },
            eventTime: {
                start: '2021-12-19T15:00:00',
                end: undefined,
            },
            description: 'Nedělní kávové odpoledne s Evženií.',
            organizer: '1',
            attendants: {
                1: {
                    status: EventInvitationStatus.Confirmed,
                    source: EInvitationSource.Organizer
                },
                9: {
                    status: EventInvitationStatus.Confirmed,
                    source: EInvitationSource.WhatsApp
                }
            }
        }
    ];

    data: Array<Event> = [];
    unfinished?: IEventData;

    constructor() {
        this.data = [];
        let sessionEvents: string | undefined = Cookies.get('events');
        sessionEvents !== undefined ? this.constructFromSession(sessionEvents) : this.constructFromDataDefinition();
    }

    constructFromDataDefinition() {
        let events: Array<Event> = [];

        /** Synchronize session storage with defined events */
        for (const e of this.dataDefinition) {
            events.push(new Event(e));
        }

        events.sort((a, b) => {
            return a.eventTime.start.getTime() - b.eventTime.start.getTime();
        });

        this.data = events;
        Cookies.set('events', JSON.stringify(this.data));
    }

    /**
     * @param sessionEvents
     */
    constructFromSession(sessionEvents: string) {
        let events: Array<IEvent> = JSON.parse(sessionEvents);

        /** Construct events from session */
        for (const e of events) {
            this.data.push(new Event(e));
        }

        this.data.sort((a, b) => {
            return a.eventTime.start.getTime() - b.eventTime.start.getTime();
        });
    }

    /**
     * @param id
     */
    findById(id: string): Event | undefined {
        let res: Event | undefined;
        res = this.data.find((e) => e.id === id);
        return res;
    }

    /**
     * @param user
     */
    findByUser(user: User): Array<Event> {
        let res: Array<Event> = [];
        for (const e of this.data) {
            if (Object.keys(e.attendants).includes(user.id)) {
                res.push(e);
            }
        }
        return res;
    }

    /**
     * @param attendants
     */
    getAttendantsOrganized(attendants: AttendantsList): IAttendantsOrganized {
        let res: IAttendantsOrganized = {
            Confirmed: [],
            Tentative: [],
            Declined: [],
            Pending: []
        }

        for (const [id, a] of Object.entries(attendants)) {
            switch (a.status) {
                case EventInvitationStatus.Confirmed:
                    res.Confirmed.push(id);
                    break;
                case EventInvitationStatus.Tentative:
                    res.Tentative.push(id);
                    break;
                case EventInvitationStatus.Declined:
                    res.Declined.push(id);
                    break;
                case EventInvitationStatus.Pending:
                    res.Pending.push(id);
                    break;
            }
        }

        return res;
    }

    /**
     * @param attendants
     */
    getInvitationsOrganized(attendants: AttendantsList): IInvitationsOrganized {
        let res: IInvitationsOrganized = {
            MobileContacts: [],
            Messenger: [],
            WhatsApp: [],
        }

        for (const [id, a] of Object.entries(attendants)) {
            switch (a.source) {
                case EInvitationSource.MobileContacts:
                    res.MobileContacts.push(id);
                    break;
                case EInvitationSource.Messenger:
                    res.Messenger.push(id);
                    break;
                case EInvitationSource.WhatsApp:
                    res.WhatsApp.push(id);
                    break;
            }
        }

        return res;
    }

    /**
     * @param user
     * @param event
     * @param newStatus
     */
    updateEventAttendance(user: User, event: Event, newStatus: EventInvitationStatus) {
        for (const [inx, e] of Object.entries(this.data)) {
            if (e.id === event.id) {
                for (const id of Object.keys(e.attendants)) {
                    if (user.id === id) {
                        this.data[inx as unknown as number].attendants[id as unknown as number].status = newStatus;
                    }
                }
            }
        }
        Cookies.set('events', JSON.stringify(this.data));
    }

    /**
     * @param data
     */
    storeUnfinished(data: IEventData) {
        console.log('storeUnfinished');
        console.log(data);
        this.unfinished = data;
        sessionStorage.setItem('unfinished', JSON.stringify(this.unfinished));
    }

    fetchUnfinished(): IEventData|undefined {
        return JSON.parse(sessionStorage.getItem('unfinished') ?? '');
    }

}


export default new EventsModel();