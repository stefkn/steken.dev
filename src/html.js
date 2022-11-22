import React from "react"
import PropTypes from "prop-types"

// This file defines a top-level function which determines
// DOM elements included on every page of the site
// We use it to include the Adobe Document Cloud View SDK script

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta id="theme-color-meta" name="theme-color" content={"#2f39ae"} />
        {props.headComponents}
        <script type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              // Load the Adobe View SDK when we get the event
              document.addEventListener('loadAdobeSDKNow', () => {
                var script = document.createElement('script');
                script.src = 'https://documentservices.adobe.com/view-sdk/viewer.js';
                document.head.appendChild(script);
              })
            `
          }}
        ></script>
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <audio id="index-audio" controls loop preload="false" src="/Percussions_digital_arpeggios.mp3"></audio>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
