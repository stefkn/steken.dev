import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import { Section } from '@components/global';
import { ReactComponent as Blob1SVG } from '../../images/blob1.svg';

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
              <StyledSmaller className="fade-in-on-view">
                When not staring at one of my many screens, you might catch me reading a book or two, eating a lot of nice food, visiting another city, lifting heavy things, or cooking something spicy 🌶
              </StyledSmaller>
              <BlobSVG2>
                  <Blob1SVG />
              </BlobSVG2>
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

  @media (max-width: ${props => props.theme.screen.xs}) {
    bottom: 40em;
  }

  @media (max-width: ${props => props.theme.screen.sm}) {
    bottom: 40em;
  }

  svg {
    position: absolute;
    height: 80em;
    z-index: 10;
    left: -25em;
    bottom: -20em;
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
    bottom: -20em;
    filter: opacity(0.47);

    animation: ${blobAnimation} 120s cubic-bezier(1, 0.31, 0.36, 0.67) infinite 0s;
  }
`;

// const StyledText = styled.div`
//   overflow-wrap: break-word;
//   -webkit-font-smoothing: antialiased;
//   letter-spacing: -.04em;
//   font-family: ${props => props.theme.font.primary};
//   font-weight: 400;
//   font-style: normal;
//   text-transform: none;
//   line-height: 1.232;
//   font-size: calc(4 * 1rem);
//   margin: 1rem 0;
//   color: #2f39ae;
//   margin-top: 0;
//   margin-bottom: 0;
//   white-space: pre-wrap;
//   margin-top: 2em;
//   transition: all 2s ease !important;
// `;

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
  background: rgb(34 152 255 / 33%);
  box-shadow: 0 8px 32px 0 rgb(16 25 144 / 37%);
  -webkit-backdrop-filter: blur( 4px );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255,255,255,0.18 );
  -webkit-transform: skewY(4deg);
  -ms-transform: skewY(4deg);
  transform: skewY(4deg);

  -webkit-text-stroke-width: 1.2px;
  -webkit-text-stroke-color: rgb(2 0 98);
  -webkit-text-fill-color: #ffffff;

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
    -webkit-text-fill-color: rgb(2 0 98);
    background-image: linear-gradient(to bottom, rgb(2 0 98) 28%, rgb(2 0 98) 28%, rgb(2 0 98) 72%, rgb(2 0 98) 72%, rgb(2 0 98));
    background-position: 0 1.03em;
    background-repeat: repeat-x;
    background-size: 2px 6px;
    text-decoration: none;
  }

  transition: all 2s ease !important;
`;

const StyledSmaller = styled.div`
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
  font-family: ${props => props.theme.font.primary};
  font-weight: 300;
  font-style: normal;
  letter-spacing: -.02em;
  text-transform: none;
  line-height: 1.3328;
  margin: 1rem 0;
  color: rgb(2 0 98);
  margin-top: 0;
  margin-bottom: 0;
  white-space: pre-wrap;
  margin-top: 4em;

  font-size: clamp(1.8rem, 12vw - 1.5rem, 2.3rem);

  transition: all 2s ease !important;
`

const Frontmatter = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  max-width: 816px;
  display: block;
  margin: 16px auto;
`;

export default About;
