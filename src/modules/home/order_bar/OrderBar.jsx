import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './OrdreBar.css'
import {NotificationManager} from "react-notifications";

class OrderBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteConfirmation: false
        };

        this.onModalEntered = this.onModalEntered.bind(this);
        this.handleDetailsClick = this.handleDetailsClick.bind(this)
        this.doDeleteOrder = this.doDeleteOrder.bind(this)

    }

    onModalEntered() {

    }

    doDeleteOrder() {
        let orderId = this.props.orderId;

        fetch(`http://localhost:8090/api/orders/${orderId}`, {
            method: 'DELETE',
        }).then(response => response.json()
            .then(data => {
                if (response.ok) {
                    console.log('Order deleted:', data);
                    this.props.onOrderDeleted(data.id);
                    NotificationManager.success(`Order {${data.orderName}} Successfully Deleted`, 'Success');

                } else {
                    console.log('Order order deletion failed', data)
                }
            }))
            .catch(e => {
                console.log('error occurred deleting', e)
            })
    }

    handleDetailsClick() {
        this.props.onDetailsClick(this.props.orderId)
    }

    render() {

        return (

            <div>
                {this.state.deleteConfirmation ?

                    <div className="row order-bar-container" style={{backgroundColor: '#ffc2b3'}}>
                        <span className="vcenter col-3 border-right">{this.props.orderName}</span>
                        <span className="vcenter col-4 h5">Are you sure ?</span>
                        <span className="vcenter col-5">
                            <button className="btn btn-danger col-5 mr-1"
                                    onClick={this.doDeleteOrder}>Delete</button>
                            <button className="btn btn-primary col-5 mr-1"
                                    onClick={() => this.setState({deleteConfirmation: false})}
                            >Keep</button>
                        </span>

                    </div>

                    :
                    <div className="row order-bar-container">
                        <span className="vcenter col-3">{this.props.orderName}</span>
                        <span
                            className={
                                this.props.orderStatus === 'open' ?
                                    "vcenter col-2 h3 badge badge-success" : "vcenter col-2 h3 badge badge-dark"}
                        >{this.props.orderStatus}</span>
                        <span className="vcenter col-4">{this.props.dateCreated}</span>
                        <span className="vcenter col-3">
                    <button className="btn btn-info btn-space"
                            onClick={this.handleDetailsClick}>Details</button>
                    <button className="btn btn-danger btn-space"
                            onClick={() => this.setState({deleteConfirmation: true})}
                    >Delete</button>
                    </span>
                    </div>
                }


            </div>
        );
    }

}

export default OrderBar;
