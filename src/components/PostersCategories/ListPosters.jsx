import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import PostersItem from './PostersItem'

class ListPosters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Posters_product: []
    }
  }

  componentDidMount() {
    const apiUrl = 'http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products';
    axios.get(apiUrl, {
      params: {
        category: "19"
      }
    })
      .then(response => {
        console.log(response)
        this.setState({
          Posters_product: response.data
        })
      })
  }

  render() {
    return (
      <Container>
        <h1>List Posters</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Posters_product.length === 0 ? (
                  <p className="not-found">No product found</p>
                ) : (
                    this.state.Posters_product.map((product) => {
                      return (
                        <PostersItem
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

export default ListPosters;