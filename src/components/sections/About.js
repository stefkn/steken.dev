import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import { Section } from '@components/global';
import { ReactComponent as Blob1SVG } from '../../images/blob1.svg';
import RecentPosts from '@sections/RecentPosts';

class About extends Component {
  render() {
    return (
      <Section id="about" className="about-section">
        <Frontmatter>
          <StyledOutlineText className="fade-in-on-view">
            Stefan Kenichiro Nowak is a <a href="https://lifeat.tails.com/tag/engineering/">Software Engineer</a> at <a href="https://tails.com/gb/">tails.com</a>. Before that, he was a student of <a href="https://www.kcl.ac.uk/study/undergraduate/courses/computer-science-msci">Computer Science</a> at <a href="https://en.wikipedia.org/wiki/King%27s_College_London">King's College London</a>.
          </StyledOutlineText>

          <BlobSVG1>
              <Blob1SVG />
          </BlobSVG1>
          <BlobSVG2>
              <Blob1SVG />
          </BlobSVG2>

          <RecentPosts />
        </Frontmatter>
      </Section>
    )
  }
}

const blobAnimation = keyframes`
  0% { transform: scaleY(100%) scaleX(100%) translateY(0px) translateX(0px) rotate(0deg); }
  20% { transform: scaleY(120%) scaleX(110%) translateY(-23px) translateX(13px) rotate(13deg); }
  40% { transform: scaleY(120%) scaleX(120%) translateY(-190px) translateX(28px) rotate(110deg); }
  60% { transform: scaleY(120%) scaleX(130%) translateY(-43px) translateX(34px) rotate(180deg); }
  80% { transform: scaleY(150%) scaleX(120%) translateY(-23px) translateX(15px) rotate(220deg); }
  100% { transform: scaleY(100%) scaleX(100%) translateY(0px) translateX(0px) rotate(360deg); }
`;

const BlobSVG1 = styled.div`
  position: relative;
  width: 85em;
  z-index: -1;

  svg {
    position: absolute;
    height: 80em;
    z-index: 10;
    left: -25em;

    top: -500px;
    filter: opacity(0.47);

    animation: ${blobAnimation} 60s cubic-bezier(1, 0.31, 0.36, 0.67) infinite 0s;
  }
`;

const BlobSVG2 = styled.div`
  position: relative;
  width: 85em;
  z-index: -1;
  transform: scale(1.72) rotate(-19deg);

  svg {
    position: absolute;
    height: 80em;
    z-index: 10;
    left: -25em;

    filter: opacity(0.47);
    top: -600px;

    animation: ${blobAnimation} 120s cubic-bezier(1, 0.31, 0.36, 0.67) infinite 0s;
  }
`;

const StyledOutlineText = styled.div`
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -.04em;
  font-family: Helvetica, sans-serif;
  font-weight: 400;
  font-style: normal;
  text-transform: none;
  line-height: 1.232;

  margin: 1rem 0;
  color: rgb(2 0 98);
  margin-top: 0;
  margin-bottom: 0;
  white-space: pre-wrap;
  margin-top: 2em;

  font-size: clamp(3.4rem,12vw - 1.5rem,4.5rem);

  border-radius: 20px;
  padding: 30px;
  z-index: 2;
  box-shadow: 0 8px 32px 0 rgb(0 0 0 / 19%);
  -webkit-backdrop-filter: blur( 4px );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255,255,255,0.18 );
  -webkit-text-stroke-width: 1.2px;
  -webkit-text-stroke-color: rgb(2 0 98);
  -webkit-text-fill-color: #ffffff;

  @media (max-width: ${props => props.theme.screen.md}) {
    padding: 20px;
    background: rgb(34 152 255 / 15%);
  }

  a {
    -webkit-text-fill-color: #ffffff;
    -webkit-text-stroke-width: 1.2px;
    -webkit-text-stroke-color: rgb(2 0 98);
    background-image: linear-gradient(to bottom, rgb(2 0 98) 28%, white 28%, #ffffff00 72%, rgb(2 0 98) 72%, rgb(2 0 98));
    background-position: 0 1.03em;
    background-repeat: repeat-x;
    background-size: 2px 6px;
    text-decoration: none;
  }

  a:hover {
    -webkit-text-fill-color: #ff4181;
    background-image: linear-gradient(to bottom, #ff4181 28%, #ff4181 28%, #ff4181 72%, #ff4181 72%, #ff4181);
    background-position: 0 1.03em;
    background-repeat: repeat-x;
    background-size: 2px 6px;
    text-decoration: none;
  }

  transition: all 2s ease !important;
`;

const Frontmatter = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  max-width: 816px;
  display: block;
  margin: 16px auto;
`;

export default About;
