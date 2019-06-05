import React, { Component } from 'react';
import axios from 'axios';
import AlbumsItem from './AlbumsItem';
import { Container, Row, Col } from 'reactstrap';

class ListAlbums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums_product: []
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
        console.log(response.data)
        this.setState({
          albums_product: response.data
        })
      })
  }

  render() {
    console.log(this.state.albums_product)
    return (
      <Container>
        <h1>List Albums</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.state.albums_product.length === 0 ? (
                  <p className="not-found">No product found</p>
                ) : (
                    this.state.albums_product.map((product) => {
                      return (
                        <AlbumsItem
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

export default ListAlbums
