import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import MusicItem from './MusicItem'

class ListMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Music_product: []
    }
  }

  componentDidMount() {
    const apiUrl = 'http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products';
    axios.get(apiUrl, {
      params: {
        category: "16"
      }
    })
      .then(response => {
        console.log(response)
        this.setState({
          Music_product: response.data
        })
      })
  }

  render() {
    return (
      <Container>
        <h1>List Music</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.Music_product.length === 0 ? (
                  <p className="not-found">No product found</p>
                ) : (
                    this.state.Music_product.map((product) => {
                      return (
                        <MusicItem
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

export default ListMusic;