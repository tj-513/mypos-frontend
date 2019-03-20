import React from 'react'
import {NotificationManager} from 'react-notifications';
import './order-item.css'
import 'react-confirm-alert/src/react-confirm-alert.css';

import {MdSave, MdRemoveCircle} from "react-icons/md";

class OrderItem extends React.Component {

    initialQuantity = 0;

    constructor(props) {
        super(props);

        this.state = {
            deleteConfirmation: false,
            quantityChanged: false,
            itemQuantity: 0
        };
        this.initialQuantity = props.quantity;
        this.onQuantityChange = this.onQuantityChange.bind(this)
        this.doSaveQuantity = this.doSaveQuantity.bind(this)
        this.doDeleteOrderItem = this.doDeleteOrderItem.bind(this)

    }

    componentDidMount() {
        this.setState({itemQuantity: this.props.quantity})
    }

    onQuantityChange(event) {
        this.setState(
            {
                itemQuantity: event.target.value,
                quantityChanged: true,
                deleteConfirmation: false
            });
        this.props.onQuantityChanged(this.props.itemId, parseInt(event.target.value));
    }


    doDeleteOrderItem() {

        let user = JSON.parse(localStorage.getItem("user"));
        let newOrderItem =
            {
                "itemId": this.props.itemId,
                "orderId": this.props.orderId,
                "quantity": this.state.itemQuantity,
                "userId": user.id
            };

        fetch('http://localhost:8090/api/orders/deleteOrderItem', {
            method: 'DELETE',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newOrderItem)
        }).then(response => response.json()
            .then(data => {
                if (response.ok) {
                    NotificationManager.success( `Deleted Order Item  {${data.item.itemName}}`, 'Success',3000);
                    this.props.onOrderItemDeleted(data.itemId);
                } else {
                    NotificationManager.error( data.message,'Error', 3000);
                }
            }))
            .catch((e) => {
                console.log('order-item', e);
                NotificationManager.error( "Order Item Delete Failed",'Error', 3000);

            })
    }

    doSaveQuantity() {

        let user = JSON.parse(localStorage.getItem("user"));
        let newOrderItem =
            {
                "itemId": this.props.itemId,
                "orderId": this.props.orderId,
                "quantity": this.state.itemQuantity,
                "userId": user.id
            };

        fetch('http://localhost:8090/api/orders/changeItemQuantity', {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newOrderItem)
        }).then(response => response.json()
            .then(data => {
                if (response.ok) {
                    NotificationManager.success( `Updated Order Item  {${data.item.itemName}} `,'Success', 3000);
                    this.setState({quantityChanged: false});
                    this.props.onQuantityChanged(data.itemId, data.quantity);
                } else {
                    NotificationManager.error( data.message,'Error', 3000);
                }
            }))
            .catch(() => {
                NotificationManager.error("Order Item Update Failed", 'Error', 3000);
            })

    }

    render() {

        return (
            <div>
                {
                    this.state.deleteConfirmation ?

// on delete confirmation ++++++++++++++++++++++++++++++
                        <div className="pl-3 pr-3 pt-1 pb-1 m-1 border rounded" style={{backgroundColor: '#ffc2b3'}}>
                            <div className="row text-center vcenter ">
                                <span className="col-2 border-right"> {this.props.itemName} </span>
                                <span className="col-4 text-left"> Are you sure ?</span>
                                <span className="col-6 btn-toolbar">
                        <button className="col-5 mr-1 btn btn-danger btn-lg p-1 "
                                onClick={this.doDeleteOrderItem}> Delete
                        </button>
                        <button className="col-5 ml-1 btn btn-primary btn-lg p-1  "
                                onClick={() => this.setState({deleteConfirmation: false})}> Keep
                        </button>
                        </span>
                            </div>
                        </div>


                        :
// on item display +++++++++++++++++++++++++++++++++++
                        <div className="pl-3 pr-3 pt-1 pb-1 m-1 border rounded bg-order-item">

                            <div className="row text-center vcenter ">
                                <span className="col-2"> {this.props.itemName} </span>
                                <span className={`col-2 ${this.props.orderClosed}`}> {this.props.unitPrice.toFixed(2)}$ </span>


                                <span className="col-2">
                                <input type="number"
                                       min={0}
                                       max={Math.max(this.props.amountAvailable, this.initialQuantity)}
                                       className="form-control text-center"
                                       defaultValue={this.props.quantity}
                                       onChange={this.onQuantityChange}
                                />

                            </span>


                                <span className="col-3 h5">
                                {(this.props.unitPrice * this.state.itemQuantity).toFixed(2)}$
                            </span>
                                <span className="col-3">
                                 <button type="button"
                                         className={`col-6 btn btn-primary btn-sm`}
                                         disabled={!this.state.quantityChanged || (this.props.quantity === this.initialQuantity)}
                                         onClick={this.doSaveQuantity}
                                 >
                                    <MdSave/>
                                 </button>

                                <button type="button"
                                        className="col-6 btn btn-danger btn-sm"
                                        onClick={() => this.setState({deleteConfirmation: true})}>
                                    <MdRemoveCircle/>
                                 </button>

                            </span>
                            </div>
                        </div>
                }
            </div>
        )

    }

}

export default OrderItem;