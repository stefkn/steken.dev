import styled from 'styled-components';

import { Container } from '@components/global';

export const Nav = styled.nav`
  padding: 16px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;


  .fade-in {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.5s linear;
  }

  .fade-out {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.5s, opacity 0.5s linear;
  }
`;

export const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavListWrapper = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;

    ${({ mobile }) =>
      mobile &&
      `
        flex-direction: column;
        margin-top: 1em;

        > ${NavItem} {
          margin: 0;
          margin-top: 0.75em;
        }
      `};
  }

`;

export const NavItem = styled.li`
  margin: 0 0.75em;
  font-family: ${props => props.theme.font.primary};
  ${props => props.theme.font_size.small};

  a {
    text-decoration: none;
    filter: drop-shadow(7px -13px 22px #000000);
  }

  &.active {
    a {
      opacity: 1;
    }
  }
`;

export const MobileMenu = styled.div`
  width: 15em;
  -webkit-transform: skewY(
  -13deg);
  -ms-transform: skewY(8deg);
  transform: skewY(8deg);
  float: right;
  height: 12em;
  position: relative;
  bottom: 0em;
  border-radius: 12px;
  padding: 20px;
  text-align-last: end;
  margin: 10px 70px 10px 10px;
  z-index: 3;
  background: #4150ff94;
  box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
  -webkit-backdrop-filter: blur( 6px );
  backdrop-filter: blur( 6px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255,255,255,0.18 );
  `;

export const Brand = styled.div`
  font-family: ${props => props.theme.font.primary};
  ${props => props.theme.font_size.large};
`;

export const Mobile = styled.div`
  display: none;

  @media (max-width: ${props => props.theme.screen.md}) {
    display: block;
  }

  ${props =>
    props.hide &&
    `
    display: block;

    @media (max-width: ${props.theme.screen.md}) {
      display: none;
    }
  `}

  button {
    background-color: #ff0067c9;
    padding: 9px 9px 6px 10px;
    box-shadow: black;
    box-shadow: 40px black;
    border-radius: 100px;
  }
`;
