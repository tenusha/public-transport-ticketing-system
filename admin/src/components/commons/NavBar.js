import React, {Component} from 'react'

import {Navbar, Nav, NavDropdown, Image} from 'react-bootstrap'

class NavBar extends Component {

    render() {
        var user = localStorage.getItem('admin_user')
        if (user) {
            user = JSON.parse(user)
        }
        return (
            <Navbar bg="dark" variant="dark" expand="sm">
                <Navbar.Brand href="/">
                    E - Railway Admin Panel
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {user ?
                            <>
                                <Nav.Link href="/">{'Home'}</Nav.Link>
                                <Nav.Link href="/reports">{'Reports'}</Nav.Link>
                                <Nav.Link href="/routeManage">{'Routes'}</Nav.Link>
                                <Nav.Link href="/trainManage">{'Trains'}</Nav.Link>
                                <Nav.Link href="/admins">{'Admins'}</Nav.Link>
                                <Nav.Link href="/users">{'Users'}</Nav.Link>
                                <NavDropdown title={user.fname} id="nav-dropdown" alignRight>
                                    <NavDropdown.Item href="/account">Account Settings</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item onClick={this.props.logout}>Sign out</NavDropdown.Item>
                                </NavDropdown>
                                {(user.imageUrl) ? <Image src={user.imageUrl} width={40}/> :
                                    <Image src={require("../../images/login.png")} width={40}/>}
                            </>
                            :
                            <>
                                <Nav.Link href="" onClick={this.props.handleLoginShow}>Sign In</Nav.Link>
                            </>

                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;