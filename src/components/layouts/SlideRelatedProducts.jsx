import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//import { Shop_GetProduct_By_ID } from '../../actions/products_action';
import { Shop_GetRelatedProducts } from '../../actions/related_product_action';
import { Col } from 'reactstrap';
import ManItems from '../ProductMain/ManItems'

class SlideRelatedProducts extends Component {

  componentDidMount() {
    this.props.actions.Shop_GetRelatedProducts(this.props.product.data.related_ids);
  }

  render() {
    const arrayRelatedProducts = this.props.relatedproducts;
    console.log(this.props.relatedproducts)
    return (
      <div className="related-products">
        <h1 style={{ fontSize: '20px' }}>Related products</h1>
        <Col md="7" style={{ display: 'flex' }}>
          {
            arrayRelatedProducts.length === 0 ? (
              <p className="not-found">No product found</p>
            ) : (
                arrayRelatedProducts.map((product) => {
                  return (
                    <ManItems
                      key={product.id}
                      product={product}
                    />
                  )
                })
              )
          }
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.products.product,
  relatedproducts: state.products.relatedproducts
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    //Shop_GetProduct_By_ID,
    Shop_GetRelatedProducts
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SlideRelatedProducts);