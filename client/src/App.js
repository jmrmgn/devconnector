import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

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

// Other component
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';

// Check for token
if (localStorage.jwtToken) {
   // Set auth token header auth
   setAuthToken(localStorage.jwtToken);
   // Decode token and user info and expiration
   const decoded = jwt_decode(localStorage.jwtToken);
   // Set user and isAuthenticated
   store.dispatch(setCurrentUser(decoded));

   // Check for expired token
   const currentTime = Date.now() / 1000;
   if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      store.dispatch(clearCurrentProfile());
      // Redirect to login
      window.location.href= "/login";
   }
}

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router>
               <div className="App">
                  <Navbar />
                  <Route exact path="/" component={Landing} />
                  <div className="container main-body">
                     <Switch>
                        <Route exact path="/register" component={Register} />
                     </Switch>
                     <Switch>
                        <Route exact path="/login" component={Login} />
                     </Switch>
                     <Switch>
                        <Route exact path="/profiles" component={Profiles} />
                     </Switch>
                     <Switch>
                        <Route exact path="/profile/:handle" component={Profile} />
                     </Switch>
                     <Switch>
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                     </Switch>
                     <Switch>
                        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                     </Switch>
                     <Switch>
                        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                     </Switch>
                     <Switch>
                        <PrivateRoute exact path="/add-experience" component={AddExperience} />
                     </Switch>
                     <Switch>
                        <PrivateRoute exact path="/add-education" component={AddEducation} />
                     </Switch>
                     <Switch>
                        <PrivateRoute exact path="/posts" component={Posts} />
                     </Switch>
                  </div>
                  <Footer/>
               </div>
            </Router>
         </Provider>
      );
   }
}

export default App;
