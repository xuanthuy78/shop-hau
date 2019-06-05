import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import HoodiesItem from './HoodiesItem'

class ListHoodies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hoodies_product: []
    }
  }

  componentDidMount() {
    const apiUrl = 'http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products';
    axios.get(apiUrl, {
      params: {
        category: "21"
      }
    })
      .then(response => {
        console.log(response)
        this.setState({
          Hoodies_product: response.data
        })
      })
  }

  render() {
    return (
      <Container>
        <h1>List Hoodies</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Hoodies_product.length === 0 ? (
                  <p className="not-found">No product found</p>
                ) : (
                    this.state.Hoodies_product.map((product) => {
                      return (
                        <HoodiesItem
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

export default ListHoodies;