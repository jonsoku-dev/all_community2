import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../../Styles/Device';
import { button } from '../../Styles/Mixins';

const SignupForm = styled.div`
  ${({ theme: { gray2, main_font, white } }) => css`
    color: ${gray2};
    font-family: ${main_font};
    a {
      color: ${gray2};
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    @media ${device.tablet} {
      background-color: rgba(0, 0, 0, 0.75);
      max-width: 450px;
      margin: 3rem auto 4rem auto;
      padding: 2rem 4rem;
      border-radius: 10px;
    }
    form {
      legend {
        color: ${white};
        font-size: 1.8rem;
        font-weight: bold;
        margin: 2rem 0;
      }
    }
  `}
`;
const Field = styled.div`
  ${({ theme: { gray, gray3 } }) => css`
    display: flex;
    margin-bottom: 0.8rem;
    position: relative;

    span {
      position: absolute;
      right: 1rem;
      top: 1rem;
      text-transform: uppercase;
      &:hover {
        cursor: pointer;
      }
    }
    label {
      position: absolute;
      top: 1.1rem;
      left: 1rem;
      transition: font-size 0.2s ease, top 0.2s ease;
    }
    input {
      padding: 1.3rem 1rem 0.7rem 1rem;
      flex: 1;
      background-color: ${gray};
      border: none;
      border-radius: 5px;
      &:focus {
        background-color: ${gray3};
        + label {
          font-size: 0.3rem;
          top: 0.5rem;
        }
      }
    }
  `}
`;
const Submit = styled.div`
  ${({ theme: { primary } }) => css`
    input {
      ${button(`${primary}`)}
      margin-top: 2rem;
    }
  `}
`;
const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  margin-bottom: 6rem;
  a,
  label {
    font-size: 0.8rem;
  }
`;
const RememberMe = styled.div``;
const BottomContent = styled.div`
  padding-bottom: 2rem;
  @media ${device.tablet} {
    padding-top: 3rem;
  }
  a {
    font-size: 0.8rem;
    display: flex;
  }
`;
const NewUser = styled(Link)`
  font-size: 1rem;
  margin-top: 1rem;

  span {
    color: ${props => props.theme.white};
    margin-left: 0.5rem;
  }
`;

const SignupPresenter = ({ name, email, password, password2, handleInput, handleSubmit }) => {
  return (
    <SignupForm>
      <form onSubmit={e => handleSubmit(e)}>
        <legend>Sign Up</legend>
        <Field>
          <input type="text" name="name" value={name} onChange={e => handleInput(e)}></input>
          <label>User Name</label>
        </Field>
        <Field>
          <input type="email" name="email" value={email} onChange={e => handleInput(e)}></input>
          <label>Email or Phone Number</label>
        </Field>
        <Field>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => handleInput(e)}
          ></input>
          <label>Password</label>
          <span>Show</span>
        </Field>
        <Field>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={e => handleInput(e)}
          ></input>
          <label>Password2</label>
          <span>Show</span>
        </Field>
        <Submit>
          <input type="submit" value="Sign Up" name="" />
        </Submit>
        <Actions>
          <RememberMe>
            <input type="checkbox" />
            <label>Remember Me</label>
          </RememberMe>
          <div>
            <Link to="#">Need Help?</Link>
          </div>
        </Actions>
      </form>

      <BottomContent>
        <Link to="#">Login with Facebook</Link>
        <NewUser to="#">
          Do you have a ID on Apink?<span>Sign In now.</span>
        </NewUser>
      </BottomContent>
    </SignupForm>
  );
};

export default SignupPresenter;
