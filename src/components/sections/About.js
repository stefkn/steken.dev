import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import { Section } from '@components/global';
import { ReactComponent as Blob1SVG } from '../../images/blob1.svg';

class About extends Component {
  render() {
    return (
      <Section id="about">
        <Frontmatter>
              <StyledOutlineText className="fade-in-on-view">
                Stefan Kenichiro Nowak is a <u>Software Engineer</u> at tails.com. Before that, he was a student of <u>Computer Science</u> at King's College London.
              </StyledOutlineText>
              <BlobSVG>
                  <Blob1SVG />
              </BlobSVG>
              <StyledSmaller className="fade-in-on-view">
                Lorem ipsum dolor sit amet.
              </StyledSmaller>
              <BlobSVG2>
                  <Blob1SVG />
              </BlobSVG2>
        </Frontmatter>
      </Section>
    )
  }
}


const BlobSVG = styled.div`
  position: relative;
  width: 85em;
  z-index: -1;

  svg {
    position: absolute;
    height: 80em;
    z-index: 10;
    left: -25em;
    bottom: -20em;
    filter: opacity(0.47);

    -webkit-animation: moving-blob 20s linear infinite;
    -moz-animation: moving-blob 20s linear infinite;
    animation: moving-blob 20s linear infinite;
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

    -webkit-animation: moving-blob 20s linear infinite;
    -moz-animation: moving-blob 20s linear infinite;
    animation: moving-blob 20s linear infinite;
  }
`;

const StyledText = styled.div`
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -.04em;
  font-family: Inter, Helvetica, sans-serif;
  font-weight: 400;
  font-style: normal;
  text-transform: none;
  line-height: 1.232;
  font-size: calc(4 * 1rem);
  margin: 1rem 0;
  color: #2f39ae;
  margin-top: 0;
  margin-bottom: 0;
  white-space: pre-wrap;
  margin-top: 2em;

  transition: all 2s ease !important;
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
  font-size: calc(4 * 1rem);
  margin: 1rem 0;
  color: rgb(2 0 98);
  margin-top: 0;
  margin-bottom: 0;
  white-space: pre-wrap;
  margin-top: 2em;


  -webkit-text-stroke-width: 1.2px;
  -webkit-text-stroke-color: rgb(2 0 98);
  -webkit-text-fill-color: #ffffff;

  u {
    -webkit-text-fill-color: #ffffff;
    -webkit-text-stroke-width: 1.2px;
    -webkit-text-stroke-color: rgb(2 0 98);
  }

  u:hover {
    -webkit-text-fill-color: rgb(2 0 98);
  }

  transition: all 2s ease !important;
`;

const StyledSmaller = styled.div`
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
  font-family: Inter, Helvetica, sans-serif;
  font-weight: 300;
  font-style: normal;
  letter-spacing: -.02em;
  text-transform: none;
  line-height: 1.3328;
  font-size: calc(2.2 * 1rem);
  margin: 1rem 0;
  color: rgb(2 0 98);
  margin-top: 0;
  margin-bottom: 0;
  white-space: pre-wrap;
  margin-top: 4em;

  transition: all 2s ease !important;
`

const StyledSmallest = styled.div`
  overflow-wrap: break-word;
  -webkit-font-smoothing: antialiased;
  font-family: Inter, Helvetica, sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: -.02em;
  text-transform: none;
  line-height: 1.3328;
  font-size: calc(1.4 * 1rem);
  margin: 1rem 0;
  color: rgb(2 0 98);
  margin-top: 0;
  margin-bottom: 0;
  white-space: pre-wrap;
  margin-top: 4em;

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
