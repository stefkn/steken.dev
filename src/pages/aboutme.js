import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '@common/Layout';

import Footer from '@sections/Footer';
import Navbar from '@common/Navbar';

import styled from 'styled-components';
import { Container } from '@components/global';


const AboutMe = () => (
  <StaticQuery
    query={graphql`
      query {
        stefan_img: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "stefan" }
        ) {
          childImageSharp {
            fluid(maxWidth: 2048) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        },
        python_logo: file(
          sourceInstanceName: { eq: "stack" }
          name: { eq: "python" }
        ) {
          publicURL
        }
        flask_logo: file(
          sourceInstanceName: { eq: "stack" }
          name: { eq: "flask" }
        ) {
          publicURL
        }
        vue_logo: file(
          sourceInstanceName: { eq: "stack" }
          name: { eq: "vue" }
        ) {
          publicURL
        }
        mysql_logo: file(
          sourceInstanceName: { eq: "stack" }
          name: { eq: "mysql" }
        ) {
          publicURL
        }
        javascript_logo: file(
          sourceInstanceName: { eq: "stack" }
          name: { eq: "javascript" }
        ) {
          publicURL
        }
        gatsby_logo: file(
          sourceInstanceName: { eq: "stack" }
          name: { eq: "gatsby" }
        ) {
          publicURL
        }
        java_logo: file(
          sourceInstanceName: { eq: "stack" }
          name: { eq: "java" }
        ) {
          publicURL
        }
        react_logo: file(
          sourceInstanceName: { eq: "stack" }
          name: { eq: "react" }
        ) {
          publicURL
        }
        graphql_logo: file(
          sourceInstanceName: { eq: "stack" }
          name: { eq: "graphql" }
        ) {
          publicURL
        }
      }
    `}
    render={data => (
    <Layout>
      <Navbar />
      <HeroImage><HeroOverlay></HeroOverlay><Img fluid={data.stefan_img.childImageSharp.fluid} /></HeroImage>
      <Container>
        <MainMatter>
          <h1>About</h1>

          <h3>Welcome to my site.</h3>

          <p>This is the website of Stefan Kenichiro Nowak.</p>

          <p>I'm a software engineer, currently living and working in London, England.</p>

          <p>
            I enjoy teamwork and solving problems collaboratively with people of varying levels of experience, domains of expertise, and from diverse social and cultural backgrounds.
          </p>

          <p>
            I work best in environments that empower individuals with a high degree of autonomy, the freedom to make decisions and where people are valued partners in a journey–not work robots for hire.
          </p>

          <p>
            My personal philosophy (specifically regarding software, and working together) is heavily inspired by the <a href="https://www.recurse.com/manual">User's Manual of the Recurse Center</a>. I especially like their <a href="https://www.recurse.com/manual#sec-environment">Social Rules</a>.
          </p>

          <p>
            I was inspired to start writing articles and publishing them on a personal website by fellow engineers and friends: <a href="https://healeycodes.com/">healeycodes</a>, <a href="https://www.moonclash.com/">moonclash</a> (the adam sandler of software), <a href="https://samlader.com/">saml</a>, <a href="https://matteo.baldelli.dev/">matteo</a> and more.
          </p>

          <section class="section-tech">
            <div class="section-tech-container">
              <strong class="section-tech-title">My technology stack</strong>
              <h2>Technologies I have used, and like to use</h2>
              <div class="technology-stack">
                <div class="row">

                  <div class="col tech-stack-item-col">
                    <div class="tech-stack-item-logo">
                     <img src={data.python_logo.publicURL} />
                    </div>
                    <div class="stack-item-text">
                      <h4>Python</h4>
                      <p>I'm most experienced using Python. good code snek</p>
                    </div>
                  </div>

                  <div class="col tech-stack-item-col">
                    <div class="tech-stack-item-logo">
                      <img src={data.flask_logo.publicURL} />
                    </div>
                    <div class="stack-item-text">
                      <h4>Flask</h4>
                      <p>I use a lot of Flask at work. Jinja, mmm. </p>
                    </div>
                  </div>

                  <div class="col tech-stack-item-col">
                    <div class="tech-stack-item-logo">
                      <img src={data.vue_logo.publicURL} />
                    </div>
                    <div class="stack-item-text">
                      <h4>Vue.js</h4>
                      <p>We made a Vue.js microfrontend! </p>
                    </div>
                  </div>

                  <div class="col tech-stack-item-col">
                    <div class="tech-stack-item-logo">
                      <img src={data.mysql_logo.publicURL} />
                    </div>
                    <div class="stack-item-text">
                      <h4>MySQL</h4>
                      <p>We use a MySQL DB at work. Still don't fully understand JOINS.</p>
                    </div>
                  </div>

                  <div class="col tech-stack-item-col">
                    <div class="tech-stack-item-logo">
                      <img src={data.javascript_logo.publicURL} />
                    </div>
                    <div class="stack-item-text">
                      <h4>JavaScript</h4>
                      <p>I use a lot of JS in personal and work projects. NaN projects.</p>
                    </div>
                  </div>

                  <div class="col tech-stack-item-col">
                    <div class="tech-stack-item-logo">
                      <img src={data.gatsby_logo.publicURL} />
                    </div>
                    <div class="stack-item-text">
                      <h4>Gatsby</h4>
                      <p>This site is made using Gatsby. I'm liking it so far.</p>
                    </div>
                  </div>

                  <div class="col tech-stack-item-col">
                    <div class="tech-stack-item-logo">
                      <img src={data.java_logo.publicURL} />
                    </div>
                    <div class="stack-item-text">
                      <h4>Java</h4>
                      <p>Java was my first "proper" OOP language. public static void uuhh </p>
                    </div>
                  </div>

                  <div class="col tech-stack-item-col">
                    <div class="tech-stack-item-logo">
                      <img src={data.react_logo.publicURL} />
                    </div>
                    <div class="stack-item-text">
                      <h4>React</h4>
                      <p>Are you even a developer these days without React on your CV?</p>
                    </div>
                  </div>

                  <div class="col tech-stack-item-col">
                    <div class="tech-stack-item-logo">
                      <img src={data.graphql_logo.publicURL} />
                    </div>
                    <div class="stack-item-text">
                      <h4>GraphQL</h4>
                      <p>I learned a lot of GQL working with Gatsby. We also use it at work.</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          <p>
            While I work, I like to listen to concentration-boosting music, which I try to organise into Spotify playlists, if I'm feeling diligent. Take a listen!
          </p>

          <div class="spotify-container">
            <iframe class="spotify-embed"
            src="https://open.spotify.com/embed/playlist/33KRDnK7r5ni98VbD4fFcI?theme=1"
            width="100%" height="375" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <iframe class="spotify-embed"
            src="https://open.spotify.com/embed/playlist/7KgJoiKb4HKasiHp2r9xv8"
            width="100%" height="375" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
        </MainMatter>
      </Container>
      <Footer bottomImage={false} />
    </Layout>
    )}
  />
);

const HeroOverlay = styled.div`
  width: 100%;
  min-height: 100%;
  position: absolute;

  z-index: 1;
  background: black;
  background: linear-gradient(
    11deg,
    rgb(247 247 247) 23%,
    #dd99ff69 76%,
    #ff006685 96% );
`

const HeroImage = styled.div`
  width: 100%;
  position: absolute;
  max-height: 100%;
  display: flex;
  flex-direction: column;
`

const MainMatter = styled.div`
  padding-top: 30em;
  padding-bottom: 10em;
  min-height: 100vh;
  position: relative;
  z-index: 2;

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    padding-top: 10em;
  }

  @keyframes animatetext {
    0% { transform: translate3d(0, 10%, 0); opacity: 0%;}
    100% { transform: translate3d(0, 0, 0); opacity: 100%;}
  }

  h1 {
    line-height: 1.3328;
    font-size: clamp(4.6rem, 12vw - 1.5rem, 6.5rem);

    animation-delay: 0s;
    animation: animatetext 1s;
    animation-fill-mode: forwards;
  }

  h3 {
    margin-top: 1em;
    line-height: 1.3328;
    font-size: clamp(2.0rem, 12vw - 1.5rem, 3.2rem);

    animation-delay: 1s;
    animation: animatetext 2s;
    animation-fill-mode: forwards;
  }

  p {
    overflow-wrap: break-word;
    -webkit-font-smoothing: antialiased;
    font-family: Inter, Helvetica, sans-serif;
    font-weight: 300;
    font-style: normal;
    letter-spacing: -.02em;
    text-transform: none;
    line-height: 1.3328;
    font-size: calc(2.2 * 1rem);
    color: #2f39ae;
    margin-top: 0;
    margin-bottom: 0;
    white-space: pre-wrap;
    margin-top: 2em;
  }

  .text {
    margin-top: 32px;
  }
  .text-first {
    margin-top: 62px;
  }
`;

const Art = styled.figure`
  width: 14em;
  margin: 0;
  top: 16px;
  z-index: 0;

  Img {
    border-radius: 20px;
  }

  > div {
    width: 120%;
    margin-bottom: -4.5%;
  }

  div picture img {
    top: 20px;
  }
`;

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin-top: 64px;
`

const Card = styled.div`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  background-color: rgb(236 235 255);

  @media (max-width: ${props => props.theme.screen.md}) {
    flex-basis: 100%;
  }

  .card-title {
    font-size: 38px;
    margin-top: 18px;
  }
`

export default AboutMe;
