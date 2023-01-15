# steken.dev

![Screenshot 2022-08-30 at 12 30 11](https://user-images.githubusercontent.com/20523205/187425717-b8a96be2-977e-4b95-94db-2df3a2b3a73e.png)

Personal website using Gatsby, Styled Components, GraphQL and a few other things.

Based on an absurd Gatsby starter by https://github.com/ajayns.

## Installation

Install the dependencies:

### `yarn install`

Run the development server:

### `yarn dev`

Production build to `/public`:

### `yarn build`

Cleanup cache (often fixes misc errors when run before `yarn dev`):

### `yarn clean`

## Content

Each of the sections in the site are placed in `src/sections`. Data is usually separated out into objects/arrays to be rendered in the component.

## SEO

The component `src/components/common/SEO.js` handles all meta data and SEO content, modify the `SEO_DATA` variable to add the data automatically. For application manifest data and favicon, modify the `gatsby-plugin-manifest` configuration in `gatsby-config.js`.

## Styling

This project uses [styled-components]() to handle styling: `src/styles/theme.js` defines the styling base and `src/styles/GlobalStyles.js` includes basic element styles along with the CSS Reset.

## WIP

- TODO: Show tags on article previews
- TODO: reorganise assets directory structure to make more sense
- TODO: update the spinning skyline for 2022
- TODO: create functionality to switch between 2021 and 2022 skylines
- TODO: create functionality to hide frontmatter / top of article stuff to see bg image