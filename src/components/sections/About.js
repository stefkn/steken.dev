import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import { Section } from '@components/global';

class About extends Component {
  componentDidMount(){
    const elements = document.getElementsByClassName('fade-in-on-view');

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          }
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
    };

    const deboncedHandleScroll = debounce(timedResize, 100, false);
    function timedResize() { setTimeout(respondToScroll(deboncedHandleScroll), 10) };

    function removeListener(handlerFunc) {
      window.removeEventListener('scroll', handlerFunc, true);
    }

    function respondToScroll (handlerToRemove) {
      [...elements].forEach(function (element) {
        const domRect = element.getBoundingClientRect();
        const position = domRect.y - window.innerHeight;
        if (position < 0) {
          element.classList.add('visible');
        }
      });
      var count = 0;
      [...elements].forEach((elem) => {
        if (elem.classList.contains('visible')) {
          count++;
        }
        if (count === 3) {
          removeListener(handlerToRemove);
        }
      });
    }

    window.addEventListener('scroll', deboncedHandleScroll, true);

  }
  render() {
    return (
      <Section id="about">
        <Frontmatter>
              <StyledText className="fade-in-on-view">
                Stefan Kenichiro Nowak is a <u>Software Engineer</u> at tails.com. Before that, he was a student of <u>Computer Science</u> at King's College London.
              </StyledText>
              <StyledSmaller className="fade-in-on-view">
                I like working with small and medium-sized teams on projects that <i>actually do something</i>, and enjoy the challenge of learning to leverage new technologies and best practices. <br />I have over 5 years of experience programming with languages like Python, JavaScript and Java—and I still learn new things every day.
              </StyledSmaller>
              <StyledSmallest className="fade-in-on-view">
                here is a small deer:
              </StyledSmallest>
        </Frontmatter>
      </Section>
    )
  }
}


const breatheAnimation = keyframes`
  0% { transform: translate(0px,  0px); }
  50%  { transform: translate(0px, 7px); }
  100%   { transform: translate(0px, -0px); }
`

const Floating = styled.div`
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-name: ${breatheAnimation};
`

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

  opacity: 0%;
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
  color: #2f39ae;
  margin-top: 0;
  margin-bottom: 0;
  white-space: pre-wrap;
  margin-top: 4em;

  opacity: 0%;
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
  color: #2f39ae;
  margin-top: 0;
  margin-bottom: 0;
  white-space: pre-wrap;
  margin-top: 4em;

  opacity: 0%;
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
