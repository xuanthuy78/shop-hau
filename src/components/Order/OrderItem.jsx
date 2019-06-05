import React, { Component } from 'react';
import { Card, CardText, CardTitle, Button, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class OrderItem extends Component {

  render() {
    return (
      <Col sm="6">
        <Card body>
          <CardTitle>Bill: {this.props.order.id}</CardTitle>
          <CardText>Name Bill: {this.props.order.billing.first_name}</CardText>
          <Button outline color="success">
            <Link to={"/orders/" + this.props.order.id}>
              Order Detail
            </Link>
          </Button>
        </Card>
      </Col>
    );
  }
}

export default OrderItem;