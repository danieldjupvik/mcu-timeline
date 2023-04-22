import { createGlobalStyle } from 'styled-components'

import Bangers from './assets/fonts/Bangers/Bangers-Regular.ttf'
import LatoLight from './assets/fonts/Lato/Lato-Light.ttf'
import LatoRegular from './assets/fonts/Lato/Lato-Regular.ttf'
import LatoBold from './assets/fonts/Lato/Lato-Bold.ttf'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Bangers';
    src: url(${Bangers}) format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoLight}) format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoBold}) format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: 'Lato', sans-serif;
    background: rgb(0, 0, 0);
    color: white;
    margin: 0px;
  }
`

export default GlobalStyles
