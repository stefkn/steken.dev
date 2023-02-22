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
  margin-top: 1em;
  margin-bottom: 1em;

  .cover-image {
    border-radius: 6px;
    margin: 4px;
  }

  h3 {
    color: white !important;
    font-family: ${props => props.theme.font.primary};
    font-weight: 600;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
  }

  a:-webkit-any-link {
    color: white;
    cursor: pointer;
    text-decoration: none;
  }

  p.excerpt {
    font-size: clamp(1.2rem, 2.5vw, 1.3rem);
    line-height: 1.3328;
    color: #cccccc;
    font-weight: 400;
  }

  .post-date {
    font-size: 16px;
    color: #cccccc;
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
    padding: 30px 5px;
    border: 1pxsolidrgba(198,203,255,39%);
    box-shadow: 7px 13px 20px 0pxrgba(255,183,213,62%);
    top: 4px;
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

  background-image: linear-gradient(
    155deg,
    hsl(223deg 70% 42%) 0%,
    hsl(252deg 40% 52%) 13%,
    hsl(272deg 37% 55%) 24%,
    hsl(291deg 33% 58%) 35%,
    hsl(310deg 35% 64%) 46%,
    hsl(324deg 44% 72%) 57%,
    hsl(335deg 51% 79%) 67%,
    hsl(344deg 59% 86%) 78%,
    hsl(352deg 65% 93%) 89%,
    hsl(0deg 75% 98%) 100%
  );

  box-shadow: 4px 6px 16px 0px rgb(0 16 255 / 16%);
  backdrop-filter: hue-rotate(10deg) blur(4px);
  -webkit-backdrop-filter: blur( 7.5px );
  border-radius: 10px;
  border: 1px solid rgb(232 234 255);
  `;