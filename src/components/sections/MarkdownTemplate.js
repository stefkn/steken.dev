import React from "react";
import { graphql } from "gatsby";

import Layout from '@common/Layout';
import Navbar from '@common/Navbar';
import Footer from '@sections/Footer';

import styled from 'styled-components';

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  deckDeckGoHighlightElement();
  return (
    <Layout>
        <Navbar />
        <Article>
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
            />
        </Article>
        <Footer bottomImage={false} />
    </Layout>
  )
}

const Article = styled.div`
  padding-top: 22vh;
  margin-bottom: 12vh;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;

  h1 {
    font-size: 5rem;
    line-height: 5rem;
    padding-bottom: 1em;
    font-family: Rubik;
  }

  h2 {
    margin-bottom: 16px;
    font-family: Rubik;
  }

  ul, ol, table {
    font-size: 24px;
    color: #564F62;
  }

  table {
    margin-block-end: 24px;
    margin-block-start: 24px;
  }

  --deckgo-highlight-code-font-family: IBM Plex Mono;
  --deckgo-highlight-code-token-function: #ff146f;
  --deckgo-highlight-code-token-comment: #0914ff;
  --deckgo-highlight-code-carbon-background: #00075f;
  --deckgo-highlight-code-carbon-box-shadow: none;
  --deckgo-highlight-code-container-height: max-content;
  --deckgo-highlight-code-carbon-overflow: hidden;
  --deckgo-highlight-code-scroll: none;

  code {
    element::-webkit-scrollbar { width: 0 !important }
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    // margin-bottom: 96px;
  }
`;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`