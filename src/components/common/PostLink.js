import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';

const PostLink = ({ post }) => (
  <PostEntry>
    <h3 className="subtitle-main">
        <Link to={post.frontmatter.slug}>
        {post.frontmatter.title}
        </Link>
    </h3>
        <p>{post.frontmatter.date}</p>
        <p class="excerpt">{post.excerpt}</p>
  </PostEntry>
)

export default PostLink

const PostEntry = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`;