const path = require('path');

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-svgr`,
      options: {
        svgoConfig: {
          plugins: {
            removeViewBox: false,
          },
        },
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `art`,
        path: `${__dirname}/src/images/art`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `stack`,
        path: `${__dirname}/src/images/stack`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `article_images`,
        path: `${__dirname}/src/images/article_images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `series_images`,
        path: `${__dirname}/src/images/series_images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              theme: 'dracula'
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Absurd`,
        short_name: `absurd`,
        start_url: `/`,
        // background_color: `#0014ff`,
        // theme_color: `#0014ff`,
        display: `minimal-ui`,
        icon: `static/favicon.svg`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `IBM Plex Mono\:100,200,300,400,500,600,700`,
          `Inter\:300,400,500,700,900`,
          `Rubik\:100,200,300,400,500,600,700`,
          `Spectral\:200,300`,
          `Source Code Pro\:200,300,400,500`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@components': path.resolve(__dirname, 'src/components'),
          '@common': path.resolve(__dirname, 'src/components/common'),
          '@images': path.resolve(__dirname, 'src/images'),
          '@sections': path.resolve(__dirname, 'src/components/sections'),
          '@styles': path.resolve(__dirname, 'src/styles/'),
          '@static': path.resolve(__dirname, 'static/'),
        },
      },
    },
    `gatsby-plugin-catch-links`,
  ],
};
