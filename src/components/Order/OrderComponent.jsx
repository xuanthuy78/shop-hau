import React, { Component } from 'react';
import { Shop_GetOrders } from '../../actions/orders_action';
import { Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import OrderItem from './OrderItem'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class OrderComponent extends Component {

  componentDidMount() {
    this.props.actions.Shop_GetOrders()
  }

  render() {
    console.log(this.props.orders)
    return (
      <Container>
        <h1>List Orders</h1>
        <Button color="success" style={{ marginBottom: '20px' }}>
          {
            <Link to="/orders/create" style={{ color: 'white' }}>Create Order</Link>
          }
        </Button>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.props.orders.length === 0 ? (
                  <p className="not-found">No order found</p>
                ) : (
                    this.props.orders.map((order) => {
                      return (
                        <OrderItem
                          key={order.id}
                          order={order}
                        />
                      )
                    })
                  )
              }
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders.orders
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    Shop_GetOrders
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderComponent);