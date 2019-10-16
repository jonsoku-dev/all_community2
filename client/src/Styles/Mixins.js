import { css } from 'styled-components';

export const boxSizing = boxModel => css`
  box-sizing: ${boxModel};
`;

export const button = color => css`
  background-color: ${color};
  display: block;
  text-align: center;
  color: ${props => props.theme.white};
  text-decoration: none;
  border: none;
  width: 100%;
  border-radius: 5px;
  font-size: 0.8rem;
  padding: 1rem 0;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: darken(${color}, 10%);
    cursor: pointer;
  }
`;
