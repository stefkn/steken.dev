
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
  const [scrollDepth, setScrollDepth] = useState(0)

  useEffect(() => {
    let isMounted = true

    function scrollEventHandler () {
      setScrollDepth(window.scrollY)
      const scrolledBelowPoint = window.scrollY < 20;

      if (scroll !== scrolledBelowPoint) {
        setScroll(scrolledBelowPoint)

        // for Notched devices -- modify theme based on if the navbar is blue or not so we don't have a jarring bar around the notch.
        const themeMeta = document.getElementById('theme-color-meta');
        if (scrolledBelowPoint) {
          const tm = themeMeta.setAttribute("content", '#2f39ae');
        } else {
          const tm = themeMeta.setAttribute("content", '#f7f7f7');
        }
      }
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
        {
          (
            data.articleImages.edges.find(
              edge =>
              edge.node.childImageSharp.fluid.originalName === frontmatter.cover_image
            )
          )
          &&
          <HeroImage id="article-bg-gradient" style={{"height": 60+scrollDepth/10 + '%' }}>
            <HeroOverlay></HeroOverlay>
            <Img fluid={
              data.articleImages.edges.find(
                image =>
                image.node.childImageSharp.fluid.originalName === frontmatter.cover_image
              ).node.childImageSharp.fluid
            } />
          </HeroImage>
        }
        <Container>
          <Article className="page-main">
              <div className="frontmatter">
                <h1
                  className="title-main"
                  title-content={frontmatter.title}
                >
                  {frontmatter.title}
                </h1>
                <h2 className="subtitle-main">{frontmatter.subtitle}</h2>
                <h2 className="subtitle-date">{frontmatter.date}</h2>
              </div>
              <div className="main-content">
                <div className="mid-content">
                  <div className="author-image">
                    <Img fluid={
                      data.articleImages.edges.find(
                        image =>
                        image.node.childImageSharp.fluid.originalName === frontmatter.author_image
                      ).node.childImageSharp.fluid
                    } />
                    <p>Stefan Nowak</p>
                  </div>
                  <div className='tag-pills'>
                    {frontmatter.tags.split(' ').map((tag) => {return <div className="tag-pill"><p>{tag}</p></div>})}
                  </div>
                </div>
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

  background: linear-gradient(6deg,rgb(0 5 255) 0%,rgb(64 0 255 / 36%) 0%,rgb(214 110 255 / 49%) 19%,rgb(255 155 189 / 60%) 93%,rgb(20 28 115 / 0%) 100% );
  mix-blend-mode: hard-light;
`

const HeroImage = styled.div`
  z-index: -1;
  width: 100%;
  position: absolute;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  top: 0px;

  transition-duration: 0.8s;
  transition-delay: 0s;

  @media (max-width: ${props => props.theme.screen.md}) {
    height: 70%;
  }
`

const Article = styled.div`
  margin-bottom: 12em;
  margin: 10em auto;
  max-width: 52em;

  .frontmatter {
    background-color: rgb(37 37 37);
    border-radius: 10px;
    padding: 40px;
    box-shadow: 0 12px 34px 0 rgb(0 0 0 / 60%);

    animation-delay: 0s;
    animation: fadeup 1s;
    animation-fill-mode: forwards;
  }

  .title-main {
    position: relative;
    z-index: 1;
  }

  body {
    background: linear-gradient(181deg, #a8afff 1%, transparent 20%);
  }

  @media (min-width: ${props => props.theme.screen.md}) {
    width: 100%;
  }

  .mid-content {
    border-bottom: solid;
    border-bottom-width: 0px;
    border-bottom-color: rgb(247 247 247);

    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    .author-image {
      min-width: 80px;
      display: inline-flex;
      align-items: center;
      margin: 10px 0px;

      @media (min-width: ${props => props.theme.screen.md}) {
        margin: 16px 16px;
      }

      .gatsby-image-wrapper {
        min-width: 80px;

        @media (min-width: ${props => props.theme.screen.md}) {
          min-width: 100px;
        }
      }

      img {
        border-radius: 300px;
        object-fit: fill;
      }

      p {
        margin: 0px 26px;
        font-weight: 600;
        color: white;

        background-color: rgb(37 37 37);
        box-shadow: 0 12px 34px 0 rgb(0 0 0 / 60%);
        border-radius: 100px;
        margin: 12px 6px;
        padding: 10px;
        animation-delay: 1s;
        animation: fadeup 1s;
        animation-fill-mode: forwards;
      }

      animation-delay: 1s;
      animation: fadeup 1s;
      animation-fill-mode: forwards;
    }

    .tag-pills {
      display: inline-flex;

      animation-delay: 1s;
      animation: fadeup 1s;
      animation-fill-mode: forwards;

      .tag-pill {
        background-color: rgb(37 37 37);
        box-shadow: 0 12px 34px 0 rgb(0 0 0 / 60%);
        border-radius: 100px;
        margin: 12px 6px;
        padding: 10px;

        p {
          background-image: linear-gradient(321deg,rgb(31 48 255) 0,rgb(238 141 255) 30%,rgb(199 168 255) 50%,rgb(255 163 163) 70%,rgb(255 109 159) 90%,rgb(255 144 182) 100%);
          background-size: 100%;
          background-repeat: repeat;
          -webkit-background-clip: text;
          -webkit-text-fill-color: rgb(0 0 0 / 0%);
          -moz-background-clip: text;
          -moz-text-fill-color: transparent;
          font-weight: 600;
          font-size: 22px;
          margin: 0px;
        }
      }
    }
  }

  // font-family: ${props => props.theme.font.secondary};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

  .blog-post-content {
    background: linear-gradient(180deg, rgb(247 247 247) 0%, rgb(0 0 0 / 0%) 80%);
    padding: 0.2em 2em;
    border-radius: 12px;
    margin-top: 1em;
    box-shadow: 0 3px 14px 0 rgb(0 0 0 / 10%);

    @media (max-width: ${props => props.theme.screen.md}) {
      padding: 1em 2em;
      margin-top: 1em;
    }

    animation-delay: 1s;
    animation: fadeup 1s;
    animation-fill-mode: forwards;
  }

  h1 {
    max-width: 100%;
    font-weight: 600;
    overflow: hidden;
    font-size: clamp(2.6rem, 12vw - 4.5rem, 4rem);

    background-image: linear-gradient(321deg,rgb(31 48 255) 0,rgb(238 141 255) 30%,rgb(199 168 255) 50%,rgb(255 163 163) 70%,rgb(255 109 159) 90%,rgb(255 144 182) 100%);
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: rgb(0 0 0 / 0%);
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }

  h2 {
    margin-top: 0.6em;
    -webkit-font-smoothing: antialiased;
    font-family: ${props => props.theme.font.primary};
    font-weight: 400;
    font-style: normal;
    letter-spacing: -.04em;
    font-size: clamp(1.4rem, 12vw - 4.5rem, 2rem);
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
    line-height: 1.42;
    color: #080d22;
    font-size: clamp(1.15rem, 12vw - 4.5rem, 1.5rem);
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
        author_image
        tags
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