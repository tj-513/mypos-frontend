import Autosuggest from 'react-autosuggest';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OrderItem from "./order-item";
import {NotificationManager} from 'react-notifications';
import React from 'react'
import './order-modal.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class OrderModal extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            itemSuggestions: [],
            itemValue: '',
            modalMode: '',
            newItem: {},
            newItemQuantity: 0,
            newItemSelected: false,
            orderId: 0,
            orderItems: [],
            orderName: '',
            orderStatus: 'open'
        };

        this.doLoadOrderItems = this.doLoadOrderItems.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.doAddOrderItem = this.doAddOrderItem.bind(this);
        this.onQuantityChanged = this.onQuantityChanged.bind(this);
        this.onOrderItemDeleted = this.onOrderItemDeleted.bind(this);
        this.doGetOrderDetails = this.doGetOrderDetails.bind(this);
        this.doCloseOrder = this.doCloseOrder.bind(this);
        this.doRenameOrder = this.doRenameOrder.bind(this);
        this.doRenameOrder = this.doRenameOrder.bind(this);

    }


    componentDidMount() {
        this.setState(
            {
                modalMode: this.props.mode,
                orderId: this.props.orderId,
                orderStatus: this.props.orderStatus
            });
        if (this.props.mode === 'edit') {
            this.doGetOrderDetails();
            this.doLoadOrderItems();
        }

    }


    /** Order Item Child Callbacks*/
    onQuantityChanged(itemId, quantity) {

        this.setState(prevState => {
            let existing = prevState.orderItems.find(
                item => item.itemId === itemId
            );

            if (existing) {
                existing.quantity = quantity;
            }
            return prevState;
        });

    }

    onOrderItemDeleted(itemId) {

        let orderItemRemoved = [...this.state.orderItems].filter(orderItem => orderItem.itemId !== itemId);
        this.setState({orderItems: orderItemRemoved});
    }


    /** Start Network calls */
    doGetOrderDetails() {
        let orderId = this.props.orderId;

        fetch(`http://localhost:8090/api/orders/${orderId}`, {
            method: 'GET',
        }).then(response => response.json()
            .then(data => {
                if (response.ok) {
                    console.log('order data', data);
                    this.setState(
                        {
                            orderName: data.orderName,
                            orderStatus: data.orderStatus
                        });
                    console.log(this.state)
                } else {
                    NotificationManager.error(data.message, 'Error');
                }
            }))
            .catch(e => {
                NotificationManager.error("Order Items Retrieval Failed", 'Error');
            })
    }

    doLoadOrderItems() {
        let orderId = this.props.orderId;

        fetch(`http://localhost:8090//api/orders/items/${orderId}`, {
            method: 'GET',
        }).then(response => response.json()
            .then(data => {
                if (response.ok) {
                    this.setState({orderItems: data})
                } else {
                    NotificationManager.error(data.message, 'Error');
                }
            }))
            .catch(e => {
                NotificationManager.error("Order Items Retrieval Failed", 'Error');
            })
    }

    doCreateOrder() {
        let user = JSON.parse(localStorage.getItem("user"));
        let newOrder = {
            "orderName": this.refs.orderName.value,
            "userId": user.id
        };

        fetch('http://localhost:8090/api/orders', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newOrder)
        }).then(response => response.json()
            .then(data => {
                if (response.status === 201) {
                    this.setState({modalMode: 'edit', orderStatus: 'open', orderId: data.id});
                    this.setState(data);
                    this.props.onNewOrderAdded(data);
                    NotificationManager.success(` Created Order {${data.orderName}}`, 'Success');
                } else {
                    NotificationManager.error(data.message, 'Error');
                }
            }))
            .catch((e) => {
                console.log(e);
                NotificationManager.error('Order Creation Failed', 'Error');

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
                if (response.ok) {
                    this.setState(previousState => {
                        previousState.orderItems.push(data);
                        previousState.newItemSelected = false;
                        previousState.newItemQuantity = 0;
                        return previousState;
                    });
                    console.log('add success', this)

                    this.state.itemValue = ''; // this will be set as text in suggest box
                    this.refs.autosuggestItemName.input.focus();

                    NotificationManager.success(`Added Order Item {${data.item.itemName}}`, 'Success');
                } else {
                    NotificationManager.error(data.message, 'Error');
                }
            }))
            .catch((e) => {
                console.log(e);
                NotificationManager.error('Order Item Adding Failed', 'Error');
            })

    }

    doCloseOrder() {
        let newOrder =
            {
                "id": this.state.orderId,
                "orderStatus": 'closed',
                "orderName": this.refs.orderName.value,

            };

        fetch('http://localhost:8090/api/orders', {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newOrder)
        }).then(response => response.json()
            .then(data => {
                if (response.ok) {
                    this.setState({
                        orderStatus: data.orderStatus,
                        orderName: data.orderName
                    });
                    this.props.onOrderUpdated(data);
                    NotificationManager.success('Order Successfully Closed', 'Success');
                } else {
                    NotificationManager.error(data.message, 'Error');
                }
            }))
            .catch((e) => {
                console.log(e);
                NotificationManager.error('Order Item Adding Failed', 'Error');
            })
    }

    doRenameOrder() {

        let newOrder =
            {
                "id": this.state.orderId,
                "orderStatus": this.state.orderStatus,
                "orderName": this.refs.orderName.value,

            };

        fetch('http://localhost:8090/api/orders', {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newOrder)
        }).then(response => response.json()
            .then(data => {
                if (response.ok) {
                    this.setState({
                        orderStatus: data.orderStatus,
                        orderName: data.orderName
                    });
                    this.props.onOrderUpdated(data);
                    NotificationManager.success('Order Successfully Updated', 'Success');
                } else {
                    NotificationManager.error(data.message, 'Error');
                }
            }))
            .catch((e) => {
                console.log(e);
                NotificationManager.error('Order Item Adding Failed', 'Error');
            })

    }

    /** End Network calls */


    /** Start Autosuggest callbacks */
    getSuggestionValue = suggestion => suggestion.itemName;

    renderSuggestion = suggestion => (
        <span>
            {suggestion.itemName}
        </span>
    );

    onSuggestionsFetchRequested(value) {
        fetch(`http://localhost:8090/api/items/search/${value.value}`)
            .then(response => response.json())
            .then(data => {
                const itemIds = this.state.orderItems.map(orderItem => orderItem.itemId);
                const filteredSuggestions = data.filter(item => !(itemIds.includes(item.id)))
                this.setState({itemSuggestions: filteredSuggestions})
            })
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            itemSuggestions: []
        });
    };

    onChange = (event, {newValue}) => {
        this.setState({itemValue: newValue});
    };

    onSuggestionSelected = (event, {suggestion}) => {
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
        let defaultOrderName = `${username}-${now.getFullYear()}${now.getMonth()}${now.getDate()}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

        const value = this.state.itemValue;
        const suggestions = this.state.itemSuggestions;

        const inputProps = {
            placeholder: 'Type item name',
            value,
            onChange: this.onChange
        };

        // calculates sum of all orders in this list
        let sum = this.state.orderItems.reduce((a, b) => a + (b.item.unitPrice * b.quantity), 0);

        return (


            <Modal
                onHide={this.props.onHide}
                show={this.props.show}
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
                        <input
                            defaultValue={this.state.modalMode === 'create' ? defaultOrderName : this.state.orderName}
                            className="form-control col-6"
                            type="text"
                            disabled={this.state.orderStatus === 'closed'}
                            ref="orderName"
                            placeholder='Name...'/>

                        <button className="col-3 ml-3 btn btn-primary"
                                onClick={
                                    () => this.state.modalMode === 'create' ? this.doCreateOrder() : this.doRenameOrder()
                                }
                        >
                            {
                                this.state.modalMode === 'create' ? 'Create' : 'Save'
                            }
                        </button>
                    </div>


                    <div>
                        <div style={
                            this.state.modalMode === 'create' || this.state.orderStatus === 'closed'
                                ? {display: 'none'} : {}}
                             className="container border border-primary p-2 rounded">
                            <div className="p-1 h5">Add Item</div>
                            <div>
                                <div className="row p-2 pl-3 pr-3">

                                    <div className="col-7">
                                        <Autosuggest
                                            ref='autosuggestItemName'
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
                                           type="number"
                                           disabled={!this.state.newItemSelected}
                                           value={this.state.newItemQuantity}
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
                                            disabled={this.state.newItemQuantity == 0}
                                            onClick={this.doAddOrderItem}
                                    > Add Item
                                    </button>
                                </div>

                                }
                            </div>
                        </div>

                        {/* order details start here*/}
{/** Start Conditional Here */}
                        {this.state.orderItems.length === 0 && this.state.modalMode !== 'create'?
                            <div className="container border border-primary p-2 mt-1 rounded">
                                No Items Added Yet...
                            </div>
                            :


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
                                                amountAvailable={orderItem.item.amountAvailable}
                                                quantity={orderItem.quantity}
                                                orderId={orderItem.orderId}
                                                itemId={orderItem.itemId}
                                                onQuantityChanged={this.onQuantityChanged}
                                                onOrderItemDeleted={this.onOrderItemDeleted}
                                            />
                                        ))
                                    }


                                    {/* summation*/}
                                    <div className="pl-3 pr-3 pt-1 pb-1 m-1 border rounded bg-order-item-header">
                                        <div className="row text-center vcenter ">
                                            <span className="col-3 h4"> Total </span>
                                            <span className="col-2 h4"> {sum.toFixed(2)}$ </span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        }
{/** end conditional here */}
                    </div>


                </Modal.Body>
                <Modal.Footer style={this.state.modalMode === 'create' ? {display: 'none'} : {}}>
                    <span>
                        <span className="mr-5">
                            Order Status :
                            <span
                                className={`${this.state.orderStatus === 'open' ? 'text-success' : 'text-danger'}
                                h3 pr-5 pl-5`}>{this.state.orderStatus}
                            </span>
                        </span>
                    </span>

                    {this.state.orderStatus === 'open' &&
                    <Button
                        variant="danger" onClick={this.doCloseOrder}>
                        {'Close Order'}
                    </Button>
                    }
                    <span className="ml-3"> </span>
                    <Button
                        variant="dark" onClick={this.props.onHide}>
                        {'<-- Go Back'}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default OrderModal;