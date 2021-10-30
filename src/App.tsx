import React from 'react';
import {Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from 'history';

import UsersModel, {User} from "./model/Users";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";

import './App.css';
import './styles/global.css';
import Registration from "./pages/Registration/Registration";
import EventsModel from "./model/Events";
import EventView from "./pages/Event/EventView";

interface AppState {
    loggedUser?: User
}

const history = createBrowserHistory();

class App extends React.Component<any, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            loggedUser: UsersModel.getLoggedUser()
        };
    }

    updateState = (key: keyof AppState, data: any) => {
        console.log([key, data]);
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
                            this.state.loggedUser === undefined ?
                                <Login propagateState={this.updateState}/> :
                                <Homepage
                                    loggedUser={this.state.loggedUser}
                                    events={EventsModel.findByUser(this.state.loggedUser)}
                                />
                        }
                    </Route>
                    <Route exact path="/registration">
                        {
                            this.state.loggedUser === undefined ?
                                <Registration/> :
                                <Homepage
                                    loggedUser={this.state.loggedUser}
                                    events={EventsModel.findByUser(this.state.loggedUser)}
                                />
                        }
                    </Route>
                    <Route path="/event/view/:id"
                        render={(props) =>
                            <EventView/>
                        }>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;
