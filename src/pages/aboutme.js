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

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    // margin-bottom: 96px;
  }
`;

export default AboutMe;
