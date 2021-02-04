import React, { Component } from 'react';
import styled from 'styled-components';

import { Section } from '@components/global';

class About extends Component {
  render() {
    return (
      <Section id="about">
        <Frontmatter>
              <StyledText>
                Stefan Kenichiro Nowak is a <u>Software Engineer</u> at tails.com. Before that, he was a student of <u>Computer Science</u> at King's College London.
              </StyledText>
              <StyledSmaller>
                I like working with small and medium-sized teams on projects that <i>actually do something</i>, and enjoy the challenge of learning to leverage new technologies and best practices. <br />I have over 5 years of experience programming with languages like Python, JavaScript and Java—and I still learn new things every day.
              </StyledSmaller>
              <StyledSmaller>
                here is a small deer:
              </StyledSmaller>
        </Frontmatter>
      </Section>
    )
  }
}

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
`

const Frontmatter = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  max-width: 816px;
  display: block;
  margin: 16px auto;
`;

export default About;
