import React from 'react'
import './order-item.css'
import { MdEdit,MdRemoveCircle } from "react-icons/md";

class OrderItem extends React.Component {

    render() {

        return (
            <div className="pl-3 pr-3 pt-1 pb-1 m-1 border rounded bg-order-item">
                <div className="row text-center vcenter ">
                    <span className="col-2"> Item Name </span>
                    <span className="col-1"> 10$ </span>
                    <span className="col-2"><input type="number" className="form-control" defaultValue="5"/>  </span>
                    <span className="col-3 h5"> 50$ </span>
                    <span className="col-4">
                     <button type="button" className="col-6 btn btn-info btn-sm">
                        <MdEdit />
                    </button>

                    <button type="button" className="col-6 btn btn-danger btn-sm">
                        <MdRemoveCircle />
                    </button>

                </span>
                </div>
            </div>
        );
    }

}

export default OrderItem;