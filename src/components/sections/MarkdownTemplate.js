
import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby";

import Layout from '@common/Layout';
import Navbar from '@common/Navbar';
import Footer from '@sections/Footer';
import { Container } from '@components/global';

import styled from 'styled-components';

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const [scroll, setScroll] = useState(0)
  deckDeckGoHighlightElement();
  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY < 100
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck)
      }
    })
  })
  return (
    <Layout>
        <Navbar isAtTopOfPage={scroll} />
        <Container>
          <Article className="page-main">
              <h1 className="title-main">{frontmatter.title}</h1>
              <h2 className="subtitle-main">{frontmatter.subtitle}</h2>
              <h2 className="subtitle-date">{frontmatter.date}</h2>
              <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
              />
          </Article>
        </Container>
        <Footer bottomImage={false} />
    </Layout>
  )
}

const Article = styled.div`
  margin-bottom: 12em;
  margin: 10em auto;
  max-width: 640px;

  body {
    background: linear-gradient(181deg, #a8afff 1%, transparent 20%);
  }

  @media (min-width: ${props => props.theme.screen.md}) {
    width: 70%;
  }

  font-family: ${props => props.theme.font.secondary};

  .blog-post-content {
    padding-top: 4em;
  }

  h1 {
    font-size: calc(4 * 1rem);
    max-width: 100%;
    overflow: hidden;
    font-size: clamp(4rem, 12vw - 4.5rem, 6rem);
    filter: drop-shadow(1px -1px 45px #2f39ae);
  }

  h2 {
    margin-top: 1em;
    -webkit-font-smoothing: antialiased;
    font-family: ${props => props.theme.font.primary};
    font-weight: 400;
    font-style: normal;
    letter-spacing: -.02em;
  }

  h3 {
    margin-top: 1em;
    font-family: ${props => props.theme.font.primary};
  }

  .subtitle-main {
    color: #ff146f;
  }
  .subtitle-date {
    color: #564F62;
  }

  p {
    -webkit-font-smoothing: antialiased;
    font-family: ${props => props.theme.font.secondary};
    font-weight: 300;
    font-style: normal;
    letter-spacing: -.02em;
    line-height: 1.62;
    color: #080d22;
    font-size: clamp(1.3rem, 12vw - 4.5rem, 1.5rem);
    margin-top: 1em;
  }

  a {
    color: #ff146f;
  }

  ul, ol, table {
    font-size: 24px;
    color: #564F62;
  }

  table {
    margin-block-end: 24px;
    margin-block-start: 24px;
  }

  blockquote {
    display: block;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 20px;
    margin-inline-end: 20px;
    background-color: #ebebeb;
    border-radius: 10px;
    padding: 24px;
    margin: 32px;
  }

  --deckgo-highlight-code-font-family: ${props => props.theme.font.monospace};
  --deckgo-highlight-code-token-function: #ff146f;
  --deckgo-highlight-code-token-comment: #0914ff;
  --deckgo-highlight-code-carbon-background: #00075f;
  --deckgo-highlight-code-carbon-box-shadow: none;
  --deckgo-highlight-code-container-height: max-content;
  --deckgo-highlight-code-carbon-overflow: hidden;
  --deckgo-highlight-code-scroll: none;

  code {
    element::-webkit-scrollbar { width: 0 !important }
    font-family: ${props => props.theme.font.monospace};
    font-size: clamp(1.3rem, 12vw - 4.5rem, 1.5rem);
    background-color: #ff6ba7;
    font-weight: 500;
    border-radius: 5px;
    padding: 3px;
    color: #ffffff;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    // margin-bottom: 96px;
  }

  .footnotes {
    margin-top: 8em;
  }

  ul {
    color: #080d22;
    line-height: 1.5;

    li {
      margin-top: 1em;
    }
  }

  .footnotes {
    img {
      border-radius: 12px;
    }
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
        subtitle
        cover_image
      }
    }
  }
`