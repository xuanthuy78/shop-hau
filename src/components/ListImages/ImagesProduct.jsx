import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap'
import axios, { post } from 'axios'
import { Upload, Icon, Modal, Button, message } from 'antd';
import reqwest from 'reqwest';

class ImagesProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
    }
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    reqwest({
      url: 'http://192.168.1.198/wordpress-demo/wp-json/wp/v2/media',
      headers: {
        'content-type': 'multipart/form-data'
      },
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    );
  }
}

export default ImagesProduct;

// class ImagesProduct extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       images: [],
//       body: ''
//     }
//   }

//   handleFileChange = (e) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       const promises = files.map(file => {
//         return (new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.addEventListener('load', (ev) => {
//             resolve(ev.target.result);
//           });
//           reader.addEventListener('error', reject);
//           reader.readAsDataURL(file);
//         }))
//       });

//       Promise.all(promises).then(images => {
//         this.setState({
//           images: images
//         })
//       }, error => { console.error(error); });
//     }
//     if (this.props.onChange !== undefined) {
//       this.props.onChange(e);
//     }
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     this.state.images.forEach((image_file) => {
//       formData.append('file[]', image_file);
//     });
//     axios.post('http://192.168.1.198/wordpress-demo/wp-json/wp/v2/media', formData)
//       .then(response => {
//         this.setState({
//           posts: [response.data]
//         })
//       });
//   }

//   render() {
//     return (
//       <div >
//         <input type='file' onChange={this.handleFileChange} />
//         <Button onClick={this.handleSubmit} >
//           Submit
//         </Button>
//       </div>
//     );
//   }
// }

// export default ImagesProduct;
