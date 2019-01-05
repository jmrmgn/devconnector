import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Layout component
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

// Auth Component
import Login from './components/auth/Login';
import Register from './components/auth/Register';

class App extends Component {
   render() {
      return (
         <Router>
            <div className="App">
               <Navbar />
               <Route exact path="/" component={Landing} />
               <div className="container">
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
               </div>
               <Footer />
            </div>
         </Router>
      );
   }
}

export default App;
