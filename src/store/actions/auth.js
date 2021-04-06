import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {


    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        localId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');   
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {


    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime);
        //expiration time is in milliseconds, set timeout in seconds?
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPoFp7Fwi95xCCUm2n50xcJE-J_rCgE-U'
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPoFp7Fwi95xCCUm2n50xcJE-J_rCgE-U'
        }
        axios.post(url, authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + parseInt(res.data.expiresIn) * 1000)
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(parseInt(res.data.expiresIn * 1000)))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })

    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout(expirationDate- new Date()))
            } else {
                dispatch(logout());
            }
        }
    }
}