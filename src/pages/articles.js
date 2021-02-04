import React from 'react';
import { Link } from 'gatsby';

import Layout from '@common/Layout';
import { graphql } from 'gatsby'

import Footer from '@sections/Footer';
import Navbar from '@common/Navbar';

import styled from 'styled-components';
import PostLink from "../components/common/PostLink"

const Articles = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
  return <Layout>
    <Navbar />
    <MainMatter>
      <h1>Articles</h1>
      <p>Here are some articles:</p>
      <div>{Posts}</div>
      <Link to="/">Go back to the homepage</Link>
    </MainMatter>
    <Footer bottomImage={false}/>
  </Layout>
}

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

export default Articles;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
        }
      }
    }
  }
`
