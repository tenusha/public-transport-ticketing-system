import React, { Component } from 'react'

import { Col, Button, Form, Card, Row, Modal } from 'react-bootstrap'
import { updateUserAccount, getUser } from '../Services'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

class UserAccountSettings extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            fname: '',
            lname: '',
            phone: '',
            nic: '',
            email: '',
            address: '',
            open: props.open
        }
        this.baseState = this.state
    }

    componentDidMount() {
        var user = {};
        setTimeout(() => { console.log(this.props.email) }, 1000)

        getUser(this.props.email).then(res => {
            user = res;
            if (user) {
                this.setState({
                    _id: user._id,
                    fname: user.fname,
                    lname: user.lname,
                    phone: user.phone,
                    nic: user.nic || '',
                    email: user.email,
                    address: user.address,
                    open: false,
                    proOpen: true
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    setOpen = () => {
        this.setState({ open: !this.state.open });
    }

    setProOpen = () => {
        this.setState({ proOpen: !this.state.proOpen });
    }

    handleChange = type => event => {
        let value = event
        if (event.target) {
            value = event.target.value
        }
        this.setState({ [type]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        event.stopPropagation()

        var user = this.state
        console.log(user)
        this.updateUserData(user, user._id);        
    }

    updateUserData = (body, id) => {
        console.log(body)
        updateUserAccount(body, id)
            .then(res => {
                toast.success("Account updated!!!");
                window.location.reload();
            })
            .catch(err => {
                toast.error("Unable to update new data!!!");
            });
    }

    render() {
        return (<Modal show={this.props.open} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Col>
                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <Link>
                                <Card.Header>
                                    Change Profile
                                    </Card.Header>
                            </Link>
                            <div style={{ marginTop: 10 }}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridFName">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control required type="username" placeholder="Enter first name" onChange={this.handleChange('fname')} value={this.state.fname} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridLName">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control required type="username" placeholder="Enter last name" onChange={this.handleChange('lname')} value={this.state.lname} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridPhone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control required type="username" placeholder="Enter Phone Number" onChange={this.handleChange('phone')} value={this.state.phone} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridNIC">
                                        <Form.Label>NIC</Form.Label>
                                        <Form.Control type="username" placeholder="Enter NIC" onChange={this.handleChange('nic')} value={this.state.nic} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="controlTextarea1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control required as="textarea" rows="3" onChange={this.handleChange('address')} value={this.state.address} />
                                </Form.Group>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required type="email" placeholder="Enter email" onChange={this.handleChange('email')} value={this.state.email} disabled />
                                </Form.Group>
                            </div>
                            <Col style={{ paddingRight: 0, marginTop: 20 }} align='right'>
                                <Button variant="primary" type="submit">
                                    Update account
                                    </Button>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
        )
    }
}

export default UserAccountSettings