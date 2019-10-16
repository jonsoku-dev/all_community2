import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { logout } from '../../Store/Actions/auth';
import PropTypes from 'prop-types';

const LOGO_URI = 'https://upload.wikimedia.org/wikipedia/commons/4/49/Apink_Logo_01.png';

const GlobalNavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const LogoWrapper = styled.div`
  img {
    height: 60px;
  }
`;

const LogoLink = styled(Link)``;

const GlobalMenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GlobalMenuLink = styled(Link)`
  text-transform: uppercase;
  padding: 1rem 2rem;
`;

const GlobalNavigation = ({ logout, auth: { isAuthenticated, loading } }) => {
  const guestLinks = (
    <>
      <div>
        <GlobalMenuLink to="/login">login</GlobalMenuLink>
      </div>
      <div>
        <GlobalMenuLink to="/signup">sign_up</GlobalMenuLink>
      </div>
      <div>
        <GlobalMenuLink to="/">about_us</GlobalMenuLink>
      </div>
    </>
  );
  const authLinks = (
    <>
      <div>
        <GlobalMenuLink to="/admin">ADMIN</GlobalMenuLink>
        <GlobalMenuLink to="/post">post</GlobalMenuLink>
        <GlobalMenuLink to="/product">product</GlobalMenuLink>
        <GlobalMenuLink to="!#" onClick={logout}>
          logout
        </GlobalMenuLink>
      </div>
    </>
  );

  return (
    <GlobalNavigationWrapper>
      <LogoWrapper>
        <LogoLink to="/">
          <img src={LOGO_URI} alt="" />
        </LogoLink>
      </LogoWrapper>
      <GlobalMenuWrapper>{!loading && (isAuthenticated ? authLinks : guestLinks)}</GlobalMenuWrapper>
    </GlobalNavigationWrapper>
  );
};

GlobalNavigation.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logout },
)(GlobalNavigation);
