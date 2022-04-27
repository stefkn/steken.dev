import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import PostLink from "../common/PostLink"

class RecentPosts extends Component {
  render() {
    return (
      <RecentPostsDiv id="recent-articles">
        Recent Posts
      </RecentPostsDiv>
    )
  }
}

const RecentPostsDiv = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  padding 16px;
  max-width: 816px;
  bottom: 35em;
`

export default RecentPosts;
