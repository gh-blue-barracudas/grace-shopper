import React from 'react'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/user'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.user.id)
  }

  render() {
    if (this.props.orders.length > 0) {
      return (
        <div>
          <h1 className="order_history_parent">order history</h1>
          <div>
            <table className="orderTable">
              <thead>
                <tr className="order_history_parent">
                  <th>ORDER ID</th>
                  <th>ORDER DATE</th>
                </tr>
              </thead>
              <tbody>
                {this.props.orders.map(order => (
                  <tr className="order_history_parent" key={order.id}>
                    <td>{order.id}</td>
                    <td>${order.createdAt}</td>
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
