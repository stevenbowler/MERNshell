import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Col,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
const { passwordValidation, emailValidation, nameValidation } = require('../functions/validationNameEmailPassword');


class LoginRegisterModals extends Component {
    constructor(props) {
        super(props);
        this.validEmail = false;
        this.invalidEmail = false;
        this.validName = false;
        this.invalidName = false;
        this.validPassword = false;
        this.invalidPassword = false;
        this.invalidEmailMessage = "";
        this.invalidNameMessage = "";
        this.invalidPasswordMessage = "";
        this.login = false;
    }

    componentDidMount() {


    }

    handleSubmit = (event) => {
        console.log("App.js handleSubmit logging in with: ", event.target.email.value);
        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        }
        if (this.validName && this.validEmail && this.validPassword) {
            this.props.onRegister(data);
            this.validName = false;
            this.validEmail = false;
            this.validPassword = false;
            //event.preventDefault();
        }
        else if (this.validEmail && this.validPassword && this.props.isOpenLoginModal) {
            // console.log("handleSubmit Login with email: " + event.target.email.value + "password: " + event.target.password.value);
            this.props.onLogin({ email: event.target.email.value, password: event.target.password.value });
            this.validEmail = false;
            this.validPassword = false;
            event.preventDefault();
        }
        else event.preventDefault();
    }

    handleCancel = () => {
        this.validEmail = false;
        this.invalidEmail = false;
        this.validName = false;
        this.invalidName = false;
        this.validPassword = false;
        this.invalidPassword = false;
        this.invalidEmailMessage = "";
        this.invalidNameMessage = "";
        this.invalidPasswordMessage = "";
        this.props.onCancel();
    }

    handleNameChange = (event) => {
        const data = {
            name: event.target.value
        }
        const { error } = nameValidation(data);
        if (error) {
            this.validName = false;
            this.invalidName = true;
            this.invalidNameMessage = error.details[0].message;
            this.forceUpdate();
            //console.log("NameInput: " + event.target.value + "validation error: " + error.details[0].message);
            return;
        }
        if (event.target.value) {
            //console.log("NameInput: " + event.target.value);
            this.validName = true;
            this.invalidName = false;
            this.invalidNameMessage = "";
            this.forceUpdate();
        }
    }


    handleEmailChange = (event) => {
        const data = {
            email: event.target.value
        }
        const { error } = emailValidation(data);
        if (error) {
            this.validEmail = false;
            this.invalidEmail = true;
            this.invalidEmailMessage = error.details[0].message;
            this.forceUpdate();
            //console.log("emailInput: " + event.target.value + "validation error: " + error.details[0].message);
            return;
        }
        if (event.target.value) {
            //console.log("emailInput: " + event.target.value);
            this.validEmail = true;
            this.invalidEmail = false;
            this.invalidEmailMessage = "";
            this.forceUpdate();
        }
    }


    handlePasswordChange = (event) => {
        const data = {
            password: event.target.value
        }
        const { error } = passwordValidation(data);
        if (error) {
            this.validPassword = false;
            this.invalidPassword = true;
            this.invalidPasswordMessage = error.details[0].message;
            this.forceUpdate();
            //console.log("PasswordInput: " + event.target.value + "validation error: " + error.details[0].message);
            return;
        }
        if (event.target.value) {
            //console.log("PasswordInput: " + event.target.value);
            this.validPassword = true;
            this.invalidPassword = false;
            this.invalidPasswordMessage = "";
            this.forceUpdate();

        }
    }


    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpenRegisterModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>{this.props.isOpenLoginModal ? "Login" : "Register"}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup hidden={this.props.isOpenLoginModal ? true : false}>
                                <Label for="nameInput" sm={20}>Name:</Label>
                                <Col sm={100}>
                                    <Input
                                        type="search"
                                        id="nameInput"
                                        defaultValue={this.props.isOpenLoginModal ? "Not Logged In" : ""}
                                        name="name"
                                        onChange={this.handleNameChange}
                                        placeholder="8 characters minumum"
                                        valid={this.validName ? true : false}
                                        invalid={this.invalidName ? true : false}>
                                    </Input>
                                    <FormText>{this.invalidNameMessage}</FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label for="emailInput" sm={20}>Email (Login ID):</Label>
                                <Col sm={100}>
                                    <Input
                                        type="email"
                                        id="emailInput"
                                        defaultValue=""
                                        name="email"
                                        onChange={this.handleEmailChange}
                                        placeholder="8 characters minumum"
                                        valid={this.validEmail ? true : false}
                                        invalid={this.invalidEmail ? true : false} >
                                    </Input>
                                    <FormText>{this.invalidEmailMessage}</FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label for="passwordInput" sm={20}>Password: </Label>
                                <Col sm={100}>
                                    <Input
                                        type="password"
                                        id="passwordInput"
                                        defaultValue=""
                                        name="password"
                                        onChange={this.handlePasswordChange}
                                        placeholder="8 characters minumum"
                                        valid={this.validPassword ? true : false}
                                        invalid={this.invalidPassword ? true : false} />
                                    <FormText>{this.invalidPasswordMessage}</FormText>
                                </Col>
                            </FormGroup>
                            <Button color="primary" type="submit" >{this.props.isOpenLoginModal ? "Login" : "Register"}</Button>{' '}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleCancel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );

    }

}
export default LoginRegisterModals;