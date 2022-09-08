---
slug: "/article/gatsby/github-pages-github-actions"
series: "Gatsby"
date: "2022-09-09"
title: "Setting up a GitHub Actions build and deploy pipeline for steken.dev"
subtitle: "Gatsby, GitHub Actions and GitHub Pages. The 3 Gs"
tags: "gatsby github-actions github-pages"
published: false
excerpt: On the road to shipping this website I had to figure out a few things. Well, maybe more than a few things. In the hopes that this is helpful to someone
reading_time: 15
cover_image: "tokyo.jpeg"
cover_image_credit: "stefan nowak"
---

On the road to shipping this website I had to figure out a few things. Well, maybe more than a few things. In the hopes that this is helpful to someone (or, at the very least, a future-me who has forgotten how everything was set up) I'm going to document how I configured Gatsby and GitHub Actions to build and deploy this site to GitHub Pages, including how I set up secret management for this project. So lets go!

There are probably many ways to go about this goal, but we'll go the simplest route by using the `gh-pages` package which can be found [here.](https://www.npmjs.com/package/gh-pages)

First, let's add `gh-pages` as a project dependency. Go to your project's `package.json` and add it to `devDependencies` like this:

```json
"devDependencies": {
    "gh-pages": "^3.2.3",
    "prettier": "^1.15.2"
}
```

Now find the `scripts` section. In this project, this looks like this:

```json
"scripts": {
    "build": "gatsby build",
    "dev": "gatsby develop -p 8050",
    "start": "npm run dev",
    "format": "prettier --write \"src/**/*.js\"",
    "clean": "rm -rf .cache && rm -rf public",
},
```

Notice that each of the keys is associated with a string that is a valid command-line command. Our package manager (in this case, [Yarn](https://yarnpkg.com/)) simply runs this script when you call it with a given script's key as an argument. For example, when I want to bring up the local development version of this project, I just call `yarn dev`, and Yarn takes care of running `gatsby develop -p 8050`.

<iframe src='https://gfycat.com/ifr/SparklingFittingAurochs' frameborder='0' scrolling='no' allowfullscreen width='100%' height='535'></iframe><p>It's a Unix system... you know this!</p>

```json
"scripts": {
    "build": "gatsby build",
    "dev": "gatsby develop -p 8050",
    "start": "npm run dev",
    "format": "prettier --write \"src/**/*.js\"",
    "clean": "rm -rf .cache && rm -rf public",
    "deploy": "gatsby build && gh-pages -d public -r https://$GITHUB_TOKEN@github.com/stefkn/steken.dev.git"
},
```

When you install `gh-pages`, it creates a `gh-pages` command line utility. Run `gh-pages --help` to see a list of supported options. Since it will be installed when we install our dependencies to run the project, we can use it in the deploy script to handle the GitHub Pages deployment. In the deploy script above, we use the `-d` argument to point it to the `/public` directory, which means it will copy everything in `/public` and push it to the `gh-pages` branch on the remote, which will trigger a GitHub Actions Workflow to be published on GitHub Pages.

