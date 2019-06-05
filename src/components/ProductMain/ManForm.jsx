import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import { Shop_CreateProduct } from '../../actions/products_action';
import { Shop_GetListCategories } from '../../actions/categories_action';
import { Checkbox, Upload, Icon, Modal, Button } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

class ManForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      short_description: '',
      regular_price: '',
      sku: '',
      categories: [],
      images: [],
      previewVisible: false,
      previewImage: '',
      fileList: [],
    }
  }

  handleCancel = () => {
    this.setState({
      previewVisible: false
    })
  };

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChangeUpload = ({ fileList }) => {
    console.log(fileList)
    this.setState({
      fileList
    })
  };

  // handleChangeUpload = (e) => {
  //   if (e.target.files) {
  //     const files = Array.from(e.target.files);
  //     const promises = files.map(file => {
  //       return (new Promise((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.addEventListener('load', (ev) => {
  //           resolve(ev.target.result);
  //         });
  //         reader.addEventListener('error', reject);
  //         reader.readAsDataURL(file);
  //       }))
  //     });

  //     Promise.all(promises).then(images => {
  //       this.setState({
  //         fileList: images
  //       })
  //     }, error => { console.error(error); });
  //   }
  //   if (this.props.onChange !== undefined) {
  //     this.props.onChange(e);
  //   }
  // };

  handleSubmitImage = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", this.state.fileList[0].originFileObj);
    console.log(this.state.fileList)
    axios.post("http://192.168.1.198/wordpress-demo/wp-json/wp/v2/media", formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response);
        this.setState({
          images: response.data
        })
        console.log('images', this.state.images)
      })
  };

  componentDidMount = () => {
    this.props.actions.Shop_GetListCategories()
  };

  onChangeCheckBox = (checkedValues) => {
    console.log('checked = ', checkedValues);
    let newObject = checkedValues.map((item) => ({ id: item }))
    this.setState({
      categories: newObject
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    const prodcut = {
      name: this.state.name,
      description: this.state.description,
      short_description: this.state.short_description,
      regular_price: this.state.regular_price,
      categories: this.state.categories,
      sku: this.state.sku,
      images: this.state.images
    }
    console.log(prodcut)
    this.props.actions.Shop_CreateProduct(prodcut)
    this.setState({
      name: '',
      description: '',
      short_description: '',
      regular_price: '',
      sku: '',
      categories: [],
      images: []
    })
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Container>
        <Row>
          <Col>
            <h1 style={{ marginBottom: '20px' }}>Create Product</h1>
            <form onSubmit={this.onSubmit} encType="multipart/form-data" required >

              <div className="form-group">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChangeUpload}
                  beforeUpload={() => false}
                // multiple
                >
                  {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Button onClick={this.handleSubmitImage} >
                  Submit
                </Button>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img alt="example" style={{ width: "100%" }} src={previewImage} />
                </Modal>
              </div>

              <div className="form-group">
                <label>Name: </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <Input
                  type="textarea"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Short description</label>
                <Input
                  type="textarea"
                  name="short_description"
                  value={this.state.short_description}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Price: </label>
                <input type="number"
                  className="form-control"
                  name="regular_price"
                  value={this.state.regular_price}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Sku: </label>
                <input
                  type="text"
                  className="form-control"
                  name="sku"
                  value={this.state.sku}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label style={{ marginRight: '40px' }}>Categories </label>
                <Checkbox.Group
                  options=
                  {
                    this.props.categories.map((categories) => ({
                      label: categories.name,
                      value: categories.id
                    }))
                  }
                  onChange={this.onChangeCheckBox} />
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <input type="submit" value="Create Product" className="btn btn-primary" />
              </div>
            </form>
          </Col>
        </Row>
      </Container >
    );
  }
}


const mapStateToProps = (state) => ({
  categories: state.categories.categories
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    Shop_CreateProduct,
    Shop_GetListCategories
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ManForm);