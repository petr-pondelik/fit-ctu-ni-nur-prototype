import React from "react";

import UsersModel, {UserInterface} from "../../../model/Users";
import {ValidationFunction, ValidationTuple} from "../../../types/CustomeTypes";
import ActionButton from "../../Common/ActionButton";
import AppTextField from "../../Common/AppTextField";
import {Grid} from "@mui/material";
import MessageBox from "../../Common/MessageBox";

interface LoginFormDataInterface {
    username?: string,
    password?: string
}

// interface LoginFormProps extends RouteComponentProps {
interface LoginFormProps {
    propagateState(key: string, data: any): any
}

interface LoginFormStateInterface {
    messages?: {
        validation?: LoginFormDataInterface,
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

class LoginForm extends React.Component<LoginFormProps, LoginFormStateInterface> {

    validated: boolean = false;

    data: LoginFormDataInterface = {
        username: undefined,
        password: undefined,
    };

    validationFunctions: DataValidationFunctionsInterface;
    stateUpdate?: LoginFormStateInterface;

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
     * @param event
     */
    updateData = (event: React.FormEvent<HTMLInputElement>) => {
        let key: keyof LoginFormDataInterface = event.currentTarget.name as keyof LoginFormDataInterface;
        let newVal: string = event.currentTarget.value as string;
        if (this.data[key] !== newVal) {
            this.data[key] = newVal;
        }
    }

    /**
     * @param key
     */
    getData = (key: string) => {
        let keyTyped = key as keyof LoginFormDataInterface;
        return this.data[keyTyped];
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
        let keyTyped: keyof LoginFormDataInterface = key as keyof LoginFormDataInterface;
        if (this.stateUpdate && this.stateUpdate.messages && this.stateUpdate.messages.validation) {
            this.stateUpdate.messages.validation[keyTyped] = msg;
        }
    }

    /**
     * @param data
     */
    validateUsername = (data: string | undefined): ValidationTuple => {
        if (typeof this.data.username !== 'string') {
            return [false, this.messages.validation.username.required];
        }
        return [true, undefined];
    }

    /**
     * @param data
     */
    validatePassword = (data: string | undefined): ValidationTuple => {
        if (typeof this.data.password !== 'string') {
            return [false, this.messages.validation.password.required];
        }
        return [true, undefined];
    }

    validate = () => {
        this.prepareValidationMessagesObj();
        let isValid = true;
        for (const dataKey of Object.keys(this.data)) {
            let res: [boolean, string | undefined] = this.getValidationFunction(dataKey)(this.getData(dataKey));
            if (!res[0]) {
                this.setValidationMessage(dataKey, res[1])
                isValid = false;
            }
        }
        this.validated = isValid;
        if (this.stateUpdate !== undefined) {
            this.setState(this.stateUpdate);
        }
    }

    /**
     * @param event
     */
    logIn = (event: React.MouseEvent<HTMLElement>) => {
        this.validate();

        if (!this.validated) {
            return;
        }

        let loginRes: UserInterface | undefined = UsersModel.findByCredentials(this.data.username, this.data.password);

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
                        label={'Username *'}
                        changeHandler={this.updateData}
                        message={this.state.messages?.validation?.username}
                    />
                </Grid>
                <Grid container item>
                    <AppTextField
                        type={'password'}
                        name={'password'}
                        label={'Password *'}
                        changeHandler={this.updateData}
                        message={this.state.messages?.validation?.password}
                    />
                </Grid>
                <Grid container item marginTop={"16px"}>
                    <ActionButton
                        text={'Login'}
                        clickHandler={this.logIn}
                    />
                    {this.renderGlobalMessages()}
                </Grid>
            </Grid>
        )
    }

}

export default LoginForm;