import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Shop_GetListProducts } from '../actions/products_action';
import axios from 'axios'

import ManItems from '../components/ProductMain/ManItems';
import './Home.css'

class Home extends Component {

  componentDidMount = () => {
    this.props.actions.Shop_GetListProducts();
  }

  deleteproduct = (id) => {
    console.log('Xóa thành công', id)
    axios.delete('http://192.168.1.198/wordpress-demo/wp-json/wc/v3/products/' + id)
      .then(response => {
        console.log(response, 'Deleted')
        let product = [...this.state.product]
        let item = product.find(item => item.id === id)
        console.log(item, 'item')
        let index = product.indexOf(item)
        if (index !== -1) {
          product.splice(index, 1);
        } else {
        }
        this.setState({
          product
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    // console.log(this.props.products)
    return (
      <Container>
        <h1>WELCOME SHOP</h1>
        <Row>
          <Col>
            <Row className="Man-content">
              {
                this.props.products.length === 0 ? (
                  <p className="not-found">No product found</p>
                ) : (
                    this.props.products.map((product) => {
                      return (
                        <ManItems
                          key={product.id}
                          product={product}
                          deleteHandel={this.deleteproduct}
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
  products: state.products.products
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    Shop_GetListProducts
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
