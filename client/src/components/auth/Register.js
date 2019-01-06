import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
   constructor() {
      super();
      this.state = {
         name: '',
         email: '',
         password: '',
         password2: '',
         errors: {}
      }
   }

   componentDidMount() {
      if ( this.props.auth.isAuthenticated ) {
         this.props.history.push('/dashboard')
      }
   }

   static getDerivedStateFromProps(nextProps, nextState) {
      if (nextProps.errors) {
         return { errors: nextProps.errors };
      }
   }

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      });
   }
   
   onSubmit = e => {
      e.preventDefault();
      const { name, email, password, password2 } = this.state;
      const newUser = { name, email, password, password2 };

      this.props.registerUser(newUser, this.props.history);
      
   }
   
   render() {
      const { errors } = this.state;
      return(
         <div className="register">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <h1 className="display-4 text-center">Sign Up</h1>
                     <p className="lead text-center">Create your DevConnector account</p>
                     <form onSubmit={this.onSubmit.bind(this)} noValidate>
                        <TextFieldGroup
                           placeholder="Name"
                           name="name"
                           value={this.state.name}
                           onChange={this.onChange.bind(this)}
                           error={errors.name}
                        />
                        <TextFieldGroup
                           text="email"
                           placeholder="Email address"
                           name="email"
                           value={this.state.email}
                           onChange={this.onChange.bind(this)}
                           error={errors.email}
                           info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                        />
                        <TextFieldGroup
                           type="password"
                           name="password"
                           placeholder="Password"
                           value={this.state.password}
                           onChange={this.onChange.bind(this)}
                           error={errors.password}
                        />
                        <TextFieldGroup
                           type="password"
                           name="password2"
                           placeholder="Confirm Password"
                           value={this.state.password2}
                           onChange={this.onChange.bind(this)}
                           error={errors.password2}
                        />
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

Register.propTypes = {
   registerUser: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth,
   errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));