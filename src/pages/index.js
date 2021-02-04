import React from 'react';

import Layout from '@common/Layout';
import Navbar from '@common/Navbar';

import HeaderAnimation from '@components/HeaderAnimation'
import Header from '@sections/Header';
import About from '@sections/About';
import Footer from '@sections/Footer';

import styled from 'styled-components';

const HeaderAnimationBackground = styled.div`
position: absolute;
max-width: 100vw;
width: 100%;
height: 55em;
display: block;
background: #2f3be7;
    `

const IndexPage = () => (
  <Layout>
    <HeaderAnimationBackground />
    <HeaderAnimation />
    <Navbar />
    <Header />
    <About />
    <Footer bottomImage={true} />
  </Layout>
);

export default IndexPage;
