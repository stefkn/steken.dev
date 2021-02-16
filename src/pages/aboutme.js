import React from 'react';
import { Link } from 'gatsby';

import Layout from '@common/Layout';

import Footer from '@sections/Footer';
import Navbar from '@common/Navbar';

import styled from 'styled-components';

const AboutMe = () => (
  <Layout>
    <Navbar />
    <MainMatter className="page-main">
      <h1 className="title-main">about </h1>
      <p className="subtitle-main">Stefan Nowak is a (he/him) from London, England. He is &#189; Japanese, &#188; Latvian, &#188; Polish and 100% <a href="https://www.youtube.com/watch?v=8Dd_qiuWxPs">meat popsicle.</a></p>
      <Link className="home-link" to="/">Go back to the homepage</Link>
    </MainMatter>
    <Footer bottomImage={false} />
  </Layout>
);

const MainMatter = styled.div`
  padding-top: 22vh;
  max-width: 1200px;
  margin: 0em auto;
  padding-left: 16px;
  padding-right: 16px;

  h1 {
    font-family: Inter, Helvetica;
    font-size: 5em;
    letter-spacing: -.01em;
    margin: 1em auto;
    line-height: 1;
  }

  h2 {
    font-family: Inter, Helvetica;
    font-size: 4em;
    letter-spacing: -.05em;
    line-height: 1.1;
    font-weight: 200;
    margin: 1em auto;
    font-size: 3em;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    // margin-bottom: 96px;
  }
`;

export default AboutMe;
