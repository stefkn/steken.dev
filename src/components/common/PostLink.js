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
  margin-top: 2em;
  margin-bottom: 2em;

  h3 {
    color: #2f39ae !important;
  }

  a:-webkit-any-link {
    color: #2f39ae;
    cursor: pointer;
    text-decoration: underline;
  }

  p.excerpt {
    font-size: 16px;
    line-height: 1.2;
    margin-top: 2em;
  }

  width: 100%;
  background-color: rgb(236 235 255);
  border-radius: 9px;
  padding: 22px;
  cursor: pointer;
  `;