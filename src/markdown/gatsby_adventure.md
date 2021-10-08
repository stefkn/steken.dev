---
slug: "/article/introducing-gatsby"
date: "2021-10-25"
title: "Introducing Gatsby"
subtitle: "Why, hello old sport!"
tags: "programming gatsby web blog"
published: true
excerpt: A brief intro to static, client- and server-side rendering, and what static site generators are about.
reading_time: 15
cover_image: "img_5328.jpeg"
---

<div style="width:100%;height:0;padding-bottom:56%;position:relative;">
  <img src="https://media.giphy.com/media/g9582DNuQppxC/source.gif" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></img>
</div>


>_“Anything can happen now that we’ve slid over this bridge,”_ I thought; _“anything at all...”_
>
>_Even Gatsby could happen,_ without any particular wonder.
>
>**The Great Gatsby** ∙ F. Scott Fitzgerald ∙ 1925

*Excuse the cliché Gatsby / Great Gatsby joke...*

While it seems to have lost some of its luster lately in comparison to even newer kids on the block [^1], I've been working on this [Gatsby](https://www.gatsbyjs.com/) personal website now (it shames me to admit) for the better part of a year, basing initially off of an excellent free template called Absurd, by ajayns.

If for no other reason than to get more exposure to React and GraphQL, and to experience the process of migrating from one static site generator (Jekyll) to another, I'm still very glad that I undertook the project. It's been a while since I worked with React, so it was a great excuse to learn about changes since older versions (<16) such as Hooks and Fiber. [^2]

Since we're on the topic, I thought it would be a great excuse to write a small piece on static vs. client/server-side rendering (CSR/SSR), what in the world a _"Jamstack"_ is, and what Gatsby is all about.


## A brief history of the web

In order to explain the differences between the three main web paradigms, it's necessary to go back (briefly) into the history of the modern web for a little context – a topic I find fascinating. Here goes:

As you may already know, the World Wide Web was a **side-project** of a contractor-turned-scientist at CERN, (now a Sir) Tim Berners-Lee – *making every other side project since look pretty underwhelming.* In the earliest days, there was one web server, a NeXT Computer with a now-legendary sticker on the front reading: **"this machine is a server ... DO NOT POWER DOWN !!!"** [^3]

This machine has a fascinating history, a Marvel-esque cross-universe Silicon Valley origin story with Steve Jobs and his fabled ousting from Apple... but I digress. The  machine ran the first web server software, [CERN httpd](https://en.wikipedia.org/wiki/CERN_httpd). For those playing along at home, you can even go and look at some of the [original C source](https://www.w3.org/Daemon/Implementation/HTDaemon.c) code at the W3C foundation.

In essence, httpd – while cutting-edge stuff at the time – was pretty simple. [^4] You give it some configuration rules, tell it where the files are, and that's it. Other machines can send it HTTP requests, and httpd will respond to them with the files it finds under the `/Public/Web/` directory. [^5] In terms of interactivity, the best you could ask for were [Common Gateway Interface (CGI)](https://www.w3.org/Daemon/User/CGI/Overview.html) scripts. Instead of simply serving a HTML document when a browser issues a request for a CGI URL, the server runs a specified CGI script, which outputs either a dynamically-generated HTML document (such as a list of search results) or the location of another HTML document. See [here](https://computer.howstuffworks.com/cgi3.htm) for more details.

While still used today, the web server spawns a new CGI process for each new incoming request to a CGI URL; **the overhead of spawning and killing a process for each new request quickly becomes massive** when dealing with a high-throughput website. Clearly, the modern interactive web wouldn't be possible if we were still using CGI scripts to render everything!


## Static, Client- and Server Side Rendering

This brings us neatly to the topic of static, client- and server-side rendering. We're far from the days of yore when web pages were largely static content; we now expect web pages to be **sophisticated applications in themselves,** allowing us to send messages, shop securely, stream live content, [collaboratively animate](https://garticphone.com/), [get lost in the world](https://www.geoguessr.com/), and much more. CGI simply doesn't give us the flexibility we need to enable such experiences. Which brings us to:

### Client Side Rendering (CSR)

**A fundamental shift occurred on the web with the introduction of JavaScript (neé LiveScript) with Netscape Navigator in 1995.** This allowed for computation to move to the "edge" of the web; instead of clients having to send a request for computation to the server, client-side JavaScript allowed clients to run their own logic within the browser. [^6]

In the modern day, we've discovered that this client-side JS can be used to display the entire web page. Using frontend frameworks such as React, Angular and Vue, [^9] we now have a world where the client requests a URL, and the server will respond with static HTML, CSS, and a bundle of JS. [^11] This bundle of JS, containing a frontend framework [^10] as we mentioned earlier, will hook in to the DOM (Document Object Model) which the browser uses to display the contents of the web page.

Now, if you were to submit a form, or follow a link, the frontend framework can take care of rendering the result. **The advantage here is that this means the frontend framework has the freedom to "replace" what would otherwise become another request to the server.**

For example, for a simple website consisting of two pages, with the homepage linking to the second page:

- With SSR, the client would request the homepage. Clicking on the link would issue a request for the second page. (The second request would re-request all of the assets duplicated between the two pages)
- Using CSR, the required assets for both pages can be requested on the initial page load, and the frontend framework can take care of *only swapping out the differing page elements* purely on the client side, reducing both the number of required requests and the number of draw calls. [^7] It can intercept requests that would ordinarily issue a new request to the server and replace them with client-side JS event handlers.

The advantages of CSR are numerous, but it's not a fix-all solution. If you have a complex app that requires a lot of user interaction it would definitely be an approach to consider – combining a frontend framework, such as React, with a state management framework, like Redux, gives you a great foundation for a fully self-contained [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) (SPA). [^8] This approach allows instant feedback to user interaction and a generally "snappy" feeling experience if done right.

### Server Side Rendering (SSR)

SSR is the more "traditional" approach, and encompasses the CGI scripts we mentioned earlier. Typically,




### Static Site Generation (SSG)

## So, Gatsby?


## Some further reading

- Check out a whole raft of other [Jamstack static site generators](https://jamstack.org/generators/) on the Jamstack website.
- Other things
- More things


<!-- Footnotes -->

[^1]: See [Next.js](https://nextjs.org/), [Hugo](https://gohugo.io/), [Nuxt.js](https://nuxtjs.org/)

[^2]: See [What’s New in React 16 and Fiber](https://medium.com/edge-coders/react-16-features-and-fiber-explanation-e779544bb1b7) and [Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)

[^3]: Which you can go and see for yourself in the [Science Museum's permanent collection, in London.](https://collection.sciencemuseumgroup.org.uk/objects/co8232360/next-cube-computer-1990-personal-computer) I recommend it!

[^4]: Not to say it wasn't sophisticated; it has the ability to do authentication, URL translation rules, filesystem and directory stuff (even icons!), a fully configurable CGI script interface, accessory scripts, detailed logging and can even be configured to act as a proxy server.

[^5]: As long as you configure it with the line, `Pass	/*	/Public/Web/*`. [Here's an example](https://www.w3.org/Daemon/User/Config/httpd.conf.txt) httpd configuration file.

[^6]: Interestingly, this mirrors the development of the personal computer; in the early days, terminals would connect and [timeshare](https://en.wikipedia.org/wiki/Time-sharing) on a single mainframe computer. With the introduction of microcomputers, and later the IBM Personal Computer, computing power moved out to the "edge" -- out from large, loud, air-conditioned server rooms and into people's offices and homes. You could even argue that this trend continues with the proliferation of IoT (Internet of Things) and [Ambient Computing](https://www.digitaltrends.com/computing/what-is-ambient-computing/).

[^7]: This explanation glosses over a great deal of complexity involved in comparing and reconcilling updates to the DOM in an efficient manner, an impressive technical feat on its own. React does this using an in-memory representation of the DOM called the Virtual DOM, against which it can compare the real DOM using a [diffing algorithm.](https://reactjs.org/docs/reconciliation.html). This means it only needs tp update the sub-tree of components that have been updated. [More in-depth info here.](https://hackernoon.com/virtual-dom-reconciliation-and-diffing-algorithm-explained-simply-ycn34gr)

[^8]: Ditto with frontend framework Vue combined with the Vuex state management library. We use this at tails.com! Other options include Angular, ExtJS, KnockoutJS, Ember, and much more.

[^9]: These are the most popular today, but were not the first by a long shot. What could be considered the first SPA website was created [as far back as 2002.](https://en.wikipedia.org/wiki/Single-page_application#cite_note-4)

[^10]: Along with about a billion dependencies... !<div style="max-width: 400px"> ![A boy with a very very large backpack with the caption, "a simple web page" / "2GB node modules"](../images/article_images/node_modules_backpack.jpeg) </div>

[^11]: Technically, it will respond with a place where you can fetch the bundle of JS from, like a CDN (Content Delivery Network) but the effect is the same.