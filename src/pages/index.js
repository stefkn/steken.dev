import React from 'react';

import Layout from '@common/Layout';
import Navbar from '@common/Navbar';

import HeaderAnimation from '@components/HeaderAnimationGH'
import Header from '@sections/Header';
import About from '@sections/About';
import Footer from '@sections/Footer';


const IndexPage = () => (
  <Layout>
    <HeaderAnimation />
    <Navbar isAtTopOfPage={true} isTransparent={true} />
    <Header />
    <About />
    <Footer bottomImage={false} />
  </Layout>
);

export default IndexPage;
