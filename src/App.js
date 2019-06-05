import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configstore';
import jwt_decode from 'jwt-decode';
import setAuthToken from './token/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import { Cookies } from 'react-cookie';

import NavbarMenu from './components/layouts/NavbarMenu';
import { Login, Register } from './components/Authentication';
import Home from './components/Home';
import { ManDetail, ManForm } from './components/ProductMain';
import Albums from './components/AlbumCategories/ListAlbums'
import Clothing from './components/ClothingCategories/ListClothing';
import Hoodies from './components/HoodiesCategories/ListHoodies';
import Music from './components/MusicCategories/ListMusic';
import Posters from './components/PostersCategories/ListPosters';
import Single from './components/SingleCategories/ListSingle'
import T_shirt from './components/T-shirtCategories/ListT_shirt';
import UnCategories from './components/UnCategorized/ListUnCategories';
import { OrderComponent, OrderForm, OrderDetail, OrderEdit } from './components/Order'
import ImagesProduct from './components/ListImages/ImagesProduct';

const cookies = new Cookies();
const token = cookies.get('jwtToken');

if (token) {
  // Set auth token header auth
  const newtoken = token;
  setAuthToken(newtoken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(newtoken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <NavbarMenu />
          <Route exact path="/" component={Home} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/orders" component={OrderComponent} />
            <Route exact path="/orders/create" component={OrderForm} />
            <Route exact path="/orders/:id" component={OrderDetail} />
            <Route exact path="/orders/edit/:id" component={OrderEdit} />

            <Route exact path="/mandetail/:id" component={ManDetail} />
            <Route exact path="/createproduct" component={ManForm} />
            <Route exact path="/images" component={ImagesProduct} />

            <Route exact path="/albums" component={Albums} />
            <Route exact path="/clothing" component={Clothing} />
            <Route exact path="/hoodies" component={Hoodies} />
            <Route exact path="/music" component={Music} />
            <Route exact path="/posters" component={Posters} />
            <Route exact path="/single" component={Single} />
            <Route exact path="/t_shirt" component={T_shirt} />
            <Route exact path="/uncategories" component={UnCategories} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
