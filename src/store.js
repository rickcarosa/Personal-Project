import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './ducks/reducer';
import promiseMiddleware from 'redux-promise-middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middleware = promiseMiddleware();

export default createStore(reducer, composeEnhancers(applyMiddleware(middleware)));

// compose is for redux dev tools