import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import SingleItem from './SingleItem'

class ListSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Single_product: []
    }
  }

  componentDidMount() {
    const apiUrl = 'http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products';
    axios.get(apiUrl, {
      params: {
        category: "18"
      }
    })
      .then(response => {
        console.log(response)
        this.setState({
          Single_product: response.data
        })
      })
  }

  render() {
    return (
      <Container>
        <h1>List Single</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Single_product.length === 0 ? (
                  <p className="not-found">No product found</p>
                ) : (
                    this.state.Single_product.map((product) => {
                      return (
                        <SingleItem
                          key={product.id}
                          product={product}
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

export default ListSingle;