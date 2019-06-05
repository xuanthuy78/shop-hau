import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import UncategoriesItem from './UncategoriesItem'

class ListUnCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Uncat_product: []
    }
  }

  componentDidMount() {
    const apiUrl = 'http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products';
    axios.get(apiUrl, {
      params: {
        category: "15"
      }
    })
      .then(response => {
        console.log(response)
        this.setState({
          Uncat_product: response.data
        })
      })
  }

  render() {
    return (
      <Container>
        <h1>List UnCategories</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Uncat_product.length === 0 ? (
                  <Col>
                    <p>No product found</p>
                  </Col>
                ) : (
                    this.state.Uncat_product.map((product) => {
                      return (
                        <UncategoriesItem
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

export default ListUnCategories;