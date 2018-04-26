import axios from 'axios';

const initialState = {
    user: {},
    cart: []
}

const GET_USER_INFO = "GET_USER_INFO"
const GET_CART = "GET_CART"
const ADD_TO_CART = "ADD_TO_CART"
const DELETE_FROM_CART = "DELETE_FROM_CART"

export function getUser(){
    let userData = axios.get('/auth/me').then( res => {
        return res.data;
    })
    return{
        type: GET_USER_INFO,
        payload: userData
    }
}

export function getCart(){
    let userCart = axios.get('/api/cart/').then( res => {
        return res.data;
    })
    return{
        type: GET_CART,
        payload: userCart
    }
}

export function addToCart(name, picture, price){
    let addCart = axios.post('/api/show', {name, picture, price}).then( res => {
        // console.log(res.data)
        return res.data;
    })
    return{
        type: ADD_TO_CART,
        payload: addCart
    }
}

export function deleteShow(id){
    console.log(id)
    let deleteShow = axios.delete(`/api/show/${id}`).then( res => {
        return res.data;
    })
    return{
        type: DELETE_FROM_CART,
        payload: deleteShow
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign( {}, state, {user: action.payload})
        case GET_CART + '_FULFILLED':
        console.log(action.payload)
            return Object.assign( {}, state, {cart: [...action.payload]})
        case ADD_TO_CART + '_FULFILLED':
            return Object.assign( {}, state, {cart: [...action.payload]})
        case DELETE_FROM_CART + '_FULFILLED':
            return Object.assign( {}, state, {cart: action.payload})
        default:
            return state;
    }
}