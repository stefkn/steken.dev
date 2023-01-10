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

const PostEntry = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;

  .cover-image {
    border-radius: 6px;
    margin: 4px;
  }

  h3 {
    color: white;
    font-family: ${props => props.theme.font.primary};
    font-weight: 600;
    font-size: clamp(1.6rem, 2.5vw, 1.8rem);
  }
  h3 > a:hover {
    color: #ff4181 !important;
    -webkit-text-fill-color: #ff4181;
    background-image: linear-gradient(to bottom, #ff4181 8%, #ff4181 8%, #ff4181 30%, #ff4181 30%, #ff4181);
    background-position: 0 1.4em;
    background-repeat: repeat-x;
    background-size: 2px 3px;
    text-decoration: none;
  }

  a:-webkit-any-link {
    color: white;
    cursor: pointer;
    text-decoration: none;
  }

  p.excerpt {
    margin-top: 8px;
    font-size: clamp(1.1rem, 2.5vw, 1.2rem);
    line-height: 1.3328;
    color: #e9e9e9;
    font-weight: 400;
  }

  .post-date {
    font-size: 16px;
    color: white;
  }

  .read-more {
    background: #2641d6;
    border-radius: 10px;
    padding: 6px 10px;
    margin: 10px 0px;
    text-align: center;
    max-width: 260px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    position: relative;
    cursor: pointer;
    border: 1px solid rgba(198, 203, 255, 39%);
    bottom: 0px;
  }
  .read-more:hover {
    bottom: 1px;
    box-shadow: 6px 5px 20px 0px rgba(255, 0, 106, 53%);
  }

  .text-content {
    position: relative;
    border-radius: 30px;
    padding: 5px 5px;
    border: 1pxsolidrgba(198,203,255,39%);
    box-shadow: 7px 13px 20px 0pxrgba(255,183,213,62%);
    top: 4px;
    min-height: 300px;

    .subtitle-main {
      text-decoration: underline;
    }
  }

  @media (max-width: 720px) {
    width: 100%;
  }

  width: 49%;
  margin: 0%;
  padding: 18px;
  margin-top: 10px;

  animation-delay: 0s;
  animation: animatetext 1s;
  animation-fill-mode: forwards;

  @keyframes animatetext {
    0% { transform: translate3d(0, 10%, 0); opacity: 0%;}
    100% { transform: translate3d(0, 0, 0); opacity: 100%;}
  }

  backdrop-filter: blur(8px) brightness(0.7);
  border-radius: 10px;
  border: 1px solid rgb(255 255 255 / 31%);
  `;
