import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';

import { connect } from 'react-redux';
import { getProfileByHandle } from '../../actions/profileActions';


class Profile extends Component {
   componentDidMount() {
      const handle = this.props.match.params.handle;
      if (handle) {
         this.props.getProfileByHandle(handle);
      }
   }

   render() {
      return (
         <div>
            <ProfileHeader />
            <ProfileAbout />
            <ProfileCreds />
            <ProfileGithub />
         </div>
      )
   }
}

Profile.propTypes = {
   profile: PropTypes.object.isRequired,
   getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
