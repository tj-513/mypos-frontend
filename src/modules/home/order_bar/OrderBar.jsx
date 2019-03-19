import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './OrdreBar.css'

class OrderBar extends React.Component {
    constructor() {
        super();

        this.onModalEntered = this.onModalEntered.bind(this);
        this.handleDetailsClick = this.handleDetailsClick.bind(this)


    }

    onModalEntered(){

    }

    handleDetailsClick(){
        this.props.onDetailsClick(this.props.orderId)
    }

    render() {

        return (

            <div className="row order-bar-container">
                <span className="vcenter col-3" >{this.props.orderName}</span>
                <span
                    className={
                        this.props.orderStatus === 'open' ?
                        "vcenter col-2 h3 badge badge-success": "vcenter col-2 h3 badge badge-dark"}
                >{this.props.orderStatus}</span>
                <span className="vcenter col-4">{this.props.dateCreated}</span>
                <span className="vcenter col-3">
                    <button className="btn btn-info btn-space"
                            onClick={this.handleDetailsClick }>Details</button>
                    <button className="btn btn-danger btn-space">Delete</button>
                </span>


            </div>
        );
    }

}

export default OrderBar;
