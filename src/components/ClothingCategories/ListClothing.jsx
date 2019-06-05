import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import ClothingItem from './ClothingItem';

class ListClothing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Clothing_product: []
    }
  }

  componentDidMount() {
    const apiUrl = 'http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products';
    axios.get(apiUrl, {
      params: {
        category: "20"
      }
    })
      .then(response => {
        console.log(response)
        this.setState({
          Clothing_product: response.data
        })
      })
  }

  render() {
    console.log(this.state.Clothing_product)
    return (
      <Container>
        <h1>List Clothing</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Clothing_product.length === 0 ? (
                  <p className="not-found">No product found</p>
                ) : (
                    this.state.Clothing_product.map((product) => {
                      return (
                        <ClothingItem
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

export default ListClothing;
