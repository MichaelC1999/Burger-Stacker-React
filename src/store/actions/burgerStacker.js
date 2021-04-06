import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const addIngredient = (ing) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ing
    }
}

export const removeIngredient = (ing) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ing
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get( 'https://burger-stacker.firebaseio.com/Ingredients.json' )
            .then( response => {
                dispatch(setIngredients(response.data))
            } )
            .catch( error => {
                dispatch(fetchIngFail());
            } );
    }
};

export const fetchIngFail = () => {
    return {
        type: actionTypes.FETCH_ING_FAIL
    }
}