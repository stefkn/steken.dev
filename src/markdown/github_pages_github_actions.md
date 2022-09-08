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

Hold on though, not so fast -- you will need to authenticate. How? See the `$GITHUB_TOKEN` there? That's going to be substituted with your GitHub repo's [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (PAT) which you'll need to make and add to your environment variables. This is also a good time to talk about Secrets.

This project (and most projects with any kind of external service dependency) will probably have a few or more API keys and access tokens to juggle. We can't just commit them in code to the repo, because they would be open and available for the public (and bad actors) to steal and use! The solution is to use [encrypted project secrets.](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

One important thing to note here though: since we're building a static site, we're _a little limited_ in what we can do with regards to secret management.

We can of course have **build-time secrets**, which are secrets that can only be accessed during the build process in the context of whatever runs your build (such as a [VM](https://en.wikipedia.org/wiki/Virtual_machine), a [serverless function](https://en.wikipedia.org/wiki/Serverless_computing) or a [Docker container](https://www.docker.com/resources/what-container/)) but can't be accessed outside of there. For example, say, if your static site relied upon a lot of licensed assets from a stock photo library API that you pay for – in the build process you could store the key as an encrypted build-time project secret, and the build runner would get that secret, use it to authenticate some requests for the said content at build-time, grab the assets it needs and then deploy.

What we can't really support is runtime secrets.[^*] Since the site is static, if we're using some 3rd-party service, the secrets will be exposed through network calls however clever we are in hiding them while they're stored on the client's side. If we need to do this, our options are basically limited to [proxying](https://en.wikipedia.org/wiki/Proxy_server) the request in some manner, either by using a [Backend-For-Frontend](https://docs.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends) (BFF) or a serverless function, mediating the external calls there and storing the keys on that layer instead.[^1]

With that disclaimer out of the way, let's store a build-time secret for the Adobe View SDK, which I use to render the PDF of my CV on the aboutme page. I'm going to do this more as a learning exercise than a security measure, as the key will be included in the static site so that users viewing the site can use the Adobe PDF viewer. Luckily, it's free for unlimited use, and each key is restricted by domain, so there's not a lot a bad actor can do even if they do extract the key.





[^*] (As with everything on this site, caveat emptor: to the best of my knowledge!)

[^1] This is all what I understand from this StackOverflow discussion https://stackoverflow.com/questions/62231572/how-to-store-and-access-api-keys-and-passwords-with-gatsby