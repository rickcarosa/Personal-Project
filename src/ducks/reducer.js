import axios from 'axios';

const initialState = {
    user: {},
    cart: [],
    order: []
}

const GET_USER_INFO = "GET_USER_INFO"
const GET_CART = "GET_CART"
const ADD_TO_CART = "ADD_TO_CART"
const DELETE_FROM_CART = "DELETE_FROM_CART"
const GET_ORDER = "GET_ORDER"
const ADD_TO_ORDER = "ADD_TO_ORDER"

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

export function addToCart(name, description, picture, price){
    let addCart = axios.put('/api/show', {name, description, picture, price}).then( res => {
        console.log(res.data)
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

export function getOrder(){
    let userOrder = axios.get('/api/order').then( res => {
        return res.data;
    })
    return{
        type: GET_ORDER,
        payload: userOrder
    }
}

export function addToOrder(show_title, show_price, time, totalPrice){
    let addOrder = axios.post('/api/order', {show_title, show_price, time, totalPrice}).then( res => {
        return res.data;
    })
    return{
        type: ADD_TO_ORDER,
        payload: addOrder
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
        case GET_ORDER + '_FULFILLED':
        console.log(action.payload, 'what')
            return Object.assign( {}, state, {order: [...action.payload]})
        case ADD_TO_ORDER + '_FULFILLED':
        console.log(action.payload, 'booooooooo')
            return Object.assign( {}, state, {order: [...action.payload]})
        default:
            return state;
    }
}