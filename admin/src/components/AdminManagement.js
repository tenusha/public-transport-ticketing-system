import React, {Component} from 'react'

import {Button, Form, Col, Row, Table} from 'react-bootstrap'
import { toast } from 'react-toastify';
import {getHash} from "./commons/Functions";
import {register, admins, deleteAdmin} from "../Services";

class AdminManagement extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            showErr: false,
            errMsg: "Entered email already exist!!!",
        };
        this.baseState = this.state
    }

    componentDidMount() {
        this.getAllAdmins();
    }

    componentWillUnmount() {
        this.setState(this.baseState)
    }

    getAllAdmins = () => {
        admins().then(res => {
            this.setState({ data: res })
        }).catch(err => {
            console.log(err)
        })
    };

    deleteEntry(email) {
        deleteAdmin(email).then(res => {
            toast.success("Admin Successfully Deleted");
            this.getAllAdmins();
        }).catch(err => {
            toast.error("Unable to delete admin")
        })
    }

    handleChange = type => event => {
        let value = event
        if (event.target) {
            if(type === 'nic') {
                value = event.target.value.toUpperCase();
            } else {
                value = event.target.value
            }
        }
        this.setState({[type]: value})
    };

    handleSubmit = event => {
        this.setState({showErr: false});
        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            var body = {fname: this.state.fname, lname: this.state.lname, nic: this.state.nic, phone: this.state.phone, email: this.state.email, address: this.state.address ,password: getHash(this.state.nic)}
            console.log(body);
            register(body)
                .then(res => {
                    toast.success("Admin Added Successfully");
                    this.getAllAdmins();
                })
                .catch(err => {
                    if (err.then && typeof err.then === 'function') {
                        err.then(e => {
                            toast.error("Unable to add admin")
                            if (e.exist) {
                                this.setState({showErr: true})
                            }
                        })
                    } else {
                        console.log(err)
                    }
                })
        }
        event.preventDefault();
        event.stopPropagation()
    };

    render() {
        return (
            <Form style={{padding: 20}} onSubmit={(e) => this.handleSubmit(e)}>
                <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Form.Row style={{width: '75%', borderBottom: '1px solid rgb(200,200,200)', marginBottom: 20}}>
                        <h4>Add An Admin</h4>
                    </Form.Row>
                    <Form.Row style={{width: '75%'}}>
                        <Form.Group as={Col} controlId="adminFname">
                            <Form.Label>First name</Form.Label>
                            <Form.Control required type="username" placeholder="Enter first name"
                                          onChange={this.handleChange('fname')}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="adminLname">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control required type="username" placeholder="Enter last name"
                                          onChange={this.handleChange('lname')}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{width: '75%'}}>
                        <Form.Group as={Col} controlId="adminPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control required type="username" placeholder="Enter Phone Number"
                                          onChange={this.handleChange('phone')}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="adminNic">
                            <Form.Label>NIC</Form.Label>
                            <Form.Control required type="username" placeholder="Enter NIC "
                                          onChange={this.handleChange('nic')}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{width: '75%'}}>
                        <Form.Group  as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email"
                                          onChange={this.handleChange('email')}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{width: '75%'}}>
                        <Form.Group  as={Col} controlId="adminTextarea">
                            <Form.Label>Address</Form.Label>
                            <Form.Control required as="textarea" rows="3" onChange={this.handleChange('address')}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row style={{width: '75%', padding: 5,  paddingBottom: 20}}>
                        <Button variant="primary" type="submit">
                            Add Admin
                        </Button>
                    </Form.Row>
                    <Form.Row style={{width: '75%'}}>
                        {this.state.showErr && <p style={{color: 'red'}}>{this.state.errMsg}</p>}
                    </Form.Row>
                    <Form.Row style={{width: '75%', paddingLeft: 5, align: 'right'}}>
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
                            {this.state.data.map((admin) => {
                                return <tr key={admin.email}>
                                    <td>{admin.fname}</td>
                                    <td>{admin.lname}</td>
                                    <td>{admin.nic}</td>
                                    <td>{admin.phone}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.address}</td>
                                    <td>
                                        <Button variant="danger" type="button" onClick={() => this.deleteEntry(admin.email)}>
                                            Delete Admin
                                        </Button>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </Table>
                    </Form.Row>
                </Row>
            </Form>
        );
    }
}

export default AdminManagement;