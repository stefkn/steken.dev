
import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby";
import Img from 'gatsby-image';

import Layout from '@common/Layout';
import Navbar from '@common/Navbar';
import Footer from '@sections/Footer';
import { Container } from '@components/global';

import styled from 'styled-components';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const [scroll, setScroll] = useState(true)

  useEffect(() => {
    let isMounted = true

    function scrollEventHandler () {
      setScroll(window.scrollY < 100)
    }

    if (isMounted) {
      document.addEventListener("scroll", scrollEventHandler)
    }
    return () => {
      isMounted = false
      document.removeEventListener("scroll", scrollEventHandler);
    };
  })

  return (
    <Layout>
        <Navbar isAtTopOfPage={scroll} />
        {(data.articleImages.edges.find(edge => edge.node.childImageSharp.fluid.originalName === frontmatter.cover_image)) &&
          <HeroImage><HeroOverlay></HeroOverlay><Img fluid={data.articleImages.edges.find(image => image.node.childImageSharp.fluid.originalName === frontmatter.cover_image).node.childImageSharp.fluid} /></HeroImage>
        }
        <Container>
          <Article className="page-main">
              <h1 className="title-main">{frontmatter.title}</h1>
              <div className="main-content">
                <h2 className="subtitle-main">{frontmatter.subtitle}</h2>
                <h2 className="subtitle-date">{frontmatter.date}</h2>
                <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
          </Article>
        </Container>
        <Footer bottomImage={false} />
    </Layout>
  )
}

const HeroOverlay = styled.div`
  width: 100%;
  min-height: 100%;
  position: absolute;

  z-index: 1;
  background: linear-gradient(11deg, rgb(247, 247, 247) 30%, rgba(221, 153, 255, 55%) 76%, rgba(255, 0, 102, 52%) 96% );
`

const HeroImage = styled.div`
  z-index: -1;
  width: 100%;
  position: absolute;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  top: 0px;
`

const Article = styled.div`
  margin-bottom: 12em;
  margin: 10em auto;
  max-width: 640px;

  .title-main {
    position: relative;
    z-index: 1;

    color: rgb(100 111 255);
    opacity: 100%;
    mix-blend-mode: difference;
  }

  body {
    background: linear-gradient(181deg, #a8afff 1%, transparent 20%);
  }

  @media (min-width: ${props => props.theme.screen.md}) {
    width: 70%;
  }

  // font-family: ${props => props.theme.font.secondary};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

  .blog-post-content {
    padding-top: 4em;
  }

  h1 {
    font-size: calc(4 * 1rem);
    max-width: 100%;
    overflow: hidden;
    font-size: clamp(4rem, 12vw - 4.5rem, 6rem);
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

  .main-content {
    position: relative;
  }

  .subtitle-main {
    color: rgb(120 131 255);
    mix-blend-mode: multiply;
  }
  .subtitle-date {
    color: #564F62;
  }

  p {
    -webkit-font-smoothing: auto;
    // font-family: ${props => props.theme.font.secondary};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    font-style: normal;
    // letter-spacing: -.02em;
    // line-height: 1.62;
    color: #080d22;
    font-size: clamp(1.3rem, 12vw - 4.5rem, 1.5rem);
    margin-top: 1em;
  }

  a {
    color: #ff146f;
  }

  ul, ol, table {
    font-size: clamp(1.3rem, 12vw - 4.5rem, 1.5rem);
    line-height: 1.62;
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

  // --deckgo-highlight-code-font-family: ${props => props.theme.font.monospace};
  --deckgo-highlight-code-font-family: Source Code Pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  --deckgo-highlight-code-token-function: #ff146f;
  --deckgo-highlight-code-token-regex: #ff146f;
  --deckgo-highlight-code-token-comment: #84a2ff;
  --deckgo-highlight-code-token-property: #84a2ff;
  --deckgo-highlight-code-token-selector: #afa8ff;
  --deckgo-highlight-code-carbon-background: #000d5b;
  --deckgo-highlight-code-carbon-box-shadow: none;
  --deckgo-highlight-code-container-height: max-content;
  --deckgo-highlight-code-carbon-overflow: hidden;
  --deckgo-highlight-code-scroll: none;

  code {
    element::-webkit-scrollbar { width: 0 !important }
    // font-family: ${props => props.theme.font.monospace};
    font-family: Source Code Pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    font-size: clamp(1.3rem, 12vw - 4.5rem, 1.5rem);
    background-color: rgb(93 72 255);
    font-weight: 400;
    border-radius: 4px;
    padding: 1px;
    color: #ffffff;
    border: 1px solid rgb(255 133 182);
    line-height: 1.5;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    // margin-bottom: 96px;
  }

  iframe {
    margin-top: 2em;
    border-radius: 12px;
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
    articleImages: allFile(filter: {sourceInstanceName: {eq: "article_images"}}) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 2048) {
              originalName
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`