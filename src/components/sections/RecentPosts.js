import React, { Component } from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby'

import PostLink from "../common/PostLink"

class RecentPosts extends Component {
  isArticlePublished(article) {
    return article.node.frontmatter.published
  }

  getCoverImage(allImages, coverImageName) {
    let filteredImages = allImages.filter(image => this.isSameImageName(image, coverImageName))
    // if multiple are matched, return the first one
    return (filteredImages.length > 0) ? filteredImages[0].node : null
  }

  isSameImageName(image, coverImageName) {
    return image.node.childImageSharp.fluid.originalName === coverImageName
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query
          {
            articles: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
              edges {
                node {
                  id
                  frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    slug
                    series
                    title
                    tags
                    published
                    excerpt
                    reading_time
                    cover_image
                  }
                }
              }
            }
            articleImages: allFile(filter: {sourceInstanceName: {eq: "article_images"}}) {
              edges {
                node {
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                      originalName
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        `}
        render={queryResult => {
          const mdArticles = queryResult.articles.edges
            .filter(article => this.isArticlePublished(article))

          const coverImages = queryResult.articleImages.edges

          let Posts = <div style={{marginTop: '1em'}}>No posts. Watch this space!</div>;

          if (!!mdArticles && mdArticles.length > 0) {
            Posts = mdArticles
              .map(
                article =>
                <PostLink
                  key={article.node.id}
                  post={article.node}
                  coverImage={
                    this.getCoverImage(
                      coverImages,
                      article.node.frontmatter.cover_image,
                    )
                  }
                />
              )
          }

          return (
          <RecentPostsDiv>
            <h1>Recent Posts</h1>
            <PostsContainer>
              {Posts}
            </PostsContainer>
          </RecentPostsDiv>
          )
        }}
      />
    )
  }
}

const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 1em;
  margin-bottom: 1em;
`

const RecentPostsDiv = styled.div`
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
  text-transform: none;
  line-height: 1.3328;
  margin: 1rem 0;
  color: rgb(2 0 98);
  margin-top: 0;
  margin-bottom: 0;
  white-space: pre-wrap;
  margin-top: 4em;

  font-size: clamp(1.8rem, 12vw - 1.5rem, 2.3rem);

  border-radius: 20px;
  padding: 10px;
  z-index: 2;
  box-shadow: 0 8px 32px 0 rgb(0 0 0 / 19%);
  -webkit-backdrop-filter: blur( 4px );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgb(255 255 255 / 31%);

  @media (max-width: ${props => props.theme.screen.md}) {
    padding: 10px;
    background: rgb(233 30 99 / 12%);
  }

  transition: all 2s ease !important;
`

export default RecentPosts;
