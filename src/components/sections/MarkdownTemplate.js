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
        <Article className="page-main">
            <h1 className="title-main">{frontmatter.title}</h1>
            <h2 className="subtitle-main">{frontmatter.date}</h2>
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
  padding-top: 12em;

  .blog-post-content {
    padding-top: 4em;
  }

  h2 {
    margin-top: 1em;
    -webkit-font-smoothing: antialiased;
    font-family: Inter, Helvetica, sans-serif;
    font-weight: 400;
    font-style: normal;
    letter-spacing: -.02em;

  }

  p {
    margin-top: 1.8em;
    -webkit-font-smoothing: antialiased;
    font-family: Inter, Helvetica, sans-serif;
    font-weight: 300;
    font-style: normal;
    letter-spacing: -.02em;
    line-height: 1.42;
    color: #080d22;
    font-size: calc(1.5 * 1rem);
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
    font-family: SFMono-Regular,Consolas,'Liberation Mono',Menlo,Courier,monospace;
    font-size: 1em;
    background-color: #090d2e;
    border-radius: 5px;
    padding: 3px;
    color: #ffffff;
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