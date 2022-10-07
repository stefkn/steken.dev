import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Container } from '@components/global';
import ExternalLink from '@common/ExternalLink';

import GithubIcon from '@static/icons/github.svg';
import TwitterIcon from '@static/icons/twitter.svg';

import GQLIcon from '../../images/stack/graphql.svg';
import GatsbyIcon from '../../images/stack/gatsby.svg';
import ReactIcon from '../../images/stack/react.svg';

const SOCIAL = [
  {
    icon: GithubIcon,
    link: 'https://github.com/stefkn',
  },
  {
    icon: TwitterIcon,
    link: 'https://twitter.com/stekendev',
  }
];

const Footer = (props) => (
  <StaticQuery
    image={props.bottomImage}
    query={graphql`
      query {
        art_deer: file(
          sourceInstanceName: { eq: "art" }
          name: { eq: "deer" }
        ) {
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <React.Fragment>
        {props.bottomImage ?
          <Art>
            <Img
              fluid={data.art_deer.childImageSharp.fluid}
              style={{ width: 480, maxWidth: '100%', marginBottom: -16 }}
            />
          </Art>
          :
          <div></div>}
        <FooterWrapper>
          <StyledContainer>
            <Copyright>
              <h2>steken.dev</h2>
              <span>
                code & illustrations by stefan
              </span>
              <br />
              <SmallText>
                <p>Hand-distilled in small batches with <SmallIcon src={GatsbyIcon} /> <a href="https://www.gatsbyjs.org/">Gatsby</a> and <SmallIcon src={ReactIcon} /> <a href="https://reactjs.org/">React</a>.</p>
                <p>Absurd Gatsby starter by <a href="https://github.com/ajayns">@ajayns</a>. Queries by <SmallIcon src={GQLIcon} /> <a href="https://graphql.org/">GraphQL</a>.</p>
                <p>Index animation using <a href="https://threejs.org/">three.js</a>. STL from <a href="https://skyline.github.com/stefkn/2021">GitHub Skyline</a>. Index music by <a href="https://percussions.bandcamp.com/">Percussions.</a></p>
              </SmallText>
            </Copyright>
            <SocialIcons>
              {SOCIAL.map(({ icon, link }) => (
                <ExternalLink key={link} href={link}>
                  <img src={icon} alt="link" />
                </ExternalLink>
              ))}
            </SocialIcons>
          </StyledContainer>
        </FooterWrapper>
      </React.Fragment>
    )}
  />
);

const SmallIcon = styled.img`
  top: 6px;
  position: relative;
  height: 16px;
  margin: 2px;
`

const SmallText = styled.div`
  p {
    font-size: 12px;
    font-weight: 200;
    line-height: 16px;
    margin-top: 10px;
    color: white;

    a {
      text-decoration: underline;
    }
  }
`

const SocialIcons = styled.div`
  display: flex;

  img {
    margin: 0 8px;
    width: 34px;
    height: 34px;
  }

  @media (max-width: ${props => props.theme.screen.sm}) {
    margin-top: 40px;
  }
`;

const FooterWrapper = styled.footer`
  background-color: #080b2c;
  padding: 90px 0;
  color: white;
  width: 100%;
`;

const Copyright = styled.div`
  font-family: ${props => props.theme.font.primary};
  ${props => props.theme.font_size.small};
  color: white;
  text-align: left;
  -webkit-font-smoothing: antialiased;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Art = styled.figure`
  display: flex;
  justify-content: center;
  margin: 0;
  margin-top: 48px;
  top: 16px;
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${props => props.theme.screen.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

export default Footer;
