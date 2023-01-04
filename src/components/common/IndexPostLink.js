import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';
import Img from 'gatsby-image';

const IndexPostLink = ({ post, coverImage }) => (
  <PostEntry>
    {(coverImage) &&
      <Link to={post.frontmatter.slug}>
        <Img className="cover-image" fluid={coverImage.childImageSharp.fluid} />
      </Link>
    }
    <div className="text-content">
      <div className="post-date">{post.frontmatter.date}</div>
      <h3 className="subtitle-main">
          <Link to={post.frontmatter.slug}>
            {post.frontmatter.title}
          </Link>
      </h3>
      <p className="excerpt">{post.frontmatter.excerpt}</p>
    </div>
    <p className="read-more">
      <Link to={post.frontmatter.slug}>Read more... ({post.frontmatter.reading_time} min read)</Link>
    </p>
  </PostEntry>
)

export default IndexPostLink
