import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
   constructor(props) {
      super(props);
      this.state = {
         school: '',
         degree: '',
         fieldofstudy: '',
         from: '',
         to: '',
         current: false,
         description: '',
         errors: {},
         disabled: false
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
         this.setState({ errors: nextProps.errors });
      }
   }

   onSubmit = e => {
      e.preventDefault();
      const { school, degree, fieldofstudy, from, to, current, description } = this.state;

      const eduData = { school, degree, fieldofstudy, from, to, current, description };

      this.props.addEducation(eduData, this.props.history);
   }

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }
   
   onCheck = e => {
      this.setState({
         disabled: !this.state.disabled,
         current: !this.state.current
      });
   }

   render() {
      const { errors } = this.state;
      return (
         <div className="add-education">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <Link to="/dashboard" className="btn btn-secondary">Go Back</Link>
                     <h1 className="display-4 text-center">Add Education</h1>
                     <p className="lead text-center">
                        Add any school, bootcamp, etc, that you've attended
                     </p>
                     <small className="d-block pb-3">* = required fields</small>
                     <form onSubmit={this.onSubmit.bind(this)}>
                        <TextFieldGroup
                           placeholder="* School"
                           name="school"
                           value={this.state.school}
                           onChange={this.onChange}
                           error={errors.school}
                        />
                        <TextFieldGroup
                           placeholder="* Degree or Certification"
                           name="degree"
                           value={this.state.degree}
                           onChange={this.onChange}
                           error={errors.degree}
                        />
                        <TextFieldGroup
                           placeholder="* Field of study"
                           name="fieldofstudy"
                           value={this.state.fieldofstudy}
                           onChange={this.onChange}
                           error={errors.fieldofstudy}
                        />
                        <h6>From Date</h6>
                        <TextFieldGroup
                           name="from"
                           type="date"
                           value={this.state.from}
                           onChange={this.onChange}
                           error={errors.from}
                        />
                        <h6>To Date</h6>
                        <TextFieldGroup
                           name="to"
                           type="date"
                           value={this.state.to}
                           onChange={this.onChange}
                           error={errors.to}
                           disabled={this.state.disabled ? 'disabled' : ''}
                        />
                        <div className="form-check mb-4">
                           <input
                           type="checkbox"
                           className="form-check-input"
                           name="current"
                           value={this.state.current}
                           checked={this.state.current}
                           onChange={this.onCheck}
                           id="current"
                           />
                           <label htmlFor="current" className="form-check-label">
                           Still student
                           </label>
                        </div>
                        <TextAreaFieldGroup
                           placeholder="Program Description"
                           name="description"
                           value={this.state.description}
                           onChange={this.onChange}
                           error={errors.description}
                           info="Tell us about the program that you were in"
                        />
                        <input
                           type="submit"
                           value="Submit"
                           className="btn btn-info btn-block mt-4"
                        />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

AddEducation.propTypes = {
   AddEducation: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   profile: state.profile,
   errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
