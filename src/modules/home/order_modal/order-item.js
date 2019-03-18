import React from 'react'
import './order-item.css'
import {MdSave, MdRemoveCircle} from "react-icons/md";

class OrderItem extends React.Component {


    constructor() {
        super();

        this.state = {
            quantityChanged: false,
            itemQuantity: 0
        }

        this.onQuantityChange = this.onQuantityChange.bind(this)

    }

    componentDidMount() {
        this.setState({itemQuantity: this.props.quantity})
    }

    onQuantityChange(event){
        console.log(this.state)
        this.setState(
            {
                itemQuantity: event.target.value,
                quantityChanged: true
            })
    }

    onOrderItemSave(){

    }

    render() {

        console.log('order-item', this.props);
        return (
            <div className="pl-3 pr-3 pt-1 pb-1 m-1 border rounded bg-order-item">
                <div className="row text-center vcenter ">
                    <span className="col-2"> {this.props.itemName} </span>
                    <span className="col-2"> {this.props.unitPrice.toFixed(2)}$ </span>


                    <span className="col-2">
                        <input type="number" className="form-control text-center" defaultValue={this.props.quantity}
                               onChange={this.onQuantityChange}
                        />

                </span>


                    <span className="col-3 h5"> {(this.props.unitPrice * this.state.itemQuantity).toFixed(2)}$ </span>
                    <span className="col-3">
                     <button type="button"
                             className={`col-6 btn btn-primary btn-sm`}
                             disabled={!this.state.quantityChanged}
                             onClick={this.onOrderItemSave}
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
            ;
    }

}

export default OrderItem;