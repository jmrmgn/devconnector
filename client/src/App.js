import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

// React redux config
import { Provider } from 'react-redux';
import store from './store';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Layout component
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

// Auth Component
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Check for token
if (localStorage.jwtToken) {
   // Set auth token header auth
   setAuthToken(localStorage.jwtToken);
   // Decode token and user info and expiration
   const decoded = jwt_decode(localStorage.jwtToken);
   // Set user and isAuthenticated
   store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router>
               <div className="App">
                  <Navbar />
                  <Route exact path="/" component={Landing} />
                  <div className="container">
                     <Route exact path="/register" component={Register} />
                     <Route exact path="/login" component={Login} />
                  </div>
                  <Footer/>
               </div>
            </Router>
         </Provider>
      );
   }
}

export default App;
