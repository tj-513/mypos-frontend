
import React from 'react'
import { Navbar } from 'react-bootstrap'

class PosNavbar extends React.Component{


    render() {

        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">MyPoS - Point of Sales</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">

                    <Navbar.Text>
                        <button className='btn btn-light'> Sign Out </button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default PosNavbar;