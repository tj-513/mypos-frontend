import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './OrdreBar.css'
import OrderModal from '../order_modal/order_modal';

class OrderBar extends React.Component {
    constructor() {
        super();
        this.state ={ modalShow: false };

    }

    render() {

        let modalClose = () => this.setState({ modalShow: false });

        return (


            <div className="row order-bar-container">
                <span className="vcenter col" >{this.props.orderName}</span>
                <span className="vcenter col h3 badge badge-success">{this.props.orderStatus}</span>
                <span className="vcenter col">{this.props.dateCreated}</span>
                <span className="vcenter col">
                    <button className="btn btn-info btn-space"
                            onClick={() => this.setState({modalShow: true})}>Details</button>
                    <button className="btn btn-danger btn-space">Delete</button>
                </span>



                <OrderModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                />
            </div>
        );
    }

}

export default OrderBar;
