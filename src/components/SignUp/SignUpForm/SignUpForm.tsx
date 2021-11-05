import React from "react";
import {ValidationFunction, ValidationTuple} from "../../../types/CustomeTypes";
import AppTextField from "../../Common/AppTextField";
import ActionButton from "../../Common/ActionButton";
import {Button, Grid} from "@mui/material";
import {Link} from "react-router-dom";

interface RegistrationFormStateInterface {
    messages?: {
        validation?: {
            username?: string,
            givenName?: string,
            familyName?: string,
            email?: string,
            password?: string,
            confirmPassword?: string
        },
        global?: string
    }
}

interface RegistrationFormDataInterface {
    username?: string,
    givenName?: string,
    familyName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
}

interface DataValidationFunctionsInterface {
    username: ValidationFunction,
    givenName: ValidationFunction,
    familyName: ValidationFunction,
    email: ValidationFunction,
    password: ValidationFunction,
    confirmPassword: ValidationFunction
}

interface MessagesInterface {
    validation: {
        username: {
            required: string
        },
        givenName: {
            required: string
        },
        familyName: {
            required: string
        },
        email: {
            required: string
        }
        password: {
            required: string
        },
        confirmPassword: {
            required: string,
            notSame: string
        }
    }
}

class SignUpForm extends React.Component<any, any> {

    validated: boolean = false;

    data: RegistrationFormDataInterface = {
        username: undefined,
        givenName: undefined,
        familyName: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
    };

    validationFunctions: DataValidationFunctionsInterface;
    stateUpdate?: RegistrationFormStateInterface;

    messages: MessagesInterface = {
        validation: {
            username: {
                required: 'Please choose your username.'
            },
            givenName: {
                required: 'Please enter your given name.'
            },
            familyName: {
                required: 'Please enter your family name.'
            },
            email: {
                required: 'Please enter your email.'
            },
            password: {
                required: 'Please enter your password.'
            },
            confirmPassword: {
                required: 'Please confirm your password.',
                notSame: 'Passwords are different.'
            }
        }
    };

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
            givenName: this.validateGivenName,
            familyName: this.validateFamilyName,
            email: this.validateEmail,
            password: this.validatePassword,
            confirmPassword: this.validateConfirmPassword,
        };
    }

    /**
     * @param key
     * @param newVal
     */
    updateData = (key: string, newVal: string) => {
        let k = key as keyof RegistrationFormDataInterface;
        if (this.data[k] !== newVal) {
            this.data[k] = newVal;
        }
    }

    /**
     * @param key
     */
    getData = (key: string) => {
        let keyTyped = key as keyof RegistrationFormDataInterface;
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
                    givenName: undefined,
                    familyName: undefined,
                    email: undefined,
                    password: undefined,
                    confirmPassword: undefined,
                }
            }
        }
    }

    /**
     * @param key
     * @param msg
     */
    setValidationMessage = (key: string, msg: string | undefined) => {
        let keyTyped: keyof RegistrationFormDataInterface = key as keyof RegistrationFormDataInterface;
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
    validateGivenName = (data: string | undefined): ValidationTuple => {
        if (typeof this.data.givenName !== 'string') {
            return [false, this.messages.validation.givenName.required];
        }
        return [true, undefined];
    }

    /**
     * @param data
     */
    validateFamilyName = (data: string | undefined): ValidationTuple => {
        if (typeof this.data.familyName !== 'string') {
            return [false, this.messages.validation.familyName.required];
        }
        return [true, undefined];
    }

    /**
     * @param data
     */
    validateEmail = (data: string | undefined): ValidationTuple => {
        if (typeof this.data.email !== 'string') {
            return [false, this.messages.validation.email.required];
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

    /**
     * @param data
     */
    validateConfirmPassword = (data: string | undefined): ValidationTuple => {
        if (typeof this.data.confirmPassword !== 'string') {
            return [false, this.messages.validation.confirmPassword.required];
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
    signUp = (event: React.MouseEvent<HTMLElement>) => {
        this.validate();
        if (!this.validated) {
            return;
        }
    }

    render() {
        return (
            <Grid container direction={"column"} rowSpacing={1}>
                {/*<Grid container item>*/}
                {/*    <AppTextField*/}
                {/*        type={'text'}*/}
                {/*        name={'username'}*/}
                {/*        label={'Username *'}*/}
                {/*        updateParent={this.updateData}*/}
                {/*        message={this.state.messages?.validation?.username}*/}
                {/*    />*/}
                {/*</Grid>*/}
                {/*<Grid container item>*/}
                {/*    <AppTextField*/}
                {/*        type={'text'}*/}
                {/*        name={'givenName'}*/}
                {/*        label={'Given name *'}*/}
                {/*        updateParent={this.updateData}*/}
                {/*        message={this.state.messages?.validation?.givenName}*/}
                {/*    />*/}
                {/*</Grid>*/}
                {/*<Grid container item>*/}
                {/*    <AppTextField*/}
                {/*        type={'text'}*/}
                {/*        name={'familyName'}*/}
                {/*        label={'Family name *'}*/}
                {/*        updateParent={this.updateData}*/}
                {/*        message={this.state.messages?.validation?.familyName}*/}
                {/*    />*/}
                {/*</Grid>*/}
                {/*<Grid container item>*/}
                {/*    <AppTextField*/}
                {/*        type={'email'}*/}
                {/*        name={'email'}*/}
                {/*        label={'Email *'}*/}
                {/*        updateParent={this.updateData}*/}
                {/*        message={this.state.messages?.validation?.email}*/}
                {/*    />*/}
                {/*</Grid>*/}
                {/*<Grid container item>*/}
                {/*    <AppTextField*/}
                {/*        type={'password'}*/}
                {/*        name={'password'}*/}
                {/*        label={'Password *'}*/}
                {/*        updateParent={this.updateData}*/}
                {/*        message={this.state.messages?.validation?.password}*/}
                {/*    />*/}
                {/*</Grid>*/}
                {/*<Grid container item>*/}
                {/*    <AppTextField*/}
                {/*        type={'password'}*/}
                {/*        name={'confirmPassword'}*/}
                {/*        label={'Confirm password *'}*/}
                {/*        updateParent={this.updateData}*/}
                {/*        message={this.state.messages?.validation?.confirmPassword}*/}
                {/*    />*/}
                {/*</Grid>*/}
                <Grid container item marginTop={"16px"}>
                    <Grid container direction={"column"} rowSpacing={1}>
                        <Grid item>
                            <ActionButton variant={"contained"} clickHandler={this.signUp}>
                                Registrovat se
                            </ActionButton>
                        </Grid>
                        <Grid item>
                            <Button component={Link} to={"/"} variant="contained" fullWidth>Back to Login</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

}

export default SignUpForm;