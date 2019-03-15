import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import 'bootstrap/dist/css/bootstrap.min.css'
import OrderItem from "./order-item";

class OrderModal extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
            >
                <Modal.Header closeLabel="Close" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Order Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-inline p-2">
                        <label htmlFor="orderName" className="control-label col-2"> Order Name </label>
                        <input name="orderName" className="form-control col-6" type="text" disabled={true} value="Name" />
                        <button className="col-3 ml-3 btn btn-primary" variant="primary" > Create </button>
                    </div>
                    <div>
                        <div className="container border border-primary p-2 rounded">
                            <div className="p-1 h5">Add Item</div>
                            <div>
                                <div className="row p-2 pl-3 pr-3">
                                    <input placeholder="Type item name here.." className="form-control col-7 pl-2 pr-2" ref="itemName" type="text"/>
                                    <span className="col-1 vcenter">X</span>
                                    <input placeholder="Quantity" className="form-control col-4 pl-2 pr-2" ref="itemName" type="number" min="1" max="100"/>

                                </div>
                                <div className="row pl-3 pr-3 pt-1 pb-1">
                                    <span className="col-3 small p-1"> Available : <span className="h5">100</span></span>
                                    <span className="col-3 small p-1"> Unit Price: <span className="h5">50$</span></span>
                                    <span className="col-3 small p-1"> Total: <span className="h4">500$</span></span>
                                    <Button className="col-3 h5 pl-1 push-right" > Add Item</Button>
                                </div>
                            </div>
                        </div>

                        {/* order details start here*/}
                        <div className="container border border-primary p-2 mt-1 rounded">
                            <div className="p-1 h5">Order Items</div>
                            <div>

                                {/* table header */}
                                <div className="pl-3 pr-3 pt-1 pb-1 m-1 border rounded bg-order-item-header">
                                    <div className="row text-center vcenter small">
                                        <span className="col-2"> Item </span>
                                        <span className="col-1"> Unit Price </span>
                                        <span className="col-2">Quantity</span>
                                        <span className="col-3 h5"> Total </span>
                                        <span className="col-4"> Actions</span>
                                    </div>

                                </div>

                                {/* items */}
                                <OrderItem />
                                <OrderItem />


                                {/* summation*/}
                                <div className="pl-3 pr-3 pt-1 pb-1 m-1 border rounded bg-order-item-header">
                                    <div className="row text-center vcenter ">
                                        <span className="col-3 h4"> Total </span>
                                        <span className="col-2 h4"> 100$ </span>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <span style={{float : 'left', paddingLeft : '5px'}}> Order Status : <span className="text-success h3" >Open</span> </span>
                    <Button variant="danger" onClick={this.props.onHide}>{(()=>{
                        let x = true;
                        if(x) return "close order"
                        else return "reopen order"
                    })()}</Button>
                    <Button variant="dark"  onClick={this.props.onHide}>Close Window</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default OrderModal;