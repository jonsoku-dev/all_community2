import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyleComponent = createGlobalStyle`
    ${reset}
`;

export default GlobalStyleComponent;
