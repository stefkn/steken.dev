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
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <script src="https://documentcloud.adobe.com/view-sdk/main.js"></script>
        <script type="text/javascript"
          dangerouslySetInnerHTML={{ __html: `
            if (window.location.pathname === '/') {
              window.scroll({
                top: 0,
                left: 0,
              });
              setTimeout(() => {
                const gracefulLoading = document.getElementById('graceful-loader-curtain-index');
                gracefulLoading.classList.add('fade-out-anim');
                document.body.style.overflow = 'auto';
              }, 1500);
              setTimeout(() => {
                const gracefulLoading = document.getElementById('graceful-loader-curtain-index');
                gracefulLoading.classList.add('remove');
              }, 2500);
            } else {
              setTimeout(() => {
                const gracefulLoading = document.getElementById('graceful-loader-curtain-index');
                gracefulLoading.classList.add('fade-out-anim');
                document.body.style.overflow = 'auto';
              }, 500);
              setTimeout(() => {
                const gracefulLoading = document.getElementById('graceful-loader-curtain-index');
                gracefulLoading.classList.add('remove');
              }, 1000);
            }
          ` }}
        >
        </script>
        <style type="text/css"
          dangerouslySetInnerHTML={{ __html: `
            .fade-out-anim {
              animation: fadeout 800ms;
              animation-fill-mode: forwards;
              opacity: 1;
            }
            @keyframes fadeout {
              100% {
                opacity: 0;
              }
            }
            .remove {
              display: none;
              pointer-events: none;
            }
          ` }}
        >
        </style>
      </head>
      <body {...props.bodyAttributes} style={{overflow: 'hidden', backgroundColor: '#2f39ae'}}>
        <div
          id="graceful-loader-curtain-index"
          className="graceful-loader-curtain"
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            height:'100%',
            width:'100%',
            backgroundColor: '#2f39ae',
            zIndex: 10000
          }}
        ></div>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
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
