import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

import { Shop_GetProduct_By_ID } from '../../actions/products_action';
import SlideImageProduct from '../layouts/SlideImageProduct';
import SlideRelatedProducts from '../layouts/SlideRelatedProducts';
import SelectTabProduct from '../layouts/SelectTabProduct';
import CounterComponent from '../Counter/CounterComponent';
import './ManDetail.css';

class ManDetail extends Component {

  componentDidMount() {
    this.props.actions.Shop_GetProduct_By_ID(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    const prevProductID = prevProps.match.params.id
    if (this.props.match.params.id !== prevProductID) {
      this.props.actions.Shop_GetProduct_By_ID(this.props.match.params.id)
    }
  }

  render() {
    console.log(this.props.product)
    return (
      <Container>
        <h1>Detail Product</h1>
        <Row>
          <Col>
            {
              this.props.product && (
                <div>
                  <div className="show-product" >
                    <Col md='6'>
                      <div className="slide-image-product">
                        <SlideImageProduct />
                      </div>
                    </Col>
                    <Col md='6'>
                      <div className="short-info-product">
                        <Card>
                          <CardBody>
                            <CardTitle className="name-product"> {this.props.product.data.name}</CardTitle>
                            <CardSubtitle dangerouslySetInnerHTML={{ __html: this.props.product.data.short_description }} />
                            <CardText className="price-product">Price: {this.props.product.data.price} $</CardText>
                            <Button outline color="primary" className="button-addcart">
                              Add To Cart
                            </Button>
                            <CounterComponent />
                            <CardText className="price-product">SKU: {this.props.product.data.sku}</CardText>
                          </CardBody>
                        </Card>
                      </div>
                    </Col>
                  </div>
                  <div className="select-tab-product">
                    <SelectTabProduct />
                  </div>
                  <div className="related-products">
                    <SlideRelatedProducts />
                  </div>
                </div>
              )
            }
          </Col>
        </Row>
      </Container >
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.products.product
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    Shop_GetProduct_By_ID
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ManDetail);