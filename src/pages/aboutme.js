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
        }
      }
    `}
    render={data => (
    <Layout>
      <Navbar />
      <MainMatter className="page-main">
        <Art><Img fluid={data.stefan_img.childImageSharp.fluid} /></Art>
        <h1 className="title-main">about this guy</h1>
        <p className="subtitle-main">Stefan Nowak is a (he/him) from 🇬🇧 London, England.</p>
        <p className="text">He is &#189; 🇯🇵 Japanese, &#188; 🇱🇻 Latvian, &#188; 🇵🇱 Polish.</p>
        <p className="text">He grew up in south London, and went to school in Sutton.</p>
        <p className="text">He is a master procrastinator, and it's a wonder that he really gets anything done at all.</p>
        <Grid>
          <Card>
            <h3 className="title-main">resumé &rarr;</h3>
            <p>view my CV</p>
          </Card>
          <Card>
            <h3 className="title-main">tech &rarr;</h3>
            <p>technologies I've used</p>
          </Card>
          <Card>
            <h3 className="title-main">projects &rarr;</h3>
            <p>some of my work</p>
          </Card>
          <Card>
            <h3 className="title-main">photos &rarr;</h3>
            <p>pictures I've taken</p>
          </Card>
        </Grid>
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
`;

export default AboutMe;
