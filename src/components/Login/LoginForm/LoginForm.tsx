import React from "react";

import UsersModel, {UserInterface} from "../../../model/Users";
import {ValidationFunction, ValidationTuple} from "../../../types/CustomeTypes";
import ActionButton from "../../Common/ActionButton";
import AppTextField from "../../Common/AppTextField";
import {Grid} from "@mui/material";
import MessageBox from "../../Common/MessageBox";
import merge from "merge-objects";

interface ILoginFormData {
    username?: string,
    password?: string
}

interface ILoginFormProps {
    propagateState(key: string, data: any): any
}

interface ILoginFormState {
    data: ILoginFormData,
    messages?: {
        validation?: ILoginFormData,
        global?: string,
    }
}

interface ILoginFormStateFragment {
    data?: ILoginFormData,
    messages?: {
        validation?: ILoginFormData,
        global?: string,
    }
}

interface DataValidationFunctionsInterface {
    username: ValidationFunction,
    password: ValidationFunction
}

interface MessagesInterface {
    validation: {
        username: {
            required: string
        },
        password: {
            required: string
        }
    },
    global: {
        invalidCredentials: string
    }
}

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {

    validated: boolean = false;

    validationFunctions: DataValidationFunctionsInterface;
    stateUpdate?: ILoginFormStateFragment;

    messages: MessagesInterface = {
        validation: {
            username: {
                required: 'Please enter your username.'
            },
            password: {
                required: 'Please enter your password.'
            }
        },
        global: {
            invalidCredentials: 'Please enter valid credentials.'
        }
    };

    /**
     * @param props
     */
    constructor(props: any) {
        super(props);
        this.state = {
            data: {
                username: undefined,
                password: undefined
            },
            messages: {
                validation: {
                    username: undefined,
                    password: undefined
                },
                global: undefined
            }
        };
        this.validationFunctions = {
            username: this.validateUsername,
            password: this.validatePassword
        };
    }

    /**
     * @param stateFragment
     */
    update = (stateFragment: ILoginFormStateFragment) => {
        console.log('EventCreateForm update');
        let stateUpdate: ILoginFormState = this.state;
        let newState: ILoginFormState = merge(stateUpdate, stateFragment);
        console.log(newState);
        this.setState(newState);
    }

    /**
     * @param key
     */
    getData = (key: string) => {
        let keyTyped = key as keyof ILoginFormData;
        return this.state.data[keyTyped];
    }

    /**
     * @param key
     */
    getValidationFunction = (key: string) => {
        let validationFcKey: keyof DataValidationFunctionsInterface = key as keyof DataValidationFunctionsInterface;
        return this.validationFunctions[validationFcKey];
    }

    prepareValidationMessagesObj = () => {
        this.stateUpdate = {
            messages: {
                validation: {
                    username: undefined,
                    password: undefined
                }
            }
        }
    }

    /**
     * @param key
     * @param msg
     */
    setValidationMessage = (key: string, msg: string | undefined) => {
        let keyTyped: keyof ILoginFormData = key as keyof ILoginFormData;
        if (this.stateUpdate && this.stateUpdate.messages && this.stateUpdate.messages.validation) {
            this.stateUpdate.messages.validation[keyTyped] = msg;
        }
    }

    /**
     * @param data
     */
    validateUsername = (data: string | undefined): ValidationTuple => {
        if (typeof this.state.data.username !== 'string') {
            return [false, this.messages.validation.username.required];
        }
        return [true, undefined];
    }

    /**
     * @param data
     */
    validatePassword = (data: string | undefined): ValidationTuple => {
        if (typeof this.state.data.password !== 'string') {
            return [false, this.messages.validation.password.required];
        }
        return [true, undefined];
    }

    validate = () => {
        this.prepareValidationMessagesObj();
        let isValid = true;
        for (const dataKey of Object.keys(this.state.data)) {
            let res: [boolean, string | undefined] = this.getValidationFunction(dataKey)(this.getData(dataKey));
            if (!res[0]) {
                this.setValidationMessage(dataKey, res[1])
                isValid = false;
            }
        }
        this.validated = isValid;
        if (this.stateUpdate !== undefined) {
            let newState: ILoginFormState = merge(this.state, this.stateUpdate);
            this.setState(newState);
        }
    }

    /**
     * @param event
     */
    logIn = (event: React.MouseEvent<HTMLElement>) => {
        console.log('logIn');
        this.validate();

        if (!this.validated) {
            console.log('ERROR');
            console.log(this.state.messages);
            return;
        }

        let loginRes: UserInterface | undefined = UsersModel.findByCredentials(this.state.data.username, this.state.data.password);

        if (loginRes !== undefined) {
            UsersModel.setLoggedUser(loginRes);
            this.props.propagateState('user', loginRes);
            return;
        }

        this.setState({
            messages: {
                global: this.messages.global.invalidCredentials
            }
        })

        return null;
    }

    renderGlobalMessages() {
        if (this.state.messages === undefined) {
            return;
        }
        if (this.state.messages.global !== undefined) {
            return <MessageBox
                        msg={this.state.messages.global}
                        color={'error.main'}
                    />
        }
    }

    render() {
        return (
            <Grid container direction={"column"} rowSpacing={2}>
                <Grid container item>
                    <AppTextField
                        type={'text'}
                        name={'username'}
                        label={'Přihlašovací jméno *'}
                        updateParent={this.update}
                        message={this.state.messages?.validation?.username}
                    />
                </Grid>
                <Grid container item>
                    <AppTextField
                        type={'password'}
                        name={'password'}
                        label={'Heslo *'}
                        updateParent={this.update}
                        message={this.state.messages?.validation?.password}
                    />
                </Grid>
                <Grid container item marginTop={"16px"}>
                    <ActionButton variant={"contained"} clickHandler={this.logIn}>
                        Přihlásit se
                    </ActionButton>
                    {this.renderGlobalMessages()}
                </Grid>
            </Grid>
        )
    }

}

export default LoginForm;