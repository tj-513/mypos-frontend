import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './OrdreBar.css'
import OrderModal from '../order_modal/order_modal';

class OrderBar extends React.Component {
    constructor() {
        super();

        this.onModalEntered = this.onModalEntered.bind(this)

        this.state ={
            modalShow: false,
            modal_mode: 'create',
            modal_order_id: null
        };


    }

    onModalEntered(){

        let user = localStorage.getItem("user")
        user = JSON.parse(user)
        console.log(user)
        
    }

    render() {

        let modalClose = () => this.setState({ modalShow: false });

        return (


            <div className="row order-bar-container">
                <span className="vcenter col" >{this.props.orderName}</span>
                <span
                    className={
                        this.props.orderStatus === 'open' ?
                        "vcenter col h3 badge badge-success": "vcenter col h3 badge badge-dark"}
                >{this.props.orderStatus}</span>
                <span className="vcenter col">{this.props.dateCreated}</span>
                <span className="vcenter col">
                    <button className="btn btn-info btn-space"
                            onClick={() => this.setState({modalShow: true})}>Details</button>
                    <button className="btn btn-danger btn-space">Delete</button>
                </span>



                <OrderModal
                    onEntered = {(data)=>console.log('onentered',data)}
                    mode={this.state.modal_mode}
                    show={this.state.modalShow}
                    onHide={modalClose}
                />
            </div>
        );
    }

}

export default OrderBar;
