import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Container } from '@components/global';
import ExternalLink from '@common/ExternalLink';

const headerstyle = {
  'fontFamily': 'Rubik',
  'fontSize': '114px',
  // 'color': 'rgb(255, 107, 107)',
  // 'mixBlendMode': 'difference',
  // 'mixBlendMode': 'color-dodge',
  'color': 'rgb(230, 200, 200)',
  'fontWeight': '400',
  'marginLeft': '-9px',
  'letterSpacing': '-5px',
  'zIndex': '5',
  'marginBottom': '21px'
}
const headersecondarystyle = {
  'fontFamily': 'IBM Plex Mono',
  'fontWeight': '400',
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
                Stefan Kenichiro Nowak is <br /> a full-stack software engineer <br /> in 🇬🇧 London, UK.
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



  // background-color: #000866;
  // background: linear-gradient(90deg, rgb(46, 42, 105) 0%, rgba(9,9,121,1) 35%, rgb(255, 120, 120) 100%);
  // background: linear-gradient(90deg,rgba(24, 22, 56, 0.42) 0%,rgb(15, 15, 148) 35%,rgba(255, 120, 120, 0.55) 100%);
  // background: linear-gradient(90deg,rgba(0, 0, 0, 0.42) 0%,rgba(123, 28, 90, 0.76) 35%,rgba(94, 239, 88, 0.87) 100%);
  // background: linear-gradient(90deg,#004daa00 0%,#ff006852 35%,rgba(79, 255, 72, 0) 100%);
  background: linear-gradient(107deg,#004daa00 -12%,#ff00e0b8 1%,rgba(79,255,72,0) 70%);

  position: absolute;
  z-index: 0;
  mix-blend-mode: difference;
  border-radius: 10px;

  // height: 62vh;
  // bottom: 328px;
  // width: 34vw;

  height: 600px;
  bottom: 555px;
  left: 20vw;
  width: 66vw;

  @media (max-width: 380px) {
    display: none;
  }

  // between here defaults apply ---v^

  @media (min-width: 420px) {

  }

  @media (min-width: ${props => props.theme.screen.xs}) {
    max-width: 540px;
  }

  @media (min-width: ${props => props.theme.screen.sm}) {
    max-width: 720px;
  }

  @media (min-width: ${props => props.theme.screen.md}) {
    max-width: 960px;
  }

  @media (max-width: 1200px) {
    bottom: 714px;
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

const StyledExternalLink = styled(ExternalLink)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.color.black.regular};
  }
`;

export default Header;
