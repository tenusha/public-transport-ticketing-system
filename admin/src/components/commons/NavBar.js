import React, { Component } from 'react'

import { Navbar, Nav, NavDropdown, Image, Row } from 'react-bootstrap'

class NavBar extends Component {

    render() {
        var user = localStorage.getItem('user')
        if (user) {
            user = JSON.parse(user)
        }
        return (
            <>
                <Navbar bg="dark" variant="dark" expand="sm">
                    <Navbar.Brand href="/">
                        Railway E-Ticketing Admin Panel
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {user ?
                                <>
                                    <Nav.Link href="/" >{'Reports'}</Nav.Link>
                                    <Nav.Link href="/routs" >{'Routs'}</Nav.Link>
                                    <Nav.Link href="/admins" >{'Admins'}</Nav.Link>
                                    <Nav.Link href="/users" >{'Users'}</Nav.Link>
                                    <NavDropdown title={user.fname} id="nav-dropdown" alignRight>
                                        <NavDropdown.Item href="/account">Account Settings</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={this.props.logout}>Sign out</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                :
                                <>
                                    <Nav.Link href="" onClick={this.props.handleLoginShow}>Sign In</Nav.Link>
                                </>

                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }
}

export default NavBar;