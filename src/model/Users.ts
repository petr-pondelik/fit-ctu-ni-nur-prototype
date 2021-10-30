import {EventInvitationStatus} from "./Events";

export interface IUserInvitation {
    status: EventInvitationStatus
}

export interface IUserEventsList {
    [key: number]: IUserInvitation
}

export interface UserInterface {
    id: string,
    username: string,
    email: string,
    givenName: string,
    familyName: string,
    password: string,
    events: IUserEventsList
}

export class User {

    id: string;
    username: string;
    email: string;
    givenName: string;
    familyName: string;
    password: string;
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
        this.events = data.events;
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
            events: []
        },
        {
            id: '2',
            username: 'okurkajos',
            email: 'josefokurka@test.com',
            givenName: 'Josef',
            familyName: 'Okurka',
            password: '12345678',
            events: {
                1: { status: EventInvitationStatus.Confirmed }
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
                1: { status: EventInvitationStatus.Confirmed }
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
                1: { status: EventInvitationStatus.Tentative }
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
                1: { status: EventInvitationStatus.Declined }
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
                1: { status: EventInvitationStatus.Confirmed }
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
                1: { status: EventInvitationStatus.Tentative }
            }
        },
        {
            id: '8',
            username: 'vytizenater',
            email: 'terezavytizena@test.com',
            givenName: 'Tereza',
            familyName: 'Vytížená',
            password: '12345678',
            events: {
                1: { status: EventInvitationStatus.Tentative }
            }
        },
        {
            id: '9',
            username: 'hruskalad',
            email: 'ladahruska@test.com',
            givenName: 'Láďa',
            familyName: 'Hruška',
            password: '12345678',
            events: {
                1: { status: EventInvitationStatus.Pending }
            }
        },
        {
            id: '10',
            username: 'kavickovaevz',
            email: 'evzeniekavickova@test.com',
            givenName: 'Evženie',
            familyName: 'Kávičková',
            password: '12345678',
            events: {
                2: { status: EventInvitationStatus.Confirmed }
            }
        },
    ];

    data: Array<UserInterface>;

    constructor() {
        let users: Array<User> = [];

        /** Synchronize session storage with defined users */
        for (const u of this.dataDefinition) {
            users.push(new User(u));
        }

        this.data = users;
        sessionStorage.setItem('users', JSON.stringify(this.data));
        console.log(this.data);
    }

    /**
     *
     * @param username
     * @param password
     */
    findByCredentials = (username: string|undefined, password: string|undefined): UserInterface|undefined => {
        return this.data.find(item => item.username === username && item.password === password);
    };

    getLoggedUser (): User|undefined {
        let res = JSON.parse(sessionStorage.getItem('loggedUser') as string);
        console.log(res);
        if (res === null) {
            return undefined;
        }
        return new User(res);
    }

    /**
     * @param user
     */
    setLoggedUser (user: UserInterface) {
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
    }
}

export default UsersModel;