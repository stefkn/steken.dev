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
      <RecentPostsDiv id="recent-articles">
        Recent Posts
      </RecentPostsDiv>
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
