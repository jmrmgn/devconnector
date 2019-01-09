import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {

   onLike = id => {
      this.props.addLike(id);
   }

   onUnlike = id => {
      this.props.removeLike(id);
   }

   onDelete = id => {
      this.props.deletePost(id);
   }

   findUserLike = likes => {
      const { auth } = this.props;
      return (likes.filter(like => like.user === auth.user.id).length > 0) ? true : false;
   }

   render() {
      const { post, auth } = this.props;

      return (
         <div className="card card-body mb-3">
            <div className="row">
               <div className="col-md-2">
                  <a href="profile.html">
                     <img className="rounded-circle d-none d-md-block" src={post.avatar}
                        alt="" />
                  </a>
                  <br />
                  <p className="text-center">{post.name}</p>
                  </div>
                  <div className="col-md-10">
                     <p className="lead">
                        {post.text}
                     </p>
                  <button
                     type="button"
                     className="btn btn-light mr-1"
                     onClick={this.onLike.bind(this, post._id)}
                  >
                     <i className={classnames('fas fa-thumbs-up', {
                        'text-info': this.findUserLike(post.likes)
                     })}></i>
                     <span className="badge badge-light">{post.likes.length > 0 && post.likes.length}</span>
                  </button>
                  <button
                     type="button"
                     className="btn btn-light mr-1"
                     onClick={this.onUnlike.bind(this, post._id)}
                  >
                     <i className="text-secondary fas fa-thumbs-down"></i>
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                     Comments
                  </Link>
                  {post.user === auth.user.id && (
                     <button
                        type="button"
                        className="btn btn-danger mr-1"
                        onClick={this.onDelete.bind(this, post._id)}
                     >
                        <i className="fas fa-times" />
                     </button>
                  )}
               </div>
            </div>
         </div>
      )
   }
}

PostItem.propTypes = {
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   deletePost: PropTypes.func.isRequired,
   addLike: PropTypes.func.isRequired,
   removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);