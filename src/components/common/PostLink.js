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
    <div className="text-content">
      <div className="post-date">{post.frontmatter.date}</div>
      <h3 className="subtitle-main">
          <Link to={post.frontmatter.slug}>
            {post.frontmatter.title}
          </Link>
      </h3>
      <p className="excerpt">{post.frontmatter.excerpt}</p>
      <p className="read-more"><Link to={post.frontmatter.slug}>Read more... ({post.frontmatter.reading_time} min read)</Link></p>
    </div>
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
    font-family: ${props => props.theme.font.primary};
    font-weight: 600;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
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
    background: #293aff;
    border-radius: 10px;
    padding: 6px;
    text-align: center;
    max-width: 260px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    position: relative;
    cursor: pointer;
    border: 1px solid rgba(198, 203, 255, 39%);
  }
  .read-more:hover {
    bottom: 1px;
    box-shadow: 6px 5px 20px 0px rgba(255, 0, 106, 53%);
  }

  .text-content {
    position: relative;
    border-radius: 30px;
    padding: 42px;
    transform: skewY(6deg);
    border: 1px solid rgba(198, 203, 255, 39%);

    box-shadow: 7px 13px 20px 0px rgba(255, 183, 213, 62%);
    backdrop-filter: hue-rotate(312deg) blur(14px);
    -webkit-backdrop-filter: hue-rotate(312deg) blur(14px);
    top: -50px;
  }

  @media (max-width: 720px) {
    width: 100%;
  }

  width: 46%;
  margin: 2%;
  padding: 22px;

  animation-delay: 0s;
  animation: animatetext 1s;
  animation-fill-mode: forwards;

  @keyframes animatetext {
    0% { transform: translate3d(0, 10%, 0); opacity: 0%;}
    100% { transform: translate3d(0, 0, 0); opacity: 100%;}
  }

  background: linear-gradient(
    155deg,rgb(158, 14, 255, 29%) 0%,
    rgba(0, 20, 255, 12%) 20%,
    rgba(253, 29, 29, 39%) 81%,
    rgba(255, 210, 151, 70%) 100%
  );

  box-shadow: 4px 6px 16px 0px rgb(0 16 255 / 16%);
  backdrop-filter: hue-rotate(10deg) blur(4px);
  -webkit-backdrop-filter: blur( 7.5px );
  border-radius: 10px;
  border: 1px solid rgb(232 234 255);
  `;