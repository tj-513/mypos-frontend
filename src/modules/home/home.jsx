import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import './home.css'
import OrderBar from "./order_bar/OrderBar";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {open: false}
    }

    render() {
        const {open} = this.state;
        return (
            <div className="align-center text-center top-large-space">
                <div className="container-home text-center">

                    <div>
                        <h3> MyPoS - Point of Sales System</h3>
                    </div>

                    <div className="row order-bar-container-header">
                        <h5 className="col-10">Currently Open Orders</h5>
                        <button className="col-2 btn btn-info"> + Create Order</button>
                    </div>

                    <div className="row order-bar-container">
                        <span className="col">Name</span>
                        <span className="col">Status</span>
                        <span className="col">Date Created</span>
                        <span className="col">Actions</span>
                    </div>

                    <div>
                        <OrderBar orderName="Morning Order" dateCreated="20-10-2019" orderStatus="open"/>
                        <OrderBar orderName="Morning Order" dateCreated="20-10-2019" orderStatus="open"/>
                        <OrderBar orderName="Morning Order" dateCreated="20-10-2019" orderStatus="open"/>
                        <OrderBar orderName="Morning Order" dateCreated="20-10-2019" orderStatus="open"/>
                        <OrderBar orderName="Morning Order" dateCreated="20-10-2019" orderStatus="open"/>
                    </div>


                    {/* here lies the closed orders */}
                    <div className="row order-bar-container-header mt-3">
                        <h5 className="col-8">Closed Orders</h5>

                        <Button
                            onClick={() => this.setState({open: !open})}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            className="btn btn-sm btn-info"
                        >
                            + Show Closed Orders
                        </Button>


                    </div>

                    <Collapse in={this.state.open}>
                        <div id="example-collapse-text">
                            <div>
                                <OrderBar orderName="Morning Order" dateCreated="20-10-2019" orderStatus="open"/>
                                <OrderBar orderName="Morning Order" dateCreated="20-10-2019" orderStatus="open"/>
                                <OrderBar orderName="Morning Order" dateCreated="20-10-2019" orderStatus="open"/>
                                <OrderBar orderName="Morning Order" dateCreated="20-10-2019" orderStatus="open"/>
                                <OrderBar orderName="Morning Order" dateCreated="20-10-2019" orderStatus="open"/>
                            </div>
                        </div>
                    </Collapse>


                    <div>

                    </div>
                </div>


            </div>
        );
    }

}

export default Home;
