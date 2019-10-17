import React, { useState } from 'react';
import { connect } from 'react-redux';
import LoginPresenter from './LoginPresenter.jsx';
import { setAlert } from '../../Store/Actions/alert';
import { login } from '../../Store/Actions/auth';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginContainer = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const handleInput = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/"></Redirect>;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <LoginPresenter
      email={email}
      password={password}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
    />
  );
};

LoginContainer.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { setAlert, login },
)(LoginContainer);
