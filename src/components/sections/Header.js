import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Container } from '@components/global';

const headerstyle = {
  'fontSize': '114px',
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
  'color': 'white'
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
            <ArtBackground>
              <div class="fake-code">
                <p>
                  {`public static void main(string[] args)`}
                  <br />
                  {`public static void main(string[] args)`}
                  <br />
                  {`public static void main(string[] args)`}
                  <br />
                  {`public static void main(string[] args)`}
                  <br />
                  {`public static void main(string[] args)`}
                  <br />
                  {`public static void main(string[] args)`}
                  <br />
                  {`public static void main(string[] args)`}
                  <br />
                  {`public static void main(string[] args)`}
                  <br />
                </p>
              </div>
            </ArtBackground>
            <Art><Img fluid={data.art_headerbg.childImageSharp.fluid} /></Art>
            <HeaderText>
              <h1 style={headerstyle} >
                Hello.
              </h1>
              <br />
              <p className="subtext" style={headersecondarystyle}>
                Stefan Kenichiro Nowak is <br /> a full-stack software engineer in <br /> 🇬🇧 London, England.
              </p>
            </HeaderText>
          </Grid>
        </Container>
      </HeaderWrapper>
    )}
  />
);


const ArtBackground = styled.div`
  @keyframes animatebgs {
    0% { transform: skewY(-13deg) translate3d(0, 20%, 0); opacity: 0%;}
    100% { transform: skewY(-13deg) translate3d(0, 0, 0); opacity: 90%;}
  }

  transform: skewY(-13deg);
  animation: animatebgs 2s;
  animation-delay: 0s;
  animation-fill-mode: forwards;

  background: linear-gradient(128deg, rgba(131,58,180,0.3) 0%, rgba(253,29,29,0.55) 50%, rgba(252,176,69,0.7) 100%);
  box-shadow: -19px -17px 20px 0px rgb(30 33 78 / 33%);
  backdrop-filter: hue-rotate(10deg) blur(4px);
  -webkit-backdrop-filter: blur( 7.5px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  position: absolute;
  z-index: 0;

  height: 488px;
  width: 70vw;
  bottom: 285px;
  overflow: hidden;

  @media (min-width: ${props => props.theme.screen.xs}) {
    max-width: 540px;
    width: 80vw;
  }

  @media (min-width: ${props => props.theme.screen.sm}) {
    max-width: 720px;
    width: 60vw;
  }

  @media (min-width: ${props => props.theme.screen.md}) {
    max-width: 960px;
    width: 600px;
  }

  @media (min-width: ${props => props.theme.screen.lg}) {
    max-width: 1200px;
    width: 730px;
  }

  .fake-code {
    padding: 20px;
  }

  .fake-code > p {
    font-family: "IBM Plex Mono";
    color: #ffffff30;
    line-height: 30px;
    overflow: hidden;
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
