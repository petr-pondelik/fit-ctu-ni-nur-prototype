export interface UserInterface {
    id: number,
    username: string,
    email: string,
    givenName: string,
    familyName: string,
    password: string
}

class UsersModel {

    initData: Array<UserInterface> = [
        {
            id: 1,
            username: 'petrtest',
            email: 'test@email.com',
            givenName: 'Petr',
            familyName: 'Test',
            password: '12345678'
        }
    ];

    data: Array<UserInterface>;

    constructor() {
        /** Load users from sessionStorage */
        let usersStr: string = sessionStorage.getItem('users') as string;
        let sessionStorageUsers: Array<UserInterface> = JSON.parse(usersStr) as Array<UserInterface>;
        if (sessionStorageUsers === null) {
            sessionStorageUsers = [];
        }

        /** Find initial users */
        let initUser: UserInterface|undefined = sessionStorageUsers.find(item => item.id === 1);

        /** If the initial user doesn't exists, save him into storage. */
        if (initUser === undefined) {
            sessionStorageUsers.push(this.initData[0]);
            sessionStorage.setItem('users', JSON.stringify(sessionStorageUsers));
        }

        this.data = sessionStorageUsers;
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

    getLoggedUser (): UserInterface|undefined {
        let res = JSON.parse(sessionStorage.getItem('loggedUser') as string);
        console.log(res);
        if (res === null) {
            return undefined;
        }
        return res;
    }

    /**
     * @param user
     */
    setLoggedUser (user: UserInterface) {
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
    }
}

export default UsersModel;