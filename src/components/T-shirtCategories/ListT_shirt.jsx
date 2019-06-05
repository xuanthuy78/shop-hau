import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import TShirtItem from './T_shirtItem'

class ListT_shirt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tshirt_product: []
    }
  }

  componentDidMount() {
    const apiUrl = 'http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products';
    axios.get(apiUrl, {
      params: {
        category: "22"
      }
    })
      .then(response => {
        console.log(response)
        this.setState({
          Tshirt_product: response.data
        })
      })
  }

  render() {
    return (
      <Container>
        <h1>List T_shirt</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Tshirt_product.length === 0 ? (
                  <p className="not-found">No product found</p>
                ) : (
                    this.state.Tshirt_product.map((product) => {
                      return (
                        <TShirtItem
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

export default ListT_shirt;