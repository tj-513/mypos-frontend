
import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class PosNavbar extends React.Component{
    constructor(){
        super()
    }

    render() {

        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">MyPoS - Point of Sales</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">

                    <Navbar.Text>
                        <a> Sign Out </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default PosNavbar;