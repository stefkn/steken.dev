import React, { useState, useEffect } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '@common/Layout';

import Footer from '@sections/Footer';
import Navbar from '@common/Navbar';

import styled from 'styled-components';
import { AboutMeContainer } from '@components/global';


const AboutMe = () => {
  const [scroll, setScroll] = useState(true)

  useEffect(() => {
    let isMounted = true

    function scrollEventHandler () {
      const scrolledBelowPoint = window.scrollY < 20;

      if (scroll !== scrolledBelowPoint) {
        setScroll(scrolledBelowPoint)

        // for Notched devices -- modify theme based on if the navbar is blue or not so we don't have a jarring bar around the notch.
        const themeMeta = document.getElementById('theme-color-meta');
        if (scrolledBelowPoint) {
          const tm = themeMeta.setAttribute("content", '#2f39ae');
        } else {
          const tm = themeMeta.setAttribute("content", '#f7f7f7');
        }
      }
    }

    if (isMounted) {
      document.addEventListener("scroll", scrollEventHandler)
    }
    return () => {
      isMounted = false
      document.removeEventListener("scroll", scrollEventHandler);
    };
  })

  const loadAdobeViewSDK = function () {
    document.dispatchEvent(
      new Event(
        "loadAdobeSDKNow",
        {"bubbles":true, "cancelable":false}
      )
    );

    setTimeout(() => {
      var adobeDCView = new window.adobe_dc_view_sdk.default({
          clientId: `${process.env.ADOBE_API_KEY}`,
          divId: 'adobe-dc-view',
      });

      adobeDCView.previewFile({
            content: { location: { url: '/CV_2022.pdf' } },
            metaData: { fileName: 'CV_2022.pdf' },
          },{
            embedMode: "IN_LINE",
            dockPageControls: false,
          }
      );
    }, 500);

    document.getElementById('load-pdf-btn').style.display = 'none'
  }

  return (
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
          go_logo: file(
            sourceInstanceName: { eq: "stack" }
            name: { eq: "go" }
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
        <Navbar isAtTopOfPage={scroll} />
        <HeroImage>
          <HeroOverlay></HeroOverlay>
          <Img fluid={data.stefan_img.childImageSharp.fluid} />
        </HeroImage>
        <AboutMeContainer>
          <MainMatter>
            <h1>
              About
            </h1>

            <h3>
              Welcome to my site.
            </h3>

            <p>
              This is the website of Stefan Kenichiro Nowak.
            </p>

            <p>
              I'm a <b>software engineer,</b> currently living and working in the <b>south of London, England.</b>
            </p>

            <p>
              I enjoy working and learning together with people of <b>all levels of experience, domains of expertise, and from diverse social and cultural backgrounds.</b>
            </p>

            <p>
              I work best in environments that empower individuals with a <b>high degree of autonomy, trust, and the freedom to experiment and innovate.</b>
            </p>

            <p>
              At its worst, tech can be an intimidating, elitist and exclusionary place. At its best, it can be <b>delightful, inclusive and empowering</b> – a place where <b>all</b> people can come together to learn, grow, and build. I want to work with tech teams and organisations who consider it just as much a part of their mission to create <b>strong, positive, ethical engineering cultures</b> as it is to <b>ship great software.</b>
            </p>

            <p>
              My personal philosophy (specifically regarding software, tech, and working together) is inspired by the <a href="https://www.recurse.com/manual">User's Manual of the Recurse Center</a>. I especially like their <a href="https://www.recurse.com/manual#sec-environment">Social Rules</a>, which are a great framework for building a <b>culture of trust</b> and <b>collaboration</b>, and banning a number of highly irritating "smart person" anti-social behaviors.
            </p>

            <p>
              I was inspired to build a personal website by fellow engineers and friends: <a href="https://healeycodes.com/">healeycodes</a>, <a href="https://www.moonclash.com/">moonclash</a> (AKA the adam sandler of software), <a href="https://samlader.com/">saml</a>, <a href="https://matteo.baldelli.dev/">matteo</a> and many more. What's up yo!
            </p>

            <section className="section-tech">
              <div className="section-tech-container">
                <strong className="section-tech-title">My technology stack</strong>
                <h2>Technologies I have used, and like to use</h2>
                <div className="technology-stack">
                  <div className="row">
                    <div className="col tech-stack-item-col">
                      <div className="tech-stack-item-logo">
                      <img src={data.python_logo.publicURL} alt="Python logo" />
                      </div>
                      <div className="stack-item-text">
                        <h4><a href="https://www.python.org/">Python</a></h4>
                        <p>I'm most experienced using Python.</p>
                      </div>
                    </div>

                    <div className="col tech-stack-item-col">
                      <div className="tech-stack-item-logo">
                        <img src={data.flask_logo.publicURL} alt="Flask logo" />
                      </div>
                      <div className="stack-item-text">
                        <h4><a href="https://flask.palletsprojects.com/">Flask</a></h4>
                        <p>Big Flask web apps! Werkzeug! UWSGI!</p>
                      </div>
                    </div>

                    <div className="col tech-stack-item-col">
                      <div className="tech-stack-item-logo">
                        <img src={data.vue_logo.publicURL} alt="VueJS logo" />
                      </div>
                      <div className="stack-item-text">
                        <h4><a href="https://vuejs.org/">Vue.js</a></h4>
                        <p>We made a frontend app using VueJS for tails.com</p>
                      </div>
                    </div>

                    <div className="col tech-stack-item-col">
                      <div className="tech-stack-item-logo">
                        <img src={data.javascript_logo.publicURL} alt="JavaScript logo" />
                      </div>
                      <div className="stack-item-text">
                        <h4><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript</a></h4>
                        <p>I use a lot of JS in personal and work projects.</p>
                      </div>
                    </div>

                    <div className="col tech-stack-item-col">
                      <div className="tech-stack-item-logo">
                        <img src={data.go_logo.publicURL} alt="Golang logo" />
                      </div>
                      <div className="stack-item-text">
                        <h4><a href="https://go.dev/">Go</a></h4>
                        <p>I've completed a few coding challenges in Golang.</p>
                      </div>
                    </div>

                    <div className="col tech-stack-item-col">
                      <div className="tech-stack-item-logo">
                        <img src={data.gatsby_logo.publicURL} alt="Gatsby logo" />
                      </div>
                      <div className="stack-item-text">
                        <h4><a href="https://www.gatsbyjs.com/">Gatsby</a></h4>
                        <p>This site is made using Gatsby.</p>
                      </div>
                    </div>

                    <div className="col tech-stack-item-col">
                      <div className="tech-stack-item-logo">
                        <img src={data.react_logo.publicURL} alt="React logo" />
                      </div>
                      <div className="stack-item-text">
                        <h4><a href="https://reactjs.org/">React</a></h4>
                        <p>Cue "I develop fulstack with React and Node" <a href="/fullstack.jpeg">meme</a></p>
                      </div>
                    </div>

                    <div className="col tech-stack-item-col">
                      <div className="tech-stack-item-logo">
                        <img src={data.graphql_logo.publicURL} alt="GraphQL logo" />
                      </div>
                      <div className="stack-item-text">
                        <h4><a href="https://graphql.org/">GraphQL</a></h4>
                        <p>I learned a lot of GQL working with Gatsby. We also use it to integrate  microservices at work.</p>
                      </div>
                    </div>

                    <div className="col tech-stack-item-col">
                      <div className="tech-stack-item-logo">
                        <img src={data.mysql_logo.publicURL} alt="MySQL logo" />
                      </div>
                      <div className="stack-item-text">
                        <h4><a href="https://www.mysql.com/">MySQL</a></h4>
                        <p>Still don't fully understand JOINS... <a href="https://www.youtube.com/watch?v=w3ZRLllWgHI">Anyone who says they do is lying!</a></p>
                      </div>
                    </div>

                    <div className="col tech-stack-item-col">
                      <div className="tech-stack-item-logo">
                        <img src={data.java_logo.publicURL} alt="Java logo" />
                      </div>
                      <div className="stack-item-text">
                        <h4><a href="https://www.java.com/en/">Java</a></h4>
                        <p>public static void main uuhh...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <h3>Coding Tunes</h3>
            <p>
              While I work, I find it helpful to listen to music to get me into the Code Zone (tm) which is usually a lot of repetitive Techno, Trance, EDM and House music (original, I know) and I have some of the best tracks organised into Spotify playlists. If you'd like, you can give them a listen here! I hope they aid your concentration too.
            </p>
            <div className="spotify-container">
              <iframe title="spotify-1" className="spotify-embed"
              src="https://open.spotify.com/embed/playlist/33KRDnK7r5ni98VbD4fFcI?theme=1"
              width="100%" height="375" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              <iframe title="spotify-2" className="spotify-embed"
              src="https://open.spotify.com/embed/playlist/7KgJoiKb4HKasiHp2r9xv8"
              width="100%" height="375" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>

            <h3>My CV / Résumé</h3>
            <h6 className="cv-subtitle">AKA ye grande PDF of self-congratulation</h6>
            <div id="load-pdf-btn" onClick={loadAdobeViewSDK} className="load-pdf-btn"> Load the PDF! </div>
            <div id="adobe-dc-view" style={{width: '100%', height: '100%', boxShadow: '3px 7px 9px 0px rgb(152 160 255)', borderRadius: '16px'}}></div>
          </MainMatter>
        </AboutMeContainer>
        <Footer bottomImage={false} />
      </Layout>
      )}
    />
  )
}

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
  margin-top: 72px;
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
    font-family: ${props => props.theme.font.primary};

    animation-delay: 1s;
    animation: animatetext 2s;
    animation-fill-mode: forwards;
  }

  h6.cv-subtitle {
    line-height: 1.2;
    margin: 0px;
    font-weight: 200;
  }

  p {
    font-size: clamp(1.6rem, 12vw - 1.5rem, 2.0rem);
    overflow-wrap: break-word;
    -webkit-font-smoothing: antialiased;
    font-family: ${props => props.theme.font.primary};
    font-weight: 300;
    font-style: normal;
    letter-spacing: -.02em;
    text-transform: none;
    line-height: 1.3328;
    margin-top: 2em;
    margin-bottom: 0;
    white-space: pre-wrap;
    margin-top: 1em;

    animation-delay: 2s;
    animation: animatetext 2s;
    animation-fill-mode: forwards;
  }

  .section-tech {
    padding: 62px 22px 48px 22px;
    background: #e2e4ff52;
    border: solid rgba(22,0,91,.2);
    border-width: 1px 0;
    margin-bottom: 42px;
    margin-top: 42px;
    font-size: 16px;
    line-height: 1.51;

    .row {
      margin: 10px;
      display: flex;
      flex-wrap: wrap;
    }

    .tech-stack-item-logo {
      background-color: white;
      border-radius: 16px;
      margin: 16px;
      padding: 22px;
      box-shadow: -2px -2px 20px 2px #00000014;
      max-height: 105px;

      img {
        width: 60px;
        height: 60px;
      }
    }

    // .tech-stack-item-col:before {
    //   content: "";
    //   background: rgba(22,0,91,.2);
    //   width: 1px;
    //   bottom: 29px;
    //   position: absolute;
    //   top: 32px;
    //   right: 0;
    // }

    .tech-stack-item-col {
      display: flex;
      // border-bottom: 1px solid rgba(22,0,91,.2);
      position: relative;
      width: 33%;

      @media (max-width: ${props => props.theme.screen.xl}) {
        width: 33%;
      }
      @media (max-width: ${props => props.theme.screen.md}) {
        width: 50%;
      }
      @media (max-width: ${props => props.theme.screen.sm}) {
        width: 100%;
      }
      @media (max-width: ${props => props.theme.screen.xs}) {
        width: 100%;
      }

      .stack-item-text {
        padding: 0px 10px 0px 0px;
      }

      p {
        font-size: 18px;
      }

      h4 {
        font-size: 18px;
      }
    }
  }

  .load-pdf-btn {
    background-color: rgb(255 95 149);
    padding: 20px;
    border-radius: 40px;
    margin: auto;
    max-width: 319px;
    width: 60%;
    cursor: pointer;
    text-align: center;
    box-shadow: 3px 5px 12px 0px #00000029;
    color: white;
    font-weight: 600;
  }

  .load-pdf-btn:hover {
    bottom: 1px;
    box-shadow: 6px 5px 20px 0px rgba(255, 0, 106, 53%);
  }

  .spotify-container {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;


    .spotify-embed {
      border-radius: 8px;
      box-shadow: -2px -2px 16px 2px #0000004a;

      @media (max-width: ${props => props.theme.screen.md}) {
        width: 100%;
      }
      width: 40%;

      margin: 40px;
      background-color: rgb(40, 40, 40);

      animation-delay: 0s;
      animation: animatetext 2s;
      animation-fill-mode: forwards;
    }
   }
`;


export default AboutMe;
