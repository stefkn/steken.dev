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
            <h1 className="title-main">articles</h1>
            <h2 className="subtitle-main">here are some topics i have written about:</h2>
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
  padding-top: 10em;
  padding-bottom: 10em;
  min-height: 100vh;

  @keyframes animatetext {
    0% { transform: translate3d(0, 10%, 0); opacity: 0%;}
    100% { transform: translate3d(0, 0, 0); opacity: 100%;}
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    padding-top: 10em;
    grid-template-columns: 1fr;
    text-align: left;
  }

  h1 {
    line-height: 1.3328;
    font-size: clamp(4.6rem, 12vw - 1.5rem, 6.5rem);

    animation-delay: 0s;
    animation: animatetext 1s;
    animation-fill-mode: forwards;
  }

  h3 {
    line-height: 1.3328;
    font-size: clamp(2.0rem, 12vw - 1.5rem, 3.2rem);

    animation-delay: 1s;
    animation: animatetext 2s;
    animation-fill-mode: forwards;
  }

  p {
    font-size: clamp(1.6rem, 12vw - 1.5rem, 2.0rem);
    overflow-wrap: break-word;
    -webkit-font-smoothing: antialiased;
    font-family: Inter, Helvetica, sans-serif;
    font-weight: 300;
    font-style: normal;
    letter-spacing: -.02em;
    text-transform: none;
    line-height: 1.3328;
    margin-top: 2em;
    margin-bottom: 0;
    white-space: pre-wrap;
    margin-top: 1em;

    animation-delay: 2s;
    animation: animatetext 2s;
    animation-fill-mode: forwards;
  }
`;

export default Articles;
