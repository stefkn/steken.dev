/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export function onRouteUpdate({ location, prevLocation }) {
    /**
     * This function is triggered in the browser whenever the current route changes
     * (i.e. the user navigates to a new page)
     * We use it here to trigger the load of the Adobe Cloud View SDK on the page
     * /aboutme/ as we want to show the CV PDF there and only there.
     * We use setTimeout recursively in recursivelyWaitForAdobeViewSDK
     * as sometimes it takes a while for the script to load.
     */

    // console.log("new pathname", location.pathname);
    // console.log("old pathname", prevLocation ? prevLocation.pathname : null);
    // console.log(`${process.env.ADOBE_API_KEY}`);
}
