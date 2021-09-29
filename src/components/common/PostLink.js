import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';
import Img from 'gatsby-image';

const PostLink = ({ post, coverImage }) => (
  <PostEntry>
    {(coverImage) &&
      <Link to={post.frontmatter.slug}>
        <Img className="cover-image" fluid={coverImage.childImageSharp.fluid} />
      </Link>
    }
    <div className="post-date">{post.frontmatter.date}</div>
    <h3 className="subtitle-main">
        <Link to={post.frontmatter.slug}>
          {post.frontmatter.title}
        </Link>
    </h3>
    <p className="excerpt">{post.frontmatter.excerpt}</p>
    <p className="read-more"><Link to={post.frontmatter.slug}>Read more... ({post.frontmatter.reading_time} min read)</Link></p>
  </PostEntry>
)

export default PostLink

const PostEntry = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;

  .cover-image {
    border-radius: 6px;
    margin: 4px;
  }

  h3 {
    color: #2f39ae !important;
    font-family: Inter, Helvetica, sans-serif;
    font-weight: 600;
  }

  a:-webkit-any-link {
    color: #2f39ae;
    cursor: pointer;
    text-decoration: none;
  }

  p.excerpt {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    line-height: 1.3328;
  }

  .post-date {
    font-size: 16px;
    color: #2f39ae;
  }

  .read-more {
    font-size: 16px;
    color: #2f39ae;
  }

  width: 100%;
  background-color: rgb(236 235 255);
  box-shadow: -1px 4px 14px 3px #aeb4ff75;
  border-radius: 9px;
  padding: 22px;

  animation-delay: 0s;
  animation: animatetext 1s;
  animation-fill-mode: forwards;

  @keyframes animatetext {
    0% { transform: translate3d(0, 10%, 0); opacity: 0%;}
    100% { transform: translate3d(0, 0, 0); opacity: 100%;}
  `;