import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '@common/Layout';

import Footer from '@sections/Footer';
import Navbar from '@common/Navbar';

import styled from 'styled-components';

const AboutMe = () => (
  <StaticQuery
    query={graphql`
      query {
        stefan_img: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "me2" }
        ) {
          childImageSharp {
            fluid(maxWidth: 673) {
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
      <MainMatter className="page-main">
        <Art><Img fluid={data.stefan_img.childImageSharp.fluid} /></Art>
        <h1 className="title-main">about stefan</h1>
        Human; human, after all.
        <Link className="home-link" to="/">Go back to the homepage</Link>
      </MainMatter>
      <Footer bottomImage={false} />
    </Layout>
    )}
  />
);

const MainMatter = styled.div`
  padding-top: 22vh;

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    // margin-bottom: 96px;
  }

  .subtitle-main {
    margin-top: 46px;
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
    margin-top: 1em;

    u {
      -webkit-text-fill-color: #2f39ae;
    }
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
