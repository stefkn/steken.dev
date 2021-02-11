import styled from 'styled-components';

import { Container } from '@components/global';

export const Nav = styled.nav`
  padding: 16px 0;
  background-color: ${props => props.theme.color.primary};
  position: fixed;
  width: 100%;
  height: 5em;
  top: 0;
  z-index: 1000;
  -webkit-transition: background-color 500ms linear;
  -ms-transition: background-color 500ms linear;
  transition: background-color 500ms linear;

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
  font-family: ${props => props.theme.font.secondary};
  ${props => props.theme.font_size.small};

  a {
    text-decoration: none;
    color: white;
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
  transform: skewY(-13deg);
  float: right;
  height: 66vh;
  position: relative;
  bottom: 0em;
  border-radius: 12px;
  padding: 20px;
  text-align-last: end;
  margin: 10px 70px 10px 10px;
  z-index: 3;
  background: -webkit-linear-gradient(top,#1e2386 20%,rgba(229,229,229,0) 100%);
  `;

export const Brand = styled.div`
  font-family: ${props => props.theme.font.primary};
  color: white;
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
`;
