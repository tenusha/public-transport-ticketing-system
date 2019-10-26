import React, { Component } from 'react'

import { Modal, Button, Form, Image, Row, Alert } from 'react-bootstrap'
import { login, updateAccount, register } from '../Services'
import { getHash } from './commons/Functions'
import { toast } from 'react-toastify'
import GoogleLogin from 'react-google-login';

class Login extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            // validated: false,
            modalShowErr: false,
            modalErrMsg: "Incorrect username or password!!!",
            username: "",
            password: ""
        }
        this.baseState = this.state
    }

    componentWillUnmount() {
        this.setState(this.baseState)
    }

    handleChange = type => event => {
        let value = event;
        if (event.target) {
            value = event.target.value;
        }
        this.setState({ [type]: value })
    }

    handleSubmit = event => {
        this.setState({ modalShowErr: false })
        const form = event.currentTarget

        if (form.checkValidity() === true) {
            login({ username: this.state.username, password: getHash(this.state.password) })
                .then(res => {
                    if (res.enabled === false) {
                        if (res.loginCount === 0) {
                            toast.error("Please confirm your email !")
                        } else {
                            toast.error("Oh snap! Your account is disabled !")
                        }
                    } else {
                        localStorage.setItem('user', JSON.stringify(res))
                        this.incrementLoginCount(res)
                        this.props.handleClose()
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ modalShowErr: true })
                })
        }
        event.preventDefault()
        event.stopPropagation()
    }

    joinClick = () => {
        this.props.handleClose()
        this.props.handleRegisterShow()
    }

    incrementLoginCount(user) {
        const newCount = user.loginCount + 1;
        updateAccount({ ...user, loginCount: newCount }, user._id)
            .then(res => {
            })
            .catch(err => {
            });
    };

    responseGoogle = async (response) => {
        const profileObj = response.profileObj;
        this.setState({ imageUrl: profileObj.imageUrl });
        await register(profileObj).then(res => {
            profileObj._id = res._id;
            profileObj.fname = profileObj.givenName;
        }).catch(e => {
            this.errResponseGoogle(e);
        });
        localStorage.setItem('user', JSON.stringify(profileObj));
        this.props.handleClose();
    };

    errResponseGoogle = (response) => {
        toast.error("Unable to Sign in with Google !");
    }

    render() {
        const img = (this.state.imageUrl) ? <Image src={this.state.imageUrl} width='30%' /> :
            <Image src={require("../images/login.png")} width='30%' />;
        return (
            <Modal show={this.props.showLogin} onHide={this.props.handleClose}>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                            {img}
                        </Row>
                        <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <GoogleLogin
                                style={{ width: '100%' }}
                                clientId="142559740236-kl8af28rsfc12v2e4rulgg97ijhdla5d.apps.googleusercontent.com"
                                buttonText="LOGIN WITH GOOGLE"
                                onSuccess={this.responseGoogle}
                                onFailure={this.errResponseGoogle}
                            />
                        </Row>
                        <hr />
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="username" placeholder="Enter email"
                                onChange={this.handleChange('username')} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Enter Password"
                                onChange={this.handleChange('password')} />
                        </Form.Group>
                        {this.state.modalShowErr && <Alert variant={'danger'}>{this.state.modalErrMsg}</Alert>}
                        <Button variant="primary" type="submit" block>
                            Sign in
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" block onClick={this.joinClick}>
                            Join Now
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default Login;