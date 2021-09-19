import { createGlobalStyle } from 'styled-components';

const normalize = `
  /*! modern-normalize | MIT License | https://github.com/sindresorhus/modern-normalize */html{box-sizing:border-box}*,::after,::before{box-sizing:inherit}:root{-moz-tab-size:4;tab-size:4}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'}hr{height:0}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:SFMono-Regular,Consolas,'Liberation Mono',Menlo,Courier,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{padding:0}progress{vertical-align:baseline}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}
`;

const GlobalStyles = createGlobalStyle`
  ${normalize};

  * {
    transition: all .3s ease;
  }

  ::selection {
    background: #ff418d7a;
    opacity: 0.85;
  }

  body {
    font-family: ${props => props.theme.font.secondary};
    background: #f7f7f7;
  }

  h1, h2, h3, p {
    margin: 0;
    font-weight: normal;
  }

  h1, h2 {
    font-family: ${props => props.theme.font.primary};
  }

  h1 {
    ${props => props.theme.font_size.xlarge};
  }

  h2 {
    ${props => props.theme.font_size.larger};
  }

  h3 {
    ${props => props.theme.font_size.large};
  }

  p {
    ${props => props.theme.font_size.regular};
    color: ${props => props.theme.color.black.light};
  }

  @media (max-width: ${props => props.theme.screen.sm}) {
    h1 {
      ${props => props.theme.font_size.larger};
    }

    h2 {
      ${props => props.theme.font_size.large};
    }

    h3 {
      ${props => props.theme.font_size.regular};
    }

    p {
      ${props => props.theme.font_size.small};
    }
  }

  button {
    border: none;
    background: none;
    outline: none;
    padding: 0;
    cursor: pointer;
  }

  a {
    cursor: pointer;
  }

  .title-main {
    overflow-wrap: break-word;
    -webkit-font-smoothing: antialiased;
    letter-spacing: -.04em;
    font-family: Inter, Helvetica, sans-serif;
    font-weight: 400;
    font-style: normal;
    text-transform: none;
    line-height: 1.232;
    font-size: calc(4 * 1rem);
    margin: 1rem 0;
    color: #2f39ae;
    margin-top: 0;
    margin-bottom: 0;
    white-space: pre-wrap;
  }

  .subtitle-main {
    overflow-wrap: break-word;
    -webkit-font-smoothing: antialiased;
    font-family: Inter, Helvetica, sans-serif;
    font-weight: 300;
    font-style: normal;
    letter-spacing: -.02em;
    text-transform: none;
    line-height: 1.3328;
    font-size: calc(2.2 * 1rem);
    margin: 1rem 0;
    color: #2f39ae;
    margin-top: 0;
    margin-bottom: 0;
    white-space: pre-wrap;
  }

  deckgo-highlight-code {
    box-shadow: 0 12px 34px 0 rgb(0 0 0 / 60%);
    margin-top: 2.2em;
    margin-bottom: 2em;
  }

  .home-link {
    position: relative;
    top: 2em;
    color: #2f39ae;
    cursor: pointer;
    text-decoration: underline;
  }

  .visible {
    opacity: 100% !important;
  }

  .selelcted-tag-button {
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-name: breathing;
    background-color: #ff0066 !important;
    box-shadow: -2px 2px 7px 0px #ff0066 !important;
  }

  @keyframes breathing {
    0% { transform: translate(0px,  0px); }
    50%  { transform: translate(0px, -3px); }
    100%   { transform: translate(0px, 0px); }
  }

  @-webkit-keyframes breathing {
    0% { transform: translate(0px,  0px); }
    50%  { transform: translate(0px, -3px); }
    100%   { transform: translate(0px, 0px); }
  }

  body::-webkit-scrollbar-track
  {
    background-color: #2f39ae;
  }

  body::-webkit-scrollbar
  {
    width: 10px;
    background-color: #F5F5F5;
  }

  body::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    background-color: #b19ccf;
  }
`;

export default GlobalStyles;
