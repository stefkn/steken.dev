import React, { Component } from 'react';
import { Link } from 'gatsby';

import Layout from '@common/Layout';
import { StaticQuery, graphql } from 'gatsby'

import Footer from '@sections/Footer';
import Navbar from '@common/Navbar';

import styled from 'styled-components';
import PostLink from "../components/common/PostLink"


class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedTag: ''};
  }

  selectTag(tag) {
    this.setState({selectedTag: tag});
  }

  selectNoTags = () => {
    this.setState({selectedTag: ''})
  };

  articleIsTagged(tag, article) {
    if (tag === '') {
      return true;
    } else {
      return article.node.frontmatter.tags.split(' ').indexOf(tag) === -1 ? false : true;
    }
  }

  addToTagList(tag, accumulator) {
    if (accumulator) {
      accumulator.indexOf(tag) === -1 ? accumulator.push(tag) : console.log("This item already exists: " + tag);
    }
  }

  render() {
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

          const reducer = (accumulator, currentValue) => {
            currentValue.forEach((tag) => this.addToTagList(tag, accumulator));
            return accumulator
          }

          let Posts = <div>No posts. 👽</div>;
          let Tags = <div>No tags. 💁‍♀️</div>;

          if (!!response) {
            Posts = response
              .filter(edge => this.articleIsTagged(this.state.selectedTag, edge))
              .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
            Tags = response
              .map(edge => edge.node.frontmatter.tags.split(' '))
              .reduce(reducer)
              .map(tag => <TagButton className={this.state.selectedTag === tag ? 'selelcted-tag-button': null} key={tag} onClick={(e) => this.selectTag(tag)}>{tag}</TagButton>)
          }

          return (
          <Layout>
          <Navbar />
          <MainMatter>
            <h3>{this.state.selectedTag}</h3>
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

export default Articles;
