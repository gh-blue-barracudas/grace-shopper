import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER_ADDRESS = 'UPDATE_USER_ADDRESS'
const GET_USER_ORDERS = 'GET_USER_ORDERS'

/**
 * INITIAL STATE
 */
const defaultUser = {
  address: {},
  orders: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUserAddress = address => ({
  type: UPDATE_USER_ADDRESS,
  address
})
const getUserOrders = orders => ({
  type: GET_USER_ORDERS,
  orders
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  method,
  firstName,
  lastName
) => async dispatch => {
  let res
  try {
    if (method === 'signup') {
      res = await axios.post(`/auth/${method}`, {
        email,
        password,
        firstName,
        lastName
      })
    } else {
      res = await axios.post(`/auth/${method}`, {email, password})
    }
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

export const fetchOrderHistory = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users/orders')
    dispatch(getUserOrders(data))
  } catch (error) {
    console.error(error)
  }
}

export const updateUserAddressThunk = formData => async dispatch => {
  try {
    await axios.put('/api/users/address', formData)
    dispatch(updateUserAddress(formData))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER_ADDRESS:
      return {...state, address: action.address}
    case GET_USER_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}
