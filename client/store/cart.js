import Axios from 'axios'

const CREATE_CART = 'CREATE_CART'
const ADD_PROD = 'ADD_PROD'
const DELETE_PROD = 'DELETE_PROD'
const EDIT_PROD_QUANT = 'EDIT_PROD_QUANT'
const COMP_CHCKOUT = 'COMP_CHCKOUT'

// Action Creators

const createdCart = id => ({
  type: CREATE_CART,
  id
})

const addedProd = cart => ({
  type: ADD_PROD,
  cart
})

const deletedProd = cart => ({
  type: DELETE_PROD,
  cart
})

const editedProdQuantity = cart => ({
  type: EDIT_PROD_QUANT,
  cart
})

const completedCart = () => ({
  type: COMP_CHCKOUT
})

// Thunk Creators

export const createCart = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.post('/api/carts/')
      dispatch(createdCart(data.id))
    } catch (error) {
      console.log('Error creating cart: ', error)
    }
  }
}

export const addProd = (cartId, prodId) => {
  return async dispatch => {
    try {
      const {data} = await Axios.put(`/api/carts/${cartId}/addProduct`, {
        productId: prodId
      })
      dispatch(addedProd(data))
    } catch (error) {
      console.log('Error adding product: ', error)
    }
  }
}

export const deleteProd = (cartId, prodId) => {
  return async dispatch => {
    try {
      const {data} = await Axios.put(`api/carts/${cartId}/deleteProduct`, {
        productId: prodId
      })
      dispatch(deletedProd(data))
    } catch (error) {
      console.log('Error deleting product: ', error)
    }
  }
}

export const editProdQuant = (cartId, prodId, quantity) => {
  return async dispatch => {
    try {
      const {data} = await Axios.put(`api/carts/${cartId}/editProdQuantity`, {
        productId: prodId,
        quantity
      })
      dispatch(editedProdQuantity(data))
    } catch (error) {
      console.log('Error editing quantity: ', error)
    }
  }
}

export const completeCheckout = cartId => {
  return async dispatch => {
    try {
      await Axios.put(`api/carts/${cartId}/completedOrder`)
      dispatch(completedCart())
    } catch (error) {
      console.log('Error deleting cart: ', error)
    }
  }
}

// Initial State
const defaultCart = {
  id: 0,
  cart: []
}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case CREATE_CART:
      return {...state, id: action.id}
    case ADD_PROD:
      return {...state, cart: action.cart}
    case DELETE_PROD:
      return {...state, cart: action.cart}
    case EDIT_PROD_QUANT:
      return {...state, cart: action.cart}
    case COMP_CHCKOUT:
      return defaultCart
    default:
      return state
  }
}
