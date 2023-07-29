import React, { Component } from 'react';

import Layout from '@common/Layout';
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image';

import Footer from '@sections/Footer';
import Navbar from '@common/Navbar';

import styled from 'styled-components';
import PostLink from "../components/common/PostLink"
import { Container } from '@components/global';


class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTag: '',
      selectedSeries: '',
      showTagsBox: false,
    };
  }

  selectTag(tag) {
    this.setState({selectedTag: 'nothing'});
    this.setState({selectedSeries: 'nothing'});
    let that = this;

    setTimeout( function() {
      that.setState({selectedTag: tag});
    }, 1);
  }

  selectSeries(series) {
    this.setState({selectedTag: 'nothing'});
    this.setState({selectedSeries: 'nothing'});
    let that = this;

    setTimeout( function() {
      that.setState({selectedSeries: series});
    }, 1);
  }

  selectNoTags = () => {
    this.setState({selectedTag: ''});
  }

  articleIsTagged(tag, article) {
    if (tag === '' || tag === 'All articles') {
      return true;
    } else {
      return article.node.frontmatter.tags.split(' ').indexOf(tag) === -1 ? false : true;
    }
  }

  articleIsInSeries(series, article) {
    if (series === '' || series === 'All articles') {
      return true;
    } else {
      return article.node.frontmatter.series === series ? true : false;
    }
  }

  isArticlePublished(article) {
    return article.node.frontmatter.published
  }

  addToTagList(tag, accumulator) {
    if (accumulator &&  accumulator.indexOf(tag) === -1) {
      accumulator.push(tag)
    }
  }

  addToSeriesList(series, accumulator) {
    if (accumulator && accumulator.indexOf(series) === -1) {
      accumulator.push(series);
    }
  }

  isSameImageName(image, coverImageName) {
    return image.node.childImageSharp.fluid.originalName === coverImageName
  }

  getCoverImage(allImages, coverImageName) {
    let filteredImages = allImages.filter(image => this.isSameImageName(image, coverImageName))
    // if multiple are matched, return the first one
    return (filteredImages.length > 0) ? filteredImages[0].node : null
  }

  toggleTagsBoxVisibility() {
    if (this.state.showTagsBox) {
      this.setState({showTagsBox: false});
    } else {
      this.setState({showTagsBox: true});
    }
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query
          {
            stefan_img: file(
              sourceInstanceName: { eq: "art" }
              name: { eq: "miyajima_temple" }
            ) {
              childImageSharp {
                fluid(maxWidth: 2048) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            articles: allMarkdownRemark(
              sort: {order: DESC, fields: [frontmatter___date]},
              filter: {fileAbsolutePath: {regex: "/\/markdown\//"}},
            ) {
              edges {
                node {
                  id
                  frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    slug
                    series
                    title
                    tags
                    published
                    excerpt
                    reading_time
                    cover_image
                  }
                }
              }
            }
            articleImages: allFile(filter: {sourceInstanceName: {eq: "article_images"}}) {
              edges {
                node {
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                      originalName
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            seriesImages: allFile(filter: {sourceInstanceName: {eq: "series_images"}}) {
              edges {
                node {
                  childImageSharp {
                    fluid(maxWidth: 800) {
                      originalName
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        `}
        render={queryResult => {
          const mdArticles = queryResult.articles.edges
            .filter(article => this.isArticlePublished(article))

          const reducer = (accumulator, currentValue) => {
            currentValue.forEach((tag) => this.addToTagList(tag, accumulator));
            return accumulator
          }

          const seriesReducer = (accumulator, currentValue) => {
            if (!!currentValue) {
              this.addToSeriesList(currentValue.node.frontmatter.series, accumulator);
            }
            return accumulator
          }

          const coverImages = queryResult.articleImages.edges
          const seriesImages = queryResult.seriesImages.edges

          let Posts = <div style={{marginTop: '1em'}}>No posts. Watch this space!</div>;
          let Tags = <div style={{marginTop: '1em'}}>No tags yet.</div>;
          let Series = <div style={{display: 'none'}}></div>;

          if (!!mdArticles && mdArticles.length > 0) {
            Posts = mdArticles
              .filter(
                article =>
                this.articleIsTagged(
                  this.state.selectedTag,
                  article,
                ) || this.articleIsInSeries(
                  this.state.selectedSeries,
                  article,
                )
              )
              .map(
                article =>
                <PostLink
                  key={article.node.id}
                  post={article.node}
                  coverImage={
                    this.getCoverImage(
                      coverImages,
                      article.node.frontmatter.cover_image,
                    )
                  }
                />
              )

            Series = mdArticles
              .reduce(seriesReducer, [])
              .map(
                series =>
                !!seriesData[series] ?
                  <SeriesCard
                    className={
                      this.state.selectedSeries === series ? 'selelcted-series-card': null
                    }
                    key={series}
                    onClick={() => this.selectSeries(series)}
                  >
                    <h3 className="seriescard-heading">series</h3>
                    <h2>{series}</h2>
                    {
                      this.getCoverImage(
                        seriesImages,
                        seriesData[series].imageName,
                      ) !== null &&
                        <Img
                          key={series}
                          className="series-image"
                          fluid={
                            this.getCoverImage(
                              seriesImages,
                              seriesData[series].imageName,
                            ).childImageSharp.fluid
                          }
                        />
                    }
                    <div className="series-description">
                      <p>{seriesData[series].description}</p>
                    </div>
                  </SeriesCard> : null
              )

            Tags = mdArticles
              .map(
                article => article.node.frontmatter.tags.split(' ')
              )
              .reduce(
                reducer, mdArticles ? ['All articles'] : ['No tags yet.']
              )
              .map(
                tag =>
                <TagButton
                  className={
                    this.state.selectedTag === tag ? 'selelcted-tag-button' : null
                  }
                  key={tag}
                  onClick={() => this.selectTag(tag)} > {tag}
                </TagButton>
              )
          }

          return (
          <Layout>
            <Navbar isAtTopOfPage={true} />
            <HeroImage>
              <HeroOverlay></HeroOverlay>
              <Img fluid={queryResult.stefan_img.childImageSharp.fluid} />
            </HeroImage>
            <Container>
              <MainMatter>
                <TopMatter>
                  <h1>Articles</h1>
                  <ShowTagSelectorButton
                    onClick={() => this.toggleTagsBoxVisibility()}>
                    {
                      this.state.showTagsBox ?
                      "hide tags" : "show tags"
                    }
                  </ShowTagSelectorButton>
                </TopMatter>

                { (!!Series && !!seriesData && Object.keys(seriesData).length !== 0) && <p>or by series:</p> }
                <SeriesContainer>
                  {Series}
                </SeriesContainer>

                {
                  this.state.showTagsBox ?
                  <TagsBox>
                    <h3>filter by topic:</h3>
                    <TagsButtonContainer>{Tags}</TagsButtonContainer>
                  </TagsBox>
                  : null
                }

                <PostsContainer>
                  {Posts}
                </PostsContainer>
              </MainMatter>
            </Container>
            <Footer bottomImage={false}/>
          </Layout>
          )
        }}
      />
    )
  }
}

const TopMatter = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  padding: 0px 7px;
  align-items: center;
`

const ShowTagSelectorButton = styled.div`
  position: relative;
  min-height: 2em;
  min-width: 2em;
  max-width: 8em;
  background-color: rgb(233 30 99);
  margin: 0em 0em 0em 2em;
  padding: 0px 22px;
  border-radius: 27px;
  text-align: center;
  cursor: pointer;
  box-shadow: 4px 6px 16px 0px rgb(0 0 0 / 28%);
  font-weight: 600;
  line-height: 40px;

  :hover {
    bottom: 1px;
    box-shadow: 4px 6px 16px 0px rgb(0 0 0 / 48%);
  }
`

// const seriesData = {
//   "Cybersecurity": {
//     "imageName": "cybersecurity.jpeg",
//     "description": "Cybersecurity is the study of the security of digital systems and networks. It is the study of the threats and vulnerabilities that exist in these systems and networks.",
//   },
//   "Design Patterns": {
//     "imageName": "design-patterns.jpeg",
//     "description": "Design patterns are a family of recurring design patterns, which are used in software design. They are a way to express design as code.",
//   },
//   "git good at git": {
//     "imageName": "git-branch.jpg",
//     "description": "git is a version control system for tracking changes in source code during software development. It is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.",
//   }
// }

const seriesData = {}

const TagsBox = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;

  h3 {
    color: black !important;
    font-family: ${props => props.theme.font.primary};
    font-weight: 600;
    font-size: 22px !important;
  }

  .post-date {
    font-size: 16px;
    color: white;
  }

  @media (max-width: 720px) {
    width: 100%;
  }

  padding: 22px;

  animation-delay: 0s;
  animation: animatetext 1s;
  animation-fill-mode: forwards;

  @media (${props => props.theme.screen.sm}) {
    max-height: fit-content;
  }

  max-height: 280px;

  @keyframes animatetext {
    0% { transform: translate3d(0, 10%, 0); opacity: 0%;}
    100% { transform: translate3d(0, 0, 0); opacity: 100%;}
  }

  background-color: rgb(218 220 255 / 39%);

  box-shadow: 4px 6px 16px 0px rgb(0 0 0 / 17%);
  backdrop-filter: hue-rotate(10deg) blur(11px);

  border-radius: 10px;
  border: 1px solid rgb(192 197 255);

  @media (min-width: 900px) {
    position: sticky;
    top: 100px;
    z-index: 10;
  }
`

const HeroOverlay = styled.div`
  width: 100%;
  min-height: 100%;
  position: absolute;

  z-index: 1;
  background: linear-gradient( 11deg,rgb(242 242 246) 12%,#0030ff69 76%,#4554ffe3 100% );
`

const HeroImage = styled.div`
  z-index: -1;
  width: 100%;
  position: absolute;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 72px;
`

const SeriesContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;

  .selelcted-series-card {
    background: linear-gradient(
      155deg,
      rgb(158 14 255 / 5%) 0%,
      rgb(0 20 255 / 12%) 20%,
      rgb(255 158 221 / 52%) 29%,
      rgb(85 85 255 / 81%) 100%
    );

    .series-description {
      backdrop-filter: brightness(130%) blur(14px);
    }
  }
`

const SeriesCard = styled.div`
  min-height: 12em;
  min-width: 14em;

  @media (max-width: 620px) {
    width: 50%;
  }
  width: 40%;
  @media (min-width: 900px) {
    width: 20%;
  }

  border-radius: 12px;
  padding: 20px;
  background-color: #FFFFFF;
  box-shadow: 0 3px 6px 0 rgba(3, 14, 45, 0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  margin: 20px 30px 20px 0px;
  font-weight: bold;
  cursor: pointer;

  p { font-size: 1em !important; }
  h2 { font-size: 1.4em; font-weight: 600; }

  .series-image {
    width: 100%;
    border-radius: 3px;
  }

  .seriescard-heading {
    font-size: 12px;
    color: rgb(163 163 163);
  }

  .series-description {
    position: relative;
    border-radius: 10px;
    padding: 12px;
    -webkit-transform: skewY(6deg);
    -ms-transform: skewY(6deg);
    -webkit-transform: skewY(6deg);
    -ms-transform: skewY(6deg);
    transform: skewY(6deg);
    border: 1px solid rgb(95 109 255 / 20%);
    x-shadow: 7px 13px 20px 0pxrgb(255 183 213 / 62%);
    -webkit-backdrop-filter: hue-rotate(312deg) blur(14px);
    -webkit-backdrop-filter: hue-rotate(312deg) blur(14px);
    backdrop-filter: hue-rotate(145deg) blur(14px);
    -webkit-backdrop-filter: hue-rotate(312deg) blur(14px);
    top: -50px;
    background-color: rgb(255 255 255 / 54%);

    p {
      margin: 0;
      font-weight: 400;
      color: rgb(32 29 38);
    }
  }
`

const TagsButtonContainer = styled.div`
  margin-top: 1em;
`

const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 1em;
  margin-bottom: 1em;
`

const TagButton = styled.button`
  animation-delay: 0s;
  animation: animatetext 1s;
  animation-fill-mode: forwards;

  background-color: #2f39ae;
  border-radius: 100px;
  padding: 11px;
  color: white;
  margin: 3px;
  box-shadow: -4px 5px 8px 0px #2f39ae75;

  @keyframes animatetext {
    0% { transform: translate3d(0, 10%, 0); opacity: 0%;}
    100% { transform: translate3d(0, 0, 0); opacity: 100%;}
  }
`

const MainMatter = styled.div`
  padding-top: 7em;
  padding-bottom: 10em;
  min-height: 100vh;

  @keyframes animatetext {
    0% { transform: translate3d(0, 10%, 0); opacity: 0%;}
    100% { transform: translate3d(0, 0, 0); opacity: 100%;}
  }

  @media (max-width: ${props => props.theme.screen.xs}) {
    padding: 140px 10px 10px 10px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
  }

  h1 {
    font-size: clamp(3.2rem, 12vw - 1.5rem, 4.5rem);
    animation-delay: 0s;
    animation: animatetext 1s;
    animation-fill-mode: forwards;
    color: white;
  }

  h3 {
    line-height: 1.3328;
    font-size: clamp(2.0rem, 12vw - 1.5rem, 1.8rem);

    animation-delay: 1s;
    animation: animatetext 2s;
    animation-fill-mode: forwards;
  }

  p {
    font-size: clamp(1.6rem, 12vw - 1.5rem, 2.0rem);
    overflow-wrap: break-word;
    -webkit-font-smoothing: antialiased;
    font-family: ${props => props.theme.font.primary};
    font-weight: 300;
    font-style: normal;
    letter-spacing: -.02em;
    text-transform: none;
    line-height: 1.3328;
    margin-top: 2em;
    margin-bottom: 0;
    white-space: pre-wrap;
    margin-top: 1em;

    animation-delay: 2s;
    animation: animatetext 2s;
    animation-fill-mode: forwards;
  }

  div::-webkit-scrollbar {
    width: 1px;
    height: 6px;
  }

  div::-webkit-scrollbar-track {
    background: none;
  }

  div::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 20px;
  }
`;

export default Articles;
