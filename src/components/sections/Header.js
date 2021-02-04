import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Container } from '@components/global';

const headerstyle = {
  'fontSize': '114px',
  'color': 'rgb(230, 200, 200)',
  'marginLeft': '-9px',
  'zIndex': '5',
  'marginBottom': '21px',
  'letterSpacing': '-.01em',
  'fontFamily': 'Helvetica,sans-serif',
  'fontWeight': '500',
  'boxSizing': 'border-box',
  'display': 'inline-block',
  'textDecoration': 'none',
  'lineHeight': '86px',
}
const headersecondarystyle = {
  'fontFamily': 'IBM Plex Mono',
  'fontWeight': '300',
  'letterSpacing': '-.01em',
  'mixBlendMode': 'hard-light',
  'fontSize': '1em',
  'color': 'white',
  'lineHeight': '24px',
  'zIndex': '5',
  'position': 'relative'
}


const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        art_headerbg: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "headerbg" }
        ) {
          childImageSharp {
            fluid(maxWidth: 673) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <HeaderWrapper id="header-wrapper">
        <Container>
          <Grid>
            <ArtBackground></ArtBackground>
            <Art><Img fluid={data.art_headerbg.childImageSharp.fluid} /></Art>
            <Text>
              <h1 style={headerstyle} >
                Hi there.
              </h1>
              <br />
              <p className="subtext" style={headersecondarystyle}>
                Stefan Kenichiro Nowak is <br /> a full-stack software engineer <br /> in 🇬🇧 London, U.K.<br />
                This is his website.
              </p>
            </Text>
          </Grid>
        </Container>
      </HeaderWrapper>
    )}
  />
);

// TODO: Fix for multi screen sizes!
const ArtBackground = styled.div`
  @keyframes animatebgs {
    0% { transform: skewY(-13deg) translate3d(0, 50%, 0); opacity: 0%;}
    100% { transform: skewY(-13deg) translate3d(0, 0, 0); opacity: 90%;}
  }

  transform: skewY(-13deg);
  opacity: 0%;
  animation: animatebgs 2s;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
  background: linear-gradient(107deg,#004daa00 -12%,#ff00e0b8 1%,rgba(79,255,72,0) 70%);

  position: absolute;
  z-index: 0;
  mix-blend-mode: difference;
  border-radius: 10px;

  height: 600px;
  bottom: 285px;
  left: 10vw;
  width: 66vw;

  @media (min-width: ${props => props.theme.screen.xs}) {
    max-width: 540px;
  }

  @media (min-width: ${props => props.theme.screen.sm}) {
    max-width: 720px;
  }

  @media (min-width: ${props => props.theme.screen.md}) {
    max-width: 960px;
  }

  @media (min-width: ${props => props.theme.screen.lg}) {
    max-width: 1200px;
  }
`

const HeaderWrapper = styled.header`
  position: absolute;
  max-width: 100vw;
  width: 100%;
  top: 3vh;
  padding-top: 96px;
  height: 60em;
  display: block;
  background: #2f39ae;

  -webkit-transition: background-color 500ms linear;
  -ms-transition: background-color 500ms linear;
  transition: background-color 500ms linear;

  @media (max-width: ${props => props.theme.screen.md}) {
    padding-top: 128px;
  }

  @keyframes showTopText {
    0% { transform: translate3d(0, 100%, 0); opacity: 0%; }
    100% { transform: translate3d(0, 0, 0); opacity: 100%; }
  }

  @keyframes showSubText {
    0% { opacity: 0%; }
    100% { opacity: 100%; }
  }

  h1 {
    opacity: 0%;
    animation: showTopText 2s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    bottom: 0;
    transform: translate(0, 100%);
  }

  .subtext {
    opacity: 0%;
    animation: showSubText 4s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
  }
`;

const Art = styled.figure`
  width: 100%;
  margin: 0;
  top: 16px;
  z-index: 0;

  > div {
    width: 120%;
    margin-bottom: -4.5%;

    @media (max-width: ${props => props.theme.screen.md}) {
      width: 100%;
      top: -101px;
    }
  }

  div picture img {
    top: 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 64px;

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    grid-gap: 80px;

    > ${Art} {
      order: 2;
    }
  }
`;

const Text = styled.div`
  justify-self: center;

  @media (max-width: ${props => props.theme.screen.md}) {
    justify-self: start;
  }
`;

export default Header;
