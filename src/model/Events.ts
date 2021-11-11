import {IUserInvitation, User} from "./Users";
import EInvitationSource from "../enums/EInvitationSource";
import _ from "lodash";


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

export interface IEventContactState {
	userId: string,
	invited: boolean
}

export interface IUserContactsStates {
	mobileContacts: Array<IEventContactState>,
	messenger: Array<IEventContactState>,
	whatsApp: Array<IEventContactState>
}

export interface ILocation {
	name: string,
	address: string,
	lat: number,
	long: number,
}

export interface IEventTime {
	start: string;
	end: string | null;
}

export interface IEventData {
	title: string | null,
	imgPath: string | null,
	location: ILocation | null,
	eventTime: {
		start: Date | null,
		end: Date | null
	},
	description: string | null,
	organizer: string,
	attendants: IAttendantsList | null
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
	MobileContacts: Array<IUserInvitation>
	Messenger: Array<IUserInvitation>,
	WhatsApp: Array<IUserInvitation>
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
	end: Date | null;

	/**
	 * @param data
	 */
	constructor(data: IEventTime) {
		this.start = new Date(data.start);
		data.end === null ? this.end = null : this.end = new Date(data.end);
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
	getUsersStatusCZ(user: User): string | undefined {
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

	lastId: number = 2;

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
					id: '1',
					status: EventInvitationStatus.Pending,
					source: EInvitationSource.MobileContacts
				},
				2: {
					id: '2',
					status: EventInvitationStatus.Confirmed,
					source: EInvitationSource.MobileContacts
				},
				3: {
					id: '3',
					status: EventInvitationStatus.Confirmed,
					source: EInvitationSource.Messenger
				},
				4: {
					id: '4',
					status: EventInvitationStatus.Tentative,
					source: EInvitationSource.Messenger
				},
				5: {
					id: '5',
					status: EventInvitationStatus.Declined,
					source: EInvitationSource.MobileContacts
				},
				6: {
					id: '6',
					status: EventInvitationStatus.Confirmed,
					source: EInvitationSource.Messenger
				},
				7: {
					id: '7',
					status: EventInvitationStatus.Tentative,
					source: EInvitationSource.Messenger
				},
				8: {
					id: '8',
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
				end: null,
			},
			description: 'Nedělní kávové odpoledne s Evženií.',
			organizer: '1',
			attendants: {
				1: {
					id: '1',
					status: EventInvitationStatus.Confirmed,
					source: EInvitationSource.Organizer
				},
				9: {
					id: '9',
					status: EventInvitationStatus.Confirmed,
					source: EInvitationSource.WhatsApp
				}
			}
		},
		{
			id: '3',
			title: 'After COVID Party',
			imgPath: '/static/images/events/3/cover.jpg',
			location: {
				name: 'Karlův Most',
				address: 'Karlův most, 110 00 Praha 1',
				lat: 50.0864771,
				long: 14.4092479,
			},
			eventTime: {
				start: '2022-04-15T14:00:00',
				end: null,
			},
			description: 'Oslava dalšího konce pandemie bude znovu na Karlově mostě.',
			organizer: '1',
			attendants: {
				1: {
					id: '1',
					status: EventInvitationStatus.Confirmed,
					source: EInvitationSource.Organizer
				},
				2: {
					id: '2',
					status: EventInvitationStatus.Pending,
					source: EInvitationSource.MobileContacts
				},
				3: {
					id: '3',
					status: EventInvitationStatus.Pending,
					source: EInvitationSource.Messenger
				},
				9: {
					id: '9',
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
		let sessionEvents: string | null = sessionStorage.getItem('events');
		sessionEvents !== null ? this.constructFromSession(sessionEvents) : this.constructFromDataDefinition();
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
		sessionStorage.setItem('events', JSON.stringify(this.data));
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
		res.sort((a, b) => a.eventTime.start.getTime() - b.eventTime.start.getTime());
		return res;
	}

	/**
	 * @param data
	 */
	insert = (data: IEventData) => {
		let att: IAttendantsList = data.attendants ?? [];
		att[parseInt(data.organizer)] = {
			id: data.organizer,
			status: EventInvitationStatus.Confirmed,
			source: EInvitationSource.Organizer
		}
		let dataProcessed: IEvent = {
			id: String(this.data.length + 1),
			title: data.title ?? '',
			imgPath: data.imgPath ?? '/static/images/default/empty.jpg',
			eventTime: {
				start: data.eventTime.start ? data.eventTime.start.toString() : '',
				end: data.eventTime.end ? data.eventTime.end.toString() : null
			},
			location: {
				name: data.location ? data.location.name : '',
				address: data.location ? data.location.address : '',
				lat: data.location ? data.location.lat : 0,
				long: data.location ? data.location.long : 0
			},
			organizer: data.organizer,
			description: data.description ?? '',
			attendants: att
		};
		this.data.push(new Event(dataProcessed));
		sessionStorage.setItem('events', JSON.stringify(this.data));
	}

	/**
	 * @param event
	 */
	delete = (event: Event) => {
		let newData: Array<Event> = this.data.filter((e: Event) => e.id !== event.id);
		this.data = newData;
		sessionStorage.setItem('events', JSON.stringify(this.data));
	}

	/**
	 * @param event
	 * @param data
	 */
	update = (event: Event, data: IEventData) => {
		let oldData = JSON.parse(JSON.stringify(event));
		oldData.attendants = {};
		let newData = _.merge(oldData, data);
		let newEvent: Event = new Event(newData);
		let inx = this.data.findIndex((e: Event) => e.id === newEvent.id);
		this.data[inx] = newEvent;
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
					res.MobileContacts.push(a);
					break;
				case EInvitationSource.Messenger:
					res.Messenger.push(a);
					break;
				case EInvitationSource.WhatsApp:
					res.WhatsApp.push(a);
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
		sessionStorage.setItem('events', JSON.stringify(this.data));
	}

	/**
	 * @param data
	 */
	storeUnfinished(data: IEventData) {
		this.unfinished = data;
		sessionStorage.setItem('unfinished', JSON.stringify(data));
	}

	fetchUnfinished(): IEventData | undefined {
		let str = sessionStorage.getItem('unfinished');
		return str ? JSON.parse(str) : undefined;
	}

	clearUnfinished() {
		sessionStorage.removeItem('unfinished');
	}

	/**
	 * @param user
	 */
	getUnfinishedEventContactsState(user: User): IUserContactsStates {
		let unfinished: IEventData = JSON.parse(sessionStorage.getItem('unfinished') ?? '{}');
		let invited: Array<string> = [];
		if (unfinished.attendants !== null) {
			for (const inv of Object.values(unfinished.attendants)) {
				invited.push(inv.id);
			}
		}
		let res: IUserContactsStates = {
			mobileContacts: [],
			messenger: [],
			whatsApp: []
		};
		for (const [source, contacts] of Object.entries(user.contacts)) {
			for (const c of contacts) {
				res[source as keyof IUserContactsStates].push({
					userId: c,
					invited: invited.includes(c)
				});
			}
		}
		return res;
	}

}


export default new EventsModel();