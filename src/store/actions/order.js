import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const purchaseStart = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseInit())
        axios.post( '/orders.json?auth='+token, orderData )
            .then( response => {
                dispatch(purchaseSuccess(response.data.name, orderData))
            } )
            .catch( error => {
                dispatch(purchaseFail(error))
            } );
    }
}

export const fetchOrderInit = () => {
    return {
        type: actionTypes.FETCH_ORDER_INIT
    };
};

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    };
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    };
};

export const fetchOrderStart = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderInit())
        axios.get('/orders.json?auth=' + token)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    if(userId === res.data[key].userId){
                        fetchedOrders.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrderFail(err))
            });
    }
}