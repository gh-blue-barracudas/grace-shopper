import Axios from 'axios'

const CREATE_CART = 'CREATE_CART'
const ADD_PROD = 'ADD_PROD'
const DELETE_PROD = 'DELETE_PROD'
const EDIT_PROD_QUANT = 'EDIT_PROD_QUANT'
const COMP_CHCKOUT = 'COMP_CHCKOUT'
const GET_CART = 'GET_CART'
const UPDATE_TOTAL = 'UPDATE_TOTAL'

// Action Creators

const createdCart = id => ({
  type: CREATE_CART,
  id
})

const updateTotal = products => {
  let total = 0
  //at the beginning the cart is undefined on the state, that's why I am using this conditional
  if (products) {
    products.map(prod => {
      total += prod.price * prod.orderPrd.quantity
    })
  }
  return {
    //action.type and action.total
    type: UPDATE_TOTAL,
    total
  }
}

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

const gotCart = (cart, id) => ({
  type: GET_CART,
  cart,
  id
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
      dispatch(updateTotal(data[0].products))
    } catch (error) {
      console.log('Error adding product: ', error)
    }
  }
}

export const deleteProd = (cartId, prodId) => {
  return async dispatch => {
    try {
      const {data} = await Axios.put(`/api/carts/${cartId}/deleteProduct`, {
        productId: prodId
      })
      dispatch(deletedProd(data))
      dispatch(updateTotal(data[0].products))
    } catch (error) {
      console.log('Error deleting product: ', error)
    }
  }
}

export const editProdQuant = (cartId, prodId, quantity) => {
  return async dispatch => {
    try {
      const {data} = await Axios.put(`/api/carts/${cartId}/editProdQuantity`, {
        productId: prodId,
        quantity
      })
      dispatch(editedProdQuantity(data))
      dispatch(updateTotal(data[0].products))
    } catch (error) {
      console.log('Error editing quantity: ', error)
    }
  }
}

export const completeCheckout = cartId => {
  return async dispatch => {
    try {
      await Axios.put(`/api/carts/${cartId}/completedOrder`)
      dispatch(completedCart())
    } catch (error) {
      console.log('Error deleting cart: ', error)
    }
  }
}

export const getCart = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/carts`)
      dispatch(gotCart(data, data[0].id))
      dispatch(updateTotal(data[0].products))
    } catch (error) {
      console.log('Error retrieving cart: ', error)
    }
  }
}

// Initial State
const defaultCart = {
  id: 0,
  cart: [],
  total: 0
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
    case GET_CART:
      return {...state, cart: action.cart, id: action.id}
    case UPDATE_TOTAL:
      return {...state, total: action.total}
    default:
      return state
  }
}
