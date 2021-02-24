import React, { Component } from 'react';
import { Link } from 'gatsby';

import Layout from '@common/Layout';
import { StaticQuery, graphql } from 'gatsby'

import Footer from '@sections/Footer';
import Navbar from '@common/Navbar';

import styled from 'styled-components';
import PostLink from "../components/common/PostLink"
import PostTag from "../components/common/PostTag"


class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedTag: 'default',};
  }

  // selectTag = (tag) => {
  //   console.log(tag)
  //   this.setState({selectedTag: tag});
  // };

  const selectTag = (tag) => {
    this.setState({selectedTag: tag});
  }

  const selectNoTags = () => {
    this.setState({selectedTag: ''})
  }

  return (
    <StaticQuery
      query={graphql`
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
                  tags
                }
              }
            }
          }
        }
      `}
      render={data => {
        const response = data.allMarkdownRemark.edges
        let Posts = <div>nothing yet</div>;
        let Tags = <div>nothing here</div>;
        if (!!response) {
          Posts = response
            .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
            .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
          Tags = response
            .map(edge => <PostTag key={edge.node.id} post={edge.node} />)
        }
        return (
        <Layout>
        <Navbar />
        <MainMatter>
          <h1 className="title-main">articles</h1>
          <h2 className="subtitle-main">Here are some of my collections of words and other things:</h2>
          <div>{Tags}</div>
          <div>{Posts}</div>
          <Link className="home-link" to="/">Go back to the homepage</Link>
        </MainMatter>
        <Footer bottomImage={false}/>
        </Layout>
        )
      }}
    />
  )
}

const MainMatter = styled.div`
  padding-top: 22vh;
  padding-left: 16px;
  padding-right: 16px;
  max-width: 816px;
  display: block;
  margin: 16px auto;

  h2 {
    margin-bottom: 16px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    // margin-bottom: 96px;
  }
`;

// export default Articles;
