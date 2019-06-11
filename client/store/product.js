import {createStore, applyMiddleware} from 'redux'
import axios from 'axios'
import loggingMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

//Action types
const ALL_PRODUCTS = 'ALL PRODUCTS'
const SELECTED_PRODUCT = 'SELECTED PRODUCT'

//Action creator
const gotProducts = products => ({
  type: ALL_PRODUCTS,
  products
})

const gotSingleProduct = product => ({
  type: SELECTED_PRODUCT,
  product
})

//Initial State
const initialState = {
  products: [],
  selectedProduct: {}
}

export const getProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/products')
      dispatch(gotProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getSelectedProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/products/${id}`)
      dispatch(gotSingleProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ALL_PRODUCTS:
      return {...state, products: action.products}
    case SELECTED_PRODUCT:
      return {...state, selectedProduct: action.product}
    default:
      return state
  }
}
