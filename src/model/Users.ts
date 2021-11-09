import {EventInvitationStatus} from "./Events";
import Cookies from 'js-cookie';
import EInvitationSource from "../enums/EInvitationSource";


export const InvitationSource = {
    Organizer: 'Organizátor',
    MobileContacts: 'Mobilní kontakty',
    Messenger: 'Messenger',
    WhatsApp: 'WhatsApp'
}

export interface IUserInvitation {
    id: string,
    status: EventInvitationStatus,
    source?: EInvitationSource
}

export interface IUserContacts {
    mobileContacts: Array<string>,
    messenger: Array<string>,
    whatsApp: Array<string>
}

export interface IUserEventsList {
    [key: string]: IUserInvitation
}

export interface UserInterface {
    id: string,
    username: string,
    email: string,
    givenName: string,
    familyName: string,
    password: string,
    contacts: IUserContacts,
    events: IUserEventsList
}

export class User {

    id: string;
    username: string;
    email: string;
    givenName: string;
    familyName: string;
    password: string;
    contacts: IUserContacts;
    events: IUserEventsList;

    /**
     * @param data
     */
    constructor(data: UserInterface) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.givenName = data.givenName;
        this.familyName = data.familyName;
        this.password = data.password;
        this.contacts = data.contacts;
        this.events = data.events;
    }

    getFullName(): string {
        return `${this.givenName} ${this.familyName}`
    }

}

class UsersModel {

    dataDefinition: Array<UserInterface> = [
        {
            id: '1',
            username: 'petrtest',
            email: 'test@test.com',
            givenName: 'Petr',
            familyName: 'Test',
            password: '12345678',
            events: {
                2: {
                    id: '2',
                    status: EventInvitationStatus.Confirmed
                }
            },
            contacts: {
                mobileContacts: ['2', '11', '13'],
                messenger: ['3', '10'],
                whatsApp: ['9', '12']
            }
        },
        {
            id: '2',
            username: 'okurkajos',
            email: 'josefokurka@test.com',
            givenName: 'Josef',
            familyName: 'Okurka',
            password: '12345678',
            events: {
                1: {
                    id: '1',
                    status: EventInvitationStatus.Confirmed
                }
            },
            contacts: {
                mobileContacts: [],
                messenger: [],
                whatsApp: []
            }
        },
        {
            id: '3',
            username: 'bramborafra',
            email: 'frantisekbrambora@test.com',
            givenName: 'František',
            familyName: 'Brambora',
            password: '12345678',
            events: {
                1: {
                    id: '1',
                    status: EventInvitationStatus.Confirmed
                }
            },
            contacts: {
                mobileContacts: [],
                messenger: [],
                whatsApp: []
            }
        },
        {
            id: '4',
            username: 'vytizenater',
            email: 'terezavytizena@test.com',
            givenName: 'Tereza',
            familyName: 'Vytížená',
            password: '12345678',
            events: {
                1: {
                    id: '1',
                    status: EventInvitationStatus.Tentative
                }
            },
            contacts: {
                mobileContacts: [],
                messenger: [],
                whatsApp: []
            }
        },
        {
            id: '5',
            username: 'omackakar',
            email: 'karelomacka@test.com',
            givenName: 'Karel',
            familyName: 'Omáčka',
            password: '12345678',
            events: {
                1: {
                    id: '1',
                    status: EventInvitationStatus.Declined
                }
            },
            contacts: {
                mobileContacts: [],
                messenger: [],
                whatsApp: []
            }
        },
        {
            id: '6',
            username: 'osamelakat',
            email: 'katerinaosamela@test.com',
            givenName: 'Kateřina',
            familyName: 'Osamělá',
            password: '12345678',
            events: {
                1: {
                    id: '1',
                    status: EventInvitationStatus.Confirmed
                }
            },
            contacts: {
                mobileContacts: [],
                messenger: [],
                whatsApp: []
            }
        },
        {
            id: '7',
            username: 'jablickovaade',
            email: 'adelajablickova@test.com',
            givenName: 'Adéla',
            familyName: 'Jablíčková',
            password: '12345678',
            events: {
                1: {
                    id: '1',
                    status: EventInvitationStatus.Tentative
                }
            },
            contacts: {
                mobileContacts: [],
                messenger: [],
                whatsApp: []
            }
        },
        {
            id: '8',
            username: 'hruskalad',
            email: 'ladahruska@test.com',
            givenName: 'Láďa',
            familyName: 'Hruška',
            password: '12345678',
            events: {
                1: {
                    id: '1',
                    status: EventInvitationStatus.Pending
                }
            },
            contacts: {
                mobileContacts: [],
                messenger: [],
                whatsApp: []
            }
        },
        {
            id: '9',
            username: 'kavickovaevz',
            email: 'evzeniekavickova@test.com',
            givenName: 'Evženie',
            familyName: 'Kávičková',
            password: '12345678',
            events: {
                2: {
                    id: '2',
                    status: EventInvitationStatus.Confirmed
                }
            },
            contacts: {
                mobileContacts: [],
                messenger: [],
                whatsApp: []
            }
        },
        {
            id: '10',
            username: 'mrkvickajar',
            email: 'jaroslavmrkvicka@test.com',
            givenName: 'Jaroslav',
            familyName: 'Mrkvička',
            password: '12345678',
            events: {},
            contacts: {
                mobileContacts: [],
                messenger: [],
                whatsApp: []
            }
        },
        {
            id: '11',
            username: 'omackarad',
            email: 'redovanomacka@test.com',
            givenName: 'Radovan',
            familyName: 'Omáčka',
            password: '12345678',
            events: {},
            contacts: {
                mobileContacts: [],
                messenger: [],
                whatsApp: []
            }
        },
        {
            id: '12',
            username: 'salamevz',
            email: 'evzensalam@test.com',
            givenName: 'Evžen',
            familyName: 'Salám',
            password: '12345678',
            events: {},
            contacts: {
                mobileContacts: [],
                messenger: [],
                whatsApp: []
            }
        },
        {
            id: '13',
            username: 'lakotaant',
            email: 'antoninlakota@test.com',
            givenName: 'Antonín',
            familyName: 'Lakota',
            password: '12345678',
            events: {},
            contacts: {
                mobileContacts: [],
                messenger: [],
                whatsApp: []
            }
        }
    ];

    data: Array<User>;

    constructor() {
        let users: Array<User> = [];

        /** Synchronize cookies with defined users */
        for (const u of this.dataDefinition) {
            users.push(new User(u));
        }

        this.data = users;
        sessionStorage.setItem('users', JSON.stringify(this.data));
    }

    /**
     * @param id
     */
    findById(id: string): User | undefined {
        let res: User | undefined ;
        res = this.data.find((e) => e.id === id as string);
        return res;
    }

    /**
     * @param username
     * @param password
     */
    findByCredentials = (username: string|null, password: string|null): UserInterface|undefined => {
        return this.data.find(item => item.username === username && item.password === password);
    };

    getLoggedUser (): User|undefined {
        let str: string|undefined = Cookies.get('loggedUser');
        if (str === undefined) {
            return undefined;
        }
        let res = JSON.parse(str);
        if (res === null) {
            return undefined;
        }
        return new User(res);
    }

    /**
     * @param user
     */
    setLoggedUser (user: UserInterface) {
        Cookies.set('loggedUser', JSON.stringify(user));
    }

}

export default new UsersModel();