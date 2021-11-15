import React from 'react';
import {Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from 'history';

import UsersModel, {User} from "./model/Users";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";

import './App.css';
import './styles/global.css';
import Registration from "./pages/Registration/Registration";
import EventView from "./pages/Event/EventView";
import EventEdit from "./pages/Event/EventEdit";
import EventCreate from "./pages/Event/EventCreate";
import Invitations from "./pages/Event/Invitations";


export interface AppState {
    user?: User
}


const history = createBrowserHistory();


export default class App extends React.Component<any, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: UsersModel.getLoggedUser()
        };
    }

    updateState = (key: keyof AppState, data: any) => {
        if (this.state[key] !== data) {
            let newStateFragment: AppState = this.state;
            newStateFragment[key] = data;
            this.setState(newStateFragment);
        }
    }

    render() {
        return (
            <Router history={history}>
                <Switch>

                    <Route exact path={"/"}>
                        {
                            this.state.user === undefined ?
                                <Login propagateState={this.updateState}/> :
                                <Homepage
                                    user={this.state.user}
                                    updateParent={this.updateState}
                                />
                        }
                    </Route>

                    <Route exact path="/registration">
                        {
                            this.state.user === undefined ?
                                <Registration/> :
                                <Homepage
                                    user={this.state.user}
                                    updateParent={this.updateState}
                                />
                        }
                    </Route>

                    <Route path="/event/view/:id"
                           render={(props) =>
                               this.state.user !== undefined ?
                                   <EventView user={this.state.user}/> : undefined
                           }/>

                    <Route exact path="/event/create"
                           render={(props) =>
                               this.state.user !== undefined ?
                                   <EventCreate user={this.state.user} {...props}/> : undefined
                           }/>

                    <Route exact path="/event/create/attendants"
                           render={(props) =>
                               this.state.user !== undefined ?
                                   <Invitations user={this.state.user} {...props}/> : undefined
                           }/>


                    <Route exact path="/event/edit/:id"
                           render={(props) =>
                               this.state.user !== undefined ?
                                   <EventEdit user={this.state.user} {...props}/> : undefined
                           }/>

                    <Route exact path="/event/edit/:id/attendants"
                           render={(props) =>
                               this.state.user !== undefined ?
                                   <Invitations user={this.state.user} {...props}/> : undefined
                           }/>

                </Switch>
            </Router>
        )
    }
}
