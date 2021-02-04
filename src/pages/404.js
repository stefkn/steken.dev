import React from 'react';
import { Link } from 'gatsby';

import Layout from '@common/Layout';
import Footer from '@sections/Footer';
import Navbar from '@common/Navbar';

import styled from 'styled-components';

const NotFoundPage = () => (
  <Layout>
    <Navbar />
    <MainMatter>
      <h1>404 Not Found</h1>
      <p>Sad face.</p>
      <Link to="/">Go back to the homepage</Link>
    </MainMatter>
    <Footer bottomImage={true} />
  </Layout>
);

const MainMatter = styled.div`
  padding-top: 22vh;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;

  h2 {
    margin-bottom: 16px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    // margin-bottom: 96px;
  }
`;

export default NotFoundPage;
