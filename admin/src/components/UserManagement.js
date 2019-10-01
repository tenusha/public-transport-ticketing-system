import React, { Component } from 'react'

import { Button, Form, Col, Row, Table, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { updateUser, users, deleteUser } from "../Services";

import UserAccountSettings from './UserAccountSettings';

class UserManagement extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            showErr: false,
            open: false
        };
        this.baseState = this.state
    }

    componentDidMount() {
        this.getAllUsers();
        this.handleModalClose();
    }

    componentWillUnmount() {
        this.setState(this.baseState)
    }

    getAllUsers = () => {
        users().then(res => {
            this.setState({ data: res })
        }).catch(err => {
            console.log(err)
        })
    };

    handleModalClose = () => {
        this.setState({ open: false })
    }

    updateEntry = email => {
        this.setState({ email, open: true })
    }

    deleteEntry(email) {
        deleteUser(email).then(res => {
            toast.success("User Successfully Deleted");
            this.getAllUsers();
        }).catch(err => {
            toast.error("Unable to delete user!")
        })
    }

    disableUser(user) {
        updateUser({ ...user, enabled: !user.enabled }, user._id)
            .then(res => {
                if (user.enabled) {
                    toast.success("User " + user.fname + " is disabled.");
                } else {
                    toast.success("User " + user.fname + " is enabled.");
                }
                this.getAllUsers();
            })
            .catch(err => {
                toast.error("Unable to disable user " + user.fname);
            });
    }

    render() {
        return (
            <Form style={{ padding: 20 }} onSubmit={(e) => this.handleSubmit(e)}>
                <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Form.Row style={{ width: '75%', paddingLeft: 5, align: 'right' }}>
                        <Table striped size="sm">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>NIC Number</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((user) => {
                                    return <tr key={user.email}>
                                        <td>{user.fname}</td>
                                        <td>{user.lname}</td>
                                        <td>{user.nic}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <Button variant="warning" type="button" onClick={() => this.disableUser(user)}>
                                                {(user.enabled) ? "Disable" : "Enable"}
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="info" type="button" onClick={() => this.updateEntry(user.email)}>
                                                Edit
                                        </Button>
                                        </td>
                                        <td>
                                            <Button variant="danger" type="button" onClick={() => this.deleteEntry(user.email)}>
                                                Remove
                                        </Button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </Form.Row>
                </Row>
                {this.state.open &&
                    <UserAccountSettings open={this.state.open} handleClose={this.handleModalClose} email={this.state.email} />
                }
            </Form>
        );
    }
}

export default UserManagement;