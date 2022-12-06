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

const RecentPostsDiv = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  padding 16px;
  max-width: 816px;
  bottom: 35em;
`

export default RecentPosts;
