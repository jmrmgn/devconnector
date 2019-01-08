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

   componentWillReceiveProps(nextProps) {
      if (nextProps.profile.profile == null && this.props.profile.loading) {
         this.props.history.push('/');
      }
   }

   render() {
      const { profile, loading } = this.props.profile;
      let profileContent;

      if (profile === null || loading) {
         profileContent = <Spinner />
      }
      else {
         profileContent = (
            <div>
               <div className="row">
                  <div className="col-md-6">
                     <Link to="/profiles" className="btn btn-light mb-3 float-left">Back to Profiles</Link>
                  </div>
                  <div className="col-md-6" />
                  <div className="col-md-12">
                     <ProfileHeader profile={profile}/>
                     <ProfileAbout profile={profile} />
                     <ProfileCreds education={profile.education} experience={profile.experience} />
                     {profile.githubusername ? (
                        <ProfileGithub username={profile.githubusername} />
                     ) : null }
                  </div>
               </div>
            </div>
         )
      }

      return (
         <div className="profile">
            <div className="container">
               {profileContent}
            </div>
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
