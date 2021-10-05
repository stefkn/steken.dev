import React, { Component } from 'react';
// import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollspy from 'react-scrollspy';
import { Link } from 'gatsby';
import { Container } from '@components/global';
import {
  Nav,
  NavItem,
  Brand,
  StyledContainer,
  NavListWrapper,
  MobileMenu,
  Mobile,
} from './style';

import { ReactComponent as MenuIcon } from '@static/icons/menu.svg';

const NAV_ITEMS = [['About Me', '🧬 About Me'], ['Articles', '📚 Articles']];

class Navbar extends Component {
  state = {
    mobileMenuOpen: false,
  };

  toggleMobileMenu = () => {
    this.setState(prevState => ({ mobileMenuOpen: !prevState.mobileMenuOpen }));
  };

  closeMobileMenu = () => {
    if (this.state.mobileMenuOpen) {
      this.setState({ mobileMenuOpen: false });
    }
  };

  getNavAnchorLink = item => (
    <a href={`/${item[0].toLowerCase().replace(/\s/g, '')}`} onClick={this.closeMobileMenu}>
      {item[1]}
    </a>
  );

  getNavList = ({ mobile = false }) => (
    <NavListWrapper mobile={mobile}>
      <Scrollspy
        items={NAV_ITEMS.map(item => item[0].toLowerCase())}
        currentClassName="active"
        mobile={mobile}
        offset={-64}
      >
        {NAV_ITEMS.map(navItem => (
          <NavItem key={navItem[0]}>{this.getNavAnchorLink(navItem)}</NavItem>
        ))}
      </Scrollspy>
    </NavListWrapper>
  );

  render() {
    const { mobileMenuOpen } = this.state;

    return (
      <Nav {...this.props} className={this.props.isAtTopOfPage ? "at-top" : "not-at-top"}>
        <StyledContainer>
          <Brand><Link to="/" id="navbar-title">steken.dev</Link></Brand>
          <Mobile>
            <button onClick={this.toggleMobileMenu}>
              <MenuIcon />
            </button>
          </Mobile>

          <Mobile hide>{this.getNavList({})}</Mobile>
        </StyledContainer>
        <Mobile>
          {mobileMenuOpen ? (
            <MobileMenu className="fade-in">
              <Container>{this.getNavList({ mobile: true })}</Container>
            </MobileMenu>
          ) :
          (<MobileMenu className="fade-out">
              <Container>{this.getNavList({ mobile: true })}</Container>
            </MobileMenu>)
          }
        </Mobile>
      </Nav>
    );
  }
}

export default Navbar;
