import React from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import fetchAuth from '../common/FetchAuth'
import OrderBar from "./order_bar/OrderBar";
import OrderModal from "./order_modal/OrderModal";
import {withRouter} from "react-router-dom";
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const API_URL = process.env.REACT_APP_API_URL;

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.doGetOrdersForUser = this.doGetOrdersForUser.bind(this);
        this.onModalClosed = this.onModalClosed.bind(this);
        this.showCreateOrder = this.showCreateOrder.bind(this);
        this.onOrderDetailsClicked = this.onOrderDetailsClicked.bind(this);
        this.onNewOrderAdded = this.onNewOrderAdded.bind(this);
        this.onOrderDeleted = this.onOrderDeleted.bind(this);
        this.onOrderUpdated = this.onOrderUpdated.bind(this);


        this.state = {
            open: false,
            orders: [],
            startMessage:"",
            modalData: {
                modalShow: false,
                modalMode: 'create',
                modalOrderId: null,
                modalOrderName: ''
            }
        }

    }


    componentDidMount() {
        this.doGetOrdersForUser()
    }

    doGetOrdersForUser() {
        this.setState({startMessage: "Please wait while the data is being loaded..."});
        let user = localStorage.getItem("user");
        user = JSON.parse(user);

        fetchAuth(`${API_URL}/api/users/orderlist/${user.id}`, {
            method: 'GET',
        }).then(response => response.json()
            .then(data => {
                if (response.ok) {
                    this.setState({startMessage: "No orders found"});
                    this.setState({orders: data})
                } else {
                    this.setState({startMessage: "Retrieval failed..."});
                }
            }))
            .catch(e => {
                console.log(e);
                this.setState({startMessage: "Retrieval Failed..."});
            })
    }


    onModalClosed() {
        this.setState({
            modalData: {
                modalShow: false
            }
        });
        this.doGetOrdersForUser();
    }

    onNewOrderAdded(order) {
        this.setState(prevState => prevState.orders.unshift(order));
    }

    onOrderDeleted(orderId) {
        let orderItemRemoved = [...this.state.orders].filter(order => order.id !== orderId);
        this.setState({orders: orderItemRemoved});
    }

    onOrderDetailsClicked(orderId) {
        this.setState({
            modalData: {
                modalMode: 'edit',
                modalShow: true,
                modalOrderId: orderId
            }
        })
    }

    onOrderUpdated(order) {
        // insert the modified item to the top of the list

        this.setState(prevState => {
            let existingItems = prevState.orders.filter(item => item.id !== order.id);
            existingItems.push(order);
            prevState.orders = existingItems;
            return prevState;
        });

    }




    showCreateOrder() {

        this.setState({
            modalData: {
                modalMode: 'create',
                modalShow: true
            }
        })
    }

    render() {
        const {open} = this.state;
        const openOrders = this.state.orders.filter(order => order.orderStatus === 'open');
        const closedOrders = this.state.orders.filter(order => order.orderStatus === 'closed');
        return (
            <div>

                <div className="align-center text-center ">

                    {(this.state.modalData.modalShow) &&
                    <OrderModal
                        mode={this.state.modalData.modalMode}
                        show={this.state.modalData.modalShow}
                        orderId={this.state.modalData.modalOrderId}
                        onHide={this.onModalClosed}
                        onNewOrderAdded={this.onNewOrderAdded}
                        onOrderUpdated={this.onOrderUpdated}

                    />

                    }
                    <div className="container-home text-center">

                        <div>
                            <h3> MyPoS - Point of Sales System</h3>
                        </div>

                        <div className="row order-bar-container-header">
                            <h5 className="col-10">Currently Open Orders</h5>
                            <button className="col-2 btn btn-info" onClick={this.showCreateOrder}> + Create Order
                            </button>
                        </div>

                        {openOrders.length === 0 ?
                            <div className="row order-bar-container text-center">
                               {this.state.startMessage}

                            </div>
                            :
                            <div className="row order-bar-container">
                                <span className="col-3">Name</span>
                                <span className="col-2">Status</span>
                                <span className="col-4">Date Modified</span>
                                <span className="col-3">Actions</span>
                            </div>
                        }
                        <div>

                            {
                                openOrders.map((order) => (
                                    <OrderBar
                                        key={order.id}
                                        orderName={order.orderName}
                                        dateCreated={
                                            new Date(Date.parse(order.dateModified)).toLocaleString()}
                                        orderStatus={order.orderStatus}
                                        orderId={order.id}
                                        onDetailsClick={this.onOrderDetailsClicked}
                                        onOrderDeleted={this.onOrderDeleted}

                                    />
                                ))
                            }

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
                                + Show/Hide Closed Orders
                            </Button>


                        </div>

                        <Collapse in={this.state.open}>
                            <div id="example-collapse-text">
                                <div style={{overflowY: 'scroll', maxHeight:'400px'}}>

                                    {closedOrders.length === 0 ?
                                        <div className="row order-bar-container text-center">
                                           {this.state.startMessage}
                                        </div>
                                        :
                                        <div className="row order-bar-container">
                                            <span className="col-3">Name</span>
                                            <span className="col-3">Status</span>
                                            <span className="col-2">Date Modified</span>
                                            <span className="col-4">Actions</span>
                                        </div>
                                    }


                                    <div>

                                        {
                                            closedOrders.map((order) => (
                                                <OrderBar
                                                    key={order.id}
                                                    orderName={order.orderName}
                                                    dateCreated={
                                                        new Date(Date.parse(order.dateModified)).toLocaleString()}
                                                    orderStatus={order.orderStatus}
                                                    orderId={order.id}
                                                    onDetailsClick={this.onOrderDetailsClicked}
                                                    onOrderDeleted={this.onOrderDeleted}

                                                />
                                            ))
                                        }

                                    </div>

                                </div>
                            </div>
                        </Collapse>


                        <div>

                        </div>
                    </div>


                </div>
            </div>
        );
    }

}

export default withRouter( Home);
