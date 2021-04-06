import React, { Component } from 'react';
import {connect} from 'react-redux'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../store/actions/order';
import {Redirect} from 'react-router-dom'


class Orders extends Component {
    
    //put in token, userId from localStorage

    componentDidMount() {
        this.props.fetchOrderStart(localStorage.token, localStorage.userId);
    }

    render () {
        let compReturn = (
            <div>
                {this.props.orders.map(order => (
                    
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                        name={order.orderData.name}
                        street={order.orderData.street}
                        zip={order.orderData.zipCode}
                        country={order.orderData.country}
                        email={order.orderData.email}
                        delivery={order.orderData.deliveryMethod} />
                        //Name, street, zip, country, email, delivery method
                ))}
            </div>
        )

        if(!localStorage.token){
            compReturn = <Redirect to="/auth" />
        }

        return (
            <div>            
                {compReturn}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrderStart: (token, userId) => dispatch(orderActions.fetchOrderStart(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));