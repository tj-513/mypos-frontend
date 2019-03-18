import {confirmAlert} from 'react-confirm-alert';
import React from 'react'
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
        this.props.onQuantityChanged(this.props.itemId, parseInt(event.target.value) );
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
                    this.props.addNotification(true, "Order Item Successfully Deleted");
                    this.props.onOrderItemDeleted(data.itemId);
                } else {
                    this.props.addNotification(false, data.message);
                }
            }))
            .catch((e) => {
                console.log('order-item', e);
                this.props.addNotification(false, "Order Item Update Failed")
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
                    this.props.addNotification(true, "Order Item Successfully Updated");
                    this.setState({quantityChanged: false});
                    this.props.onQuantityChanged(data.itemId, data.quantity);
                } else {
                    this.props.addNotification(false, data.message);
                }
            }))
            .catch(() => {
                this.props.addNotification(false, "Order Item Update Failed")
            })

    }

    render() {

        return (
            <div className="pl-3 pr-3 pt-1 pb-1 m-1 border rounded bg-order-item">

                {this.state.deleteConfirmation ?
                    <div className="row text-center vcenter " style={{bgColor: 'beige'}}>
                        <span className="col-6 text-left"> Are you sure want to delete this item ?</span>
                        <span className="col-6 btn-toolbar">
                        <button className="col-5 mr-1 btn btn-danger btn-lg p-1 "
                                onClick={this.doDeleteOrderItem}> Delete
                        </button>
                        <button className="col-5 ml-1 btn btn-primary btn-lg p-1  "
                                onClick={() => this.setState({deleteConfirmation: false})}> Keep
                        </button>
                        </span>
                    </div>


                    :
                    <div className="row text-center vcenter ">
                        <span className="col-2"> {this.props.itemName} </span>
                        <span className="col-2"> {this.props.unitPrice.toFixed(2)}$ </span>


                        <span className="col-2">
                        <input type="number"
                               min={0}
                               max={Math.max(this.props.amountAvailable, this.initialQuantity)}
                               className="form-control text-center"
                               defaultValue={this.props.quantity}
                               onChange={this.onQuantityChange}
                        />

                </span>


                        <span
                            className="col-3 h5"> {(this.props.unitPrice * this.state.itemQuantity).toFixed(2)}$ </span>
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
                }
            </div>
        )

    }

}

export default OrderItem;