import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '@common/Layout';
import Navbar from '@common/Navbar';
import Footer from '@sections/Footer';
import { Link } from 'gatsby';
import { Container } from '@components/global';

import styled from 'styled-components';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const [scroll, setScroll] = useState(true);
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    let isMounted = true;

    function scrollEventHandler() {
      setScrollDepth(window.scrollY);
      const scrolledBelowPoint = window.scrollY < 20;

      if (scroll !== scrolledBelowPoint) {
        setScroll(scrolledBelowPoint);

        // for Notched devices -- modify theme based on if the navbar is blue or not so we don't have a jarring bar around the notch.
        const themeMeta = document.getElementById('theme-color-meta');
        if (scrolledBelowPoint) {
          const tm = themeMeta.setAttribute('content', '#2f39ae');
        } else {
          const tm = themeMeta.setAttribute('content', '#f7f7f7');
        }
      }
    }

    if (isMounted) {
      document.addEventListener('scroll', scrollEventHandler);
    }
    return () => {
      isMounted = false;
      document.removeEventListener('scroll', scrollEventHandler);
    };
  });

  return (
    <Layout>
      <Navbar isAtTopOfPage={scroll} />
      {data.articleImages.edges.find(
        edge =>
          edge.node.childImageSharp.fluid.originalName ===
          frontmatter.cover_image
      ) && (
        <HeroImageWrapper>
          <HeroImage>
            <HeroOverlay
              style={{ height: 60 + scrollDepth / 10 + '%' }}
            ></HeroOverlay>
            <Img
              fluid={
                data.articleImages.edges.find(
                  image =>
                    image.node.childImageSharp.fluid.originalName ===
                    frontmatter.cover_image
                ).node.childImageSharp.fluid
              }
            />
          </HeroImage>
        </HeroImageWrapper>
      )}
      <Container>
        <Article className="page-main">
          <div className="frontmatter">
            <h1 className="title-main" title-content={frontmatter.title}>
              {frontmatter.title}
            </h1>
            <h2 className="subtitle-main">{frontmatter.subtitle}</h2>
            <h2 className="subtitle-date">{frontmatter.date}</h2>
            <Link to="/articles" class="articles-link">
              ⏎ Back to all articles
            </Link>
          </div>
          <div className="main-content">
            <div className="mid-content">
              <div className="author-image">
                <Img
                  fluid={
                    data.articleImages.edges.find(
                      image =>
                        image.node.childImageSharp.fluid.originalName ===
                        frontmatter.author_image
                    ).node.childImageSharp.fluid
                  }
                />
                <p>Stefan Nowak</p>
              </div>
              <div className="tag-pills">
                {frontmatter.tags.split(' ').map(tag => {
                  return (
                    <div className="tag-pill">
                      <p>{tag}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </Article>
        <ArticleBottomSpacer></ArticleBottomSpacer>
      </Container>
      <Footer bottomImage={false} />
    </Layout>
  );
}

const ArticleBottomSpacer = styled.div`
  position: relative;
  height: 200px;
`;

const HeroOverlay = styled.div`
  width: 100%;
  min-height: 100%;
  position: absolute;

  z-index: 1;

  background: linear-gradient(
    6deg,
    rgb(0 5 255) 0%,
    rgb(64 0 255 / 39%) 0%,
    rgb(214 110 255 / 20%) 19%,
    rgb(255 155 235 / 47%) 93%,
    rgb(20 28 115 / 0%) 100%
  );

  mix-blend-mode: hard-light;

  @media (max-width: ${props => props.theme.screen.md}) {
    height: 70%;
  }
`;

const HeroImage = styled.div`
  z-index: -1;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0px;

  transition-duration: 0.8s;
  transition-delay: 0s;

  overflow: hidden;

  position: sticky;
  top: 0px;
`;

const HeroImageWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
`;

const Article = styled.div`
  margin: 10em auto;
  max-width: 52em;

  .gatsby-resp-image-wrapper, .gatsby-resp-image-image, .gatsby-resp-image-link, .gatsby-resp-image-background-image {
    border-radius: 12px !important;
  }

  .frontmatter {
    background-color: rgb(37 37 37);
    border: 1px solid rgba( 255,255,255,0.18 );
    border-radius: 10px;
    padding: 40px 40px 90px 40px;
    box-shadow: 0 12px 34px 0 rgb(0 0 0 / 60%);
    position: relative;

    @media (max-width: ${props => props.theme.screen.xs}) {
      border-radius: 0px;
      border: 0px;
    }

    animation-delay: 0s;
    animation: fadeup 1s;
    animation-fill-mode: forwards;
  }

  .articles-link {
    color: rgb(255 255 255);
    background-color: rgb(233 30 99);
    box-shadow: 0 6px 18px 0 rgb(0 0 0 / 30%);
    border-radius: 100px;
    margin-top: 20px;
    padding: 6px 16px;
    position: absolute;
  }
  .articles-link:hover {
    box-shadow: 6px 5px 20px 0px rgba(255, 0, 106, 53%);
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
    border: 1px solid rgba( 255,255,255,0.18 );

    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

    justify-content: center;

    background-image: linear-gradient(
      153deg,rgb(34 67 255),
      rgb(250 38 255 / 53%)
    );
    border-radius: 11px;
    margin-top: 12px;
    padding: 10px 10px;

    box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);

    @media (max-width: ${props => props.theme.screen.xs}) {
      border-radius: 0px;
      border: 0px;
    }

    @media (min-width: ${props => props.theme.screen.md}) {
      background-image: linear-gradient(
        153deg, rgb(88 113 255 / 60%), rgb(174 0 244 / 64%)
      );
      justify-content: space-between;
    }

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
        box-shadow: 0 6px 18px 0 rgb(0 0 0 / 30%);
        border-radius: 100px;
        margin: 12px 6px;
        padding: 10px 26px;
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
      flex-wrap: wrap;
      justify-content: center;

      animation-delay: 1s;
      animation: fadeup 1s;
      animation-fill-mode: forwards;

      .tag-pill {
        background-color: rgb(37 37 37);
        box-shadow: 0 6px 18px 0 rgb(0 0 0 / 30%);
        border-radius: 100px;
        margin: 6px 6px;
        padding: 6px 16px;

        @media (min-width: ${props => props.theme.screen.md}) {
          margin: 12px 6px;
          padding: 6px 16px;
        }

        p {
          background-image: linear-gradient(
            321deg,
            rgb(31 48 255) 0,
            rgb(238 141 255) 30%,
            rgb(199 168 255) 50%,
            rgb(255 163 163) 70%,
            rgb(255 109 159) 90%,
            rgb(255 144 182) 100%
          );
          background-size: 100%;
          background-repeat: repeat;
          -webkit-background-clip: text;
          -webkit-text-fill-color: rgb(0 0 0 / 0%);
          -moz-background-clip: text;
          -moz-text-fill-color: transparent;
          font-weight: 600;
          font-size: 16px;
          margin: 0px;

          @media (min-width: ${props => props.theme.screen.md}) {
            font-size: 22px;
          }
        }
      }
    }
  }

  // font-family: ${props => props.theme.font.secondary};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

  .blog-post-content {
    background: rgb(255 255 253);
    padding: 2em 2em;
    border-radius: 12px;
    margin-top: 1em;
    box-shadow: 0px -9px 20px 0px #19191991;

    @media (max-width: ${props => props.theme.screen.xs}) {
      border-radius: 6px;
      border: 0px;
    }

    @media (max-width: ${props => props.theme.screen.md}) {
      padding: 1em 1em;
      margin-top: 6em;
    }

    animation-delay: 1s;
    animation: fadeup 1s;
    animation-fill-mode: forwards;

    h1 {
      line-height: normal;
      background-image: linear-gradient(288deg, #292929, rgb(47 47 47));
      margin-top: 32px;
      letter-spacing: -1.6px;
    }
  }

  h1 {
    max-width: 100%;
    font-weight: 600;
    overflow: hidden;
    font-size: clamp(2.6rem, 12vw - 4.5rem, 3rem);

    background-image: linear-gradient(
      321deg,
      rgb(31 48 255) 0,
      rgb(238 141 255) 30%,
      rgb(199 168 255) 50%,
      rgb(255 163 163) 70%,
      rgb(255 109 159) 90%,
      rgb(255 144 182) 100%
    );
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: rgb(0 0 0 / 0%);
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }

  h2 {
    margin-top: 2.2em;
    -webkit-font-smoothing: antialiased;
    font-family: ${props => props.theme.font.primary};
    font-weight: 600;
    line-height: 33px;
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
    margin-top: 1em;
  }

  .subtitle-date {
    color: #564F62;
    margin-top: 1em;
  }

  p {
    -webkit-font-smoothing: auto;
    // font-family: ${props => props.theme.font.secondary};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    font-style: normal;
    line-height: 1.76;
    color: #080d22;
    font-size: clamp(1.15rem, 12vw - 4.5rem, 1.5rem);
    margin-top: 1.6em;
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

  // --deckgo-highlight-code-font-family: ${props =>
    props.theme.font.monospace};
  --deckgo-highlight-code-font-family: Source Code Pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  --deckgo-highlight-code-token-function: #ff146f;
  --deckgo-highlight-code-token-regex: #ff146f;
  --deckgo-highlight-code-token-comment: #84a2ff;
  --deckgo-highlight-code-token-property: #84a2ff;
  --deckgo-highlight-code-token-selector: #afa8ff;
  --deckgo-highlight-code-carbon-background: #000d5b;
  --deckgo-highlight-code-carbon-box-shadow: none;
  --deckgo-highlight-code-container-height: max-content;
  --deckgo-highlight-code-carbon-overflow: scroll;
  --deckgo-highlight-code-scroll: none;
  --deckgo-highlight-code-font-size: clamp(0.8rem, 12vw - 4.5rem, 1.1rem);

  code {
    element::-webkit-scrollbar { width: 0 !important }
    // font-family: ${props => props.theme.font.monospace};
    font-family: Source Code Pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    background-color: #4150ff;
    font-weight: 400;
    border-radius: 4px;
    padding: 0px 10px;
    color: #ffffff;
    border: 1px solid rgb(0 9 255);
    line-height: 1.5;
    overflow-wrap: break-word;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    // margin-bottom: 96px;
  }

  @media (min-width: ${props => props.theme.screen.xl}) {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    max-width: 1230px;
    position: relative;

    .frontmatter {
      min-width: 600px;
      margin-right: 40px;
      position: sticky;
      top: 151px;
    }

    .main-content {
      margin-top: 200px;
      min-width: 60%;
      max-width: 60%;
    }
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
    articleImages: allFile(
      filter: { sourceInstanceName: { eq: "article_images" } }
    ) {
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
`;
