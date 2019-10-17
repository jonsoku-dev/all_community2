import React, { useState } from 'react';
import { connect } from 'react-redux';
import SignupPresenter from './SignupPresenter.jsx';
import { setAlert } from '../../Store/Actions/alert';
import { signup } from '../../Store/Actions/auth';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const SignupContainer = ({ setAlert, signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;

  const handleInput = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('do not correct your between password & password2', 'danger');
    } else {
      signup({ name, email, password });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <SignupPresenter
      name={name}
      email={email}
      password={password}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
    />
  );
};

SignupContainer.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { setAlert, signup },
)(SignupContainer);
