import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import { boxSizing } from './Mixins';

const GlobalStyleComponent = createGlobalStyle`
    ${reset};

    html {
        ${boxSizing(`border-box`)}
    }

    *,
    *:after,
    *:before {
        ${boxSizing(`inherit`)}
    }

    body{}

    a{
        color: inherit;
        text-decoration: none;
    }
    
`;

export default GlobalStyleComponent;
