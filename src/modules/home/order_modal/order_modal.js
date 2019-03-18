import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import OrderItem from "./order-item";
import Autosuggest from 'react-autosuggest';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import './order-modal.css';
import OrderBar from "../home";

class OrderModal extends React.Component {


    constructor() {
        super()
        this.state = {
            modalMode: 'create',
            orderStatus: 'open',
            orderItems: [],
            itemSuggestions: [],
            itemValue: '',
            newItemSelected: false,
            newItemQuantity: 0,
            newItem: {},
            orderId: 0
        };

        console.log(this.props)
        this.addNotification = this.addNotification.bind(this);
        this.loadOrderDetails = this.loadOrderDetails.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.doAddOrderItem = this.doAddOrderItem.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    quantity

    componentDidMount() {
        console.log('om', this.props)
        this.setState(
            {
                modalMode: this.props.mode,
                orderId: this.props.orderId
            });
        if (this.props.mode === 'edit') this.loadOrderDetails();

    }




    addNotification(success, message) {

        let title = success ? "Success" : "Error"
        let type = success ? "success" : "danger"

        this.notificationDOMRef.current.addNotification({
            title,
            message,
            type,
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {duration: 3000},
            dismissable: {click: true}
        });
    }


    /** Start Network callbacks */


    loadOrderDetails() {
        let orderId = this.props.orderId

        fetch(`http://localhost:8090//api/orders/items/${orderId}`, {
            method: 'GET',
        }).then(response => response.json()
            .then(data => {
                if (response.ok) {
                    console.log('Orders Items retrieval Success:', data)
                    this.setState({orderItems: data})
                } else {
                    this.addNotification(false, "Order Items Retrieval Failed");
                    console.log('Order retrieval failed', data)
                }
            }))
            .catch(e => {
                this.addNotification(false, "Order Items Retrieval Failed");
                console.log('error occurred', e)
            })
    }

    doCreateOrder() {
        let user = JSON.parse(localStorage.getItem("user"))
        let newOrder = {
            "orderName": this.refs.orderName.value,
            "userId": user.id
        }

        fetch('http://localhost:8090/api/orders', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newOrder)
        }).then(response => response.json()
            .then(data => {
                if (response.status === 201) {
                    this.setState({modalMode: 'edit', orderStatus: 'open', orderId:data.id})
                    this.addNotification(true, "Order Successfully Created")
                } else {
                    this.addNotification(false, "Order Creation Failed")
                }
            }))
            .catch(response => {
                // this.setState({loginMessage: data.message})
                this.addNotification(false, "Order Creation Failed")
            })

    }

    doAddOrderItem() {
        let user = JSON.parse(localStorage.getItem("user"));
        let newOrderItem =
            {
                "itemId": this.state.newItem.id,
                "orderId": this.state.orderId,
                "quantity": this.state.newItemQuantity,
                "userId": user.id
            };

        fetch('http://localhost:8090/api/orders/addItem', {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newOrderItem)
        }).then(response => response.json()
            .then(data => {
                console.log('Created-Order-Item', data)
                if (response.ok) {
                    this.setState(previousState => previousState.orderItems.push(data));
                    this.addNotification(true, "Order Item Successfully added");
                } else {
                    this.addNotification(false, data.message);
                }
            }))
            .catch(response => {
                this.addNotification(false, "Order Item Adding Failed")
            })

    }
    /** End Autosuggest callbacks */



    /** Start Autosuggest callbacks */
    getSuggestionValue = suggestion => suggestion.itemName;

    renderSuggestion = suggestion => (
        <span>
            {suggestion.itemName}
        </span>
    );

    onSuggestionsFetchRequested(value) {
        console.log(value);
        fetch(`http://localhost:8090/api/items/search/${value.value}`)
            .then(response => response.json())
            .then(data => this.setState({itemSuggestions: data}))
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            itemSuggestions: []
        });
    };

    onChange = (event, {newValue, method}) => {
        this.setState({itemValue: newValue});
    }

    onSuggestionSelected = (event, {suggestion}) => {
        console.log('selected ', suggestion)
        this.setState({
                newItemSelected: true,
                newItem: suggestion
            }
        );
    };

    /** End Autosuggest callbacks */


    render() {
        let username = JSON.parse(localStorage.getItem("user")).username;
        let now = new Date(Date.now());
        let defaultOrderName = `${username}-${now.getFullYear()}${now.getMonth()}${now.getDate()}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`

        const value = this.state.itemValue;
        const suggestions = this.state.itemSuggestions;

        const inputProps = {
            placeholder: 'Type item name',
            value,
            onChange: this.onChange
        };

        return (
            <Modal
                onHide={this.props.onHide}
                show={this.props.show}
                size="lg"
            >
                <ReactNotification ref={this.notificationDOMRef}/>

                <Modal.Header closeLabel="Close" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Order Details
                    </Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="form-inline p-2">
                        <label htmlFor="orderName" className="control-label col-2"> Order Name </label>
                        <input name="orderName"
                               defaultValue={this.state.modalMode === 'create' ? defaultOrderName : 'val'}
                               className="form-control col-6"
                               type="text"
                               disabled={false}
                               ref="orderName"
                               placeholder='Name...'/>
                        <button className="col-3 ml-3 btn btn-primary"
                                onClick={
                                    () => this.state.modalMode === 'create' ? this.doCreateOrder() : null
                                }
                        >
                            {
                                this.state.modalMode === 'create' ? 'Create' : 'Edit'
                            }
                        </button>
                    </div>


                    <div>
                        <div style={
                            this.state.modalMode === 'create' ? {display: 'none'} : {}}
                             className="container border border-primary p-2 rounded">
                            <div className="p-1 h5">Add Item</div>
                            <div>
                                <div className="row p-2 pl-3 pr-3">

                                    <div className="col-7">
                                        <Autosuggest
                                            suggestions={suggestions}
                                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                            getSuggestionValue={this.getSuggestionValue}
                                            renderSuggestion={this.renderSuggestion}
                                            onSuggestionSelected={this.onSuggestionSelected}
                                            inputProps={inputProps}
                                        />
                                    </div>


                                    <span className="col-1 vcenter">X</span>
                                    <input placeholder="Quantity" className="form-control col-4 pl-2 pr-2"
                                           type="number" defaultValue={0}
                                           onChange={(event) => {
                                               this.setState({newItemQuantity: event.target.value})
                                           }}
                                           min={0}
                                           max={this.state.newItem.amountAvailable}
                                    />

                                </div>
                                {this.state.newItemSelected &&
                                <div className="row pl-3 pr-3 pt-1 pb-1">
                                    <span className="col-3 small p-1"> Available : <span
                                        className="h5">{this.state.newItem.amountAvailable}</span></span>
                                    <span className="col-3 small p-1"> Unit Price: <span
                                        className="h5">{this.state.newItem.unitPrice}$</span></span>
                                    <span className="col-3 small p-1"> Total: <span
                                        className="h4">{
                                        (this.state.newItem.unitPrice * this.state.newItemQuantity).toFixed(2)
                                    }$</span></span>
                                    <button className="col-3 h5 pl-1 push-right btn btn-primary"
                                            onClick={this.doAddOrderItem}
                                    > Add Item
                                    </button>
                                </div>

                                }
                            </div>
                        </div>

                        {/* order details start here*/}
                        <div className="container border border-primary p-2 mt-1 rounded"

                             style={
                                 this.state.modalMode === 'create' || this.state.orderItems.length === 0
                                     ? {display: 'none'} : {}}
                        >
                            <div className="p-1 h5">Order Items</div>
                            <div>

                                {/* table header */}
                                <div className="pl-3 pr-3 pt-1 pb-1 m-1 border rounded bg-order-item-header">
                                    <div className="row text-center vcenter  enter small">
                                        <span className="col-2"> Item </span>
                                        <span className="col-1"> Unit Price </span>
                                        <span className="col-3">Quantity</span>
                                        <span className="col-3 h5"> Total </span>
                                        <span className="col-3"> Actions</span>
                                    </div>

                                </div>

                                {/* items */}

                                {
                                    this.state.orderItems.map((orderItem) => (
                                        <OrderItem
                                            key={`${orderItem.itemId}${orderItem.orderId}`}
                                            itemName={orderItem.item.itemName}
                                            unitPrice={orderItem.item.unitPrice}
                                            quantity={orderItem.quantity}
                                            orderId={orderItem.orderId}
                                            itemId={orderItem.itemId}
                                        />
                                    ))
                                }


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
                    <span style={this.state.modalMode === 'create' ? {display: 'none'} : {}}>
                        <span style={{float: 'left', paddingLeft: '5px'}}>
                            Order Status : <span className="text-success h3">Open</span>
                        </span>
                    </span>
                    <Button
                        style={this.state.modalMode === 'create' ? {display: 'none'} : {}}
                        variant="danger" onClick={this.props.onHide}>{(() => {
                        let x = true;
                        if (x) return "close order"
                        else return "reopen order"
                    })()}</Button>
                    <Button variant="dark" onClick={this.props.onHide}>Close Window</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default OrderModal;