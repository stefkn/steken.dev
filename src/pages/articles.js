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
    this.state = {selectedTag: '', selectedSeries: ''};
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
    if (accumulator) {
      accumulator.indexOf(tag) === -1 ? accumulator.push(tag) : console.log("This item already exists: " + tag);
    }
  }

  addToSeriesList(series, accumulator) {
    if (accumulator) {
      accumulator.indexOf(series) === -1 ? accumulator.push(series) : console.log("This item already exists: " + series);
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
            articles: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
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

          const coverImages = queryResult.allFile.edges
          let Posts = <div style={{marginTop: '1em'}}>No posts. Watch this space! 👽</div>;
          let Tags = <div style={{marginTop: '1em'}}>No tags. #sadface  💁‍♀️</div>;

          if (!!mdArticles && mdArticles.length > 0) {
            Posts = mdArticles
              .filter(article => this.articleIsTagged(this.state.selectedTag, article))
              .map(article => <PostLink key={article.node.id} post={article.node} coverImage={this.getCoverImage(coverImages, article.node.frontmatter.cover_image)} />)
            Tags = mdArticles
              .map(article => article.node.frontmatter.tags.split(' '))
              .reduce(reducer, mdArticles ? ['All articles'] : ['No tags yet.'])
              .map(tag => <TagButton className={this.state.selectedTag === tag ? 'selelcted-tag-button': null} key={tag} onClick={() => this.selectTag(tag)} > {tag} </TagButton>)
          }

          return (
          <Layout>
            <Navbar isAtTopOfPage={true} />
            <Container>
              <MainMatter>
                <h1>Articles</h1>
                <p>filter by topic:</p>
                <TagsButtonContainer>{Tags}</TagsButtonContainer>
                <PostsContainer>{Posts}</PostsContainer>
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


const TagsButtonContainer = styled.div`
  margin-top: 1em;
`
const PostsContainer = styled.div`

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
  padding-top: 10em;
  padding-bottom: 10em;
  min-height: 100vh;

  @keyframes animatetext {
    0% { transform: translate3d(0, 10%, 0); opacity: 0%;}
    100% { transform: translate3d(0, 0, 0); opacity: 100%;}
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    padding-top: 10em;
    grid-template-columns: 1fr;
    text-align: left;
  }

  h1 {
    line-height: 1.3328;
    font-size: clamp(4.6rem, 12vw - 1.5rem, 6.5rem);

    animation-delay: 0s;
    animation: animatetext 1s;
    animation-fill-mode: forwards;
  }

  h3 {
    line-height: 1.3328;
    font-size: clamp(2.0rem, 12vw - 1.5rem, 3.2rem);

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
`;

export default Articles;
