import React from 'react'
import {Navbar} from 'react-bootstrap'


class PosNavbar extends React.Component {

    render() {

        const user = localStorage.getItem("user");
        console.log(user);
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">MyPoS - Point of Sales</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">

                        <Navbar.Text>
                            { user !== null?
                                <button className='btn btn-light'
                                        onClick={(() => {
                                            localStorage.clear();
                                            window.location.reload(true);
                                        })}
                                > Sign Out
                                </button>

                                :

                                null

                            }

                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }

}

export default PosNavbar;