import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from "gatsby"
import styled from 'styled-components';
import Img from 'gatsby-image';

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false)

  let observer = null

  observer = useMemo(() => new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
    {
      rootMargin: "10%",
      threshold: 1,
    }
    ), [ref])


  useEffect(() => {
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return isIntersecting
}

const PostLink = ({ post, coverImage }) => {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  
  return (
  <PostEntry ref={ref} className={isVisible ? 'onscreen' : ''}>
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
)}

export default PostLink

const PostEntry = styled.div`
  transition-duration: 2s;
    
  .cover-image {
    border-radius: 6px;
    margin: 4px;
    mix-blend-mode: overlay;
  }

  .cover-image:before {
    content: '';
    position: absolute;
    background: linear-gradient(4deg,rgb(145 148 173) 1%,rgb(0 0 0 / 0%));
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  h3 {
    color: white !important;
    font-family: ${props => props.theme.font.primary};
    font-weight: 600;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    max-width: 21rem;
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
    box-shadow: 6px 5px 20px 0px rgb(0 5 255 / 81%);
  }

  .text-content {
    position: absolute;
    border-radius: 30px;
    padding: 30px 5px;
    border: 1pxsolidrgba(198,203,255,39%);
    box-shadow: 7px 13px 20px 0pxrgba(255,183,213,62%);
    bottom: 0px;
    max-width: 85%;
    z-index: 2;
  }

  @media (max-width: 920px) {
    width: 100%;
    margin-bottom: 22px;
  }

  width: 48%;
  min-height: 510px;

  margin: 1% 0.2%;
  padding: 22px;


  background: rgb(49 49 49);
  background: linear-gradient(180deg, rgb(18 20 49), rgb(60 62 80));

  box-shadow: 4px 6px 16px 0px rgb(0 16 255 / 16%);
  backdrop-filter: hue-rotate(10deg) blur(4px);
  -webkit-backdrop-filter: blur( 7.5px );
  border-radius: 10px;
  border: 1px solid rgb(232 234 255);

  :hover {
    background: linear-gradient(4deg,rgb(0 1 113) 27%,rgb(62 62 62));

    .cover-image {
      mix-blend-mode: normal;
    }

    .cover-image:before {
      background: linear-gradient(4deg,rgb(4 3 111) 1%,rgb(0 0 0 / 0%));
    }
  }
`;