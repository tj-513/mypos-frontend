import React from 'react'
import './order-item.css'
import {MdSave, MdRemoveCircle} from "react-icons/md";

class OrderItem extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            quantityChanged: false,
            itemQuantity: 0
        };

        this.onQuantityChange = this.onQuantityChange.bind(this)
        this.doSaveQuantity = this.doSaveQuantity.bind(this)

    }

    componentDidMount() {
        this.setState({itemQuantity: this.props.quantity})
    }

    onQuantityChange(event) {
        this.setState(
            {
                itemQuantity: event.target.value,
                quantityChanged: true
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
                    this.setState({quantityChanged:false});
                    this.props.onQuantityChanged(data);
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
                <div className="row text-center vcenter ">
                    <span className="col-2"> {this.props.itemName} </span>
                    <span className="col-2"> {this.props.unitPrice.toFixed(2)}$ </span>


                    <span className="col-2">
                        <input type="number"
                               min ={0}
                               max = {this.props.amountAvailable}
                               className="form-control text-center"
                               defaultValue={this.props.quantity}
                               onChange={this.onQuantityChange}
                        />

                </span>


                    <span className="col-3 h5"> {(this.props.unitPrice * this.state.itemQuantity).toFixed(2)}$ </span>
                    <span className="col-3">
                     <button type="button"
                             className={`col-6 btn btn-primary btn-sm`}
                             disabled={!this.state.quantityChanged}
                             onClick={this.doSaveQuantity}
                     >
                        <MdSave/>
                    </button>

                    <button type="button" className="col-6 btn btn-danger btn-sm">
                        <MdRemoveCircle/>
                    </button>

                </span>
                </div>
            </div>
        )

    }

}

export default OrderItem;