import Axios from 'axios'

const CREATE_CART = 'CREATE_CART'
// const RETRIEVE_CART = 'RETRIEVE_CART'
const ADD_PROD = 'ADD_PROD'
const DELETE_PROD = 'DELETE_PROD'
const EDIT_PROD_QUANT = 'EDIT_PROD_QUANT'
const DELETE_CART = 'DELETE_CART'

// Initial State
const defaultCart = {cart: null}

// Action Creators

// Thunk Creators
export const createCart = () => {
  return async dispatch => {
    try {
      //
    } catch (error) {
      //
    }
  }
}

export default function(state = defaultCart, action) {
  switch (action.type) {
    default:
      return state
  }
}
