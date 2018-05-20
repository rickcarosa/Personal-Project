import axios from 'axios';

const initialState = {
    user: {},
    cart: [],
    order: [],
    // similar: []
}

const GET_USER_INFO = "GET_USER_INFO"
const GET_CART = "GET_CART"
const ADD_TO_CART = "ADD_TO_CART"
const DELETE_SHOW_FROM_CART = "DELETE_SHOW_FROM_CART"
const ADD_TO_ORDER = "ADD_TO_ORDER"
const DELETE_ORDER = "DELETE_ORDER"
// const GET_SIMILAR = "GET_SIMILAR"

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
        return res.data;
    })
    return{
        type: ADD_TO_CART,
        payload: addCart
    }
}

export function deleteShow(id){
    let deleteShow = axios.delete(`/api/show/${id}`).then( res => {
        return res.data;
    })
    return{
        type: DELETE_SHOW_FROM_CART,
        payload: deleteShow
    }
}

export function addToOrder(show_title, show_price, totalPrice, time){
    // console.log(show_title, show_price, totalPrice)
    let addOrder = axios.post('/api/order', {show_title, show_price, totalPrice, time}).then( res => {
        return res.data;
    })
    return{
        type: ADD_TO_ORDER,
        payload: addOrder
    }
}

// export function getSimilar(){
//     let getSimilarShows = axios.get(`https://api.themoviedb.org/3/tv/1418/similar?api_key=5ac62073c7fea542488a55bf2a3bfd54&language=en-US&page=1`).then( res => {
//         return res.data;
//     })
//     return{
//         type: GET_SIMILAR,
//         payload: getSimilarShows
//     }
// }

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign( {}, state, {user: action.payload})
        case GET_CART + '_FULFILLED':
            return Object.assign( {}, state, {cart: [...action.payload]})
        case ADD_TO_CART + '_FULFILLED':
            return Object.assign( {}, state, {cart: [...action.payload]})
        case DELETE_SHOW_FROM_CART + '_FULFILLED':
            return Object.assign( {}, state, {cart: action.payload})
        case ADD_TO_ORDER + '_FULFILLED':
            return Object.assign( {}, state, {order: [...action.payload]})
        case DELETE_ORDER + '_FULFILLED':
            return Object.assign( {}, state, {order: action.payload})
        // case GET_SIMILAR + '_FULFILLED':
        //     return Object.assign( {}, state, {similar: action.payload})
        default:
            return state;
    }
}