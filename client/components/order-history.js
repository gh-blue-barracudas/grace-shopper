import React from 'react'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/user'
import Moment from 'react-moment'
import 'moment-timezone'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.user.id)
  }

  render() {
    if (this.props.orders) {
      return (
        <div className="cart">
          <div className="cartName">
            <h1 className="order_history_parent">Order History</h1>
          </div>
          <div className="orderContainer">
            <table className="orderTable">
              <thead>
                <tr className="order_history_parent">
                  <th>ORDER ID</th>
                  <th>ORDER DATE</th>
                  <th>ORDER TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {this.props.orders.map(order => (
                  <tr className="order_history_parent" key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      <Moment format="MM/DD/YYYY">{order.createdAt}</Moment>
                    </td>
                    <td>${order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>You haven't placed any orders</h1>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  orders: state.user.orders
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: id => dispatch(fetchOrderHistory(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
