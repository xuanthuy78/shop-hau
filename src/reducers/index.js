import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';
import countReducer from './counterReducer';
import ordersReducer from './ordersReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  products: productsReducer,
  categories: categoriesReducer,
  count: countReducer,
  orders: ordersReducer
})

