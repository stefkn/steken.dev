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

    if (!location.pathname === '/') {
        document.body.style.overflow = 'auto';
    }

    // if (['/aboutme', '/aboutme/'].includes(location.pathname) && window.adobe_dc_view_sdk) {
    //     document.addEventListener('adobe_dc_view_sdk.ready', function () {
    //         setTimeout(() => {
    //             var adobeDCView = new window.adobe_dc_view_sdk.default({
    //                 clientId: `${process.env.ADOBE_API_KEY}`,
    //                 divId: 'adobe-dc-view',
    //             });
    //             adobeDCView.previewFile({
    //                     content: { location: { url: '/CV_2022.pdf' } },
    //                     metaData: { fileName: 'CV_2022.pdf' },
    //                 },{embedMode: "IN_LINE", dockPageControls: false}
    //             );
    //         }, 1000);
    //     });

    //     function recursivelyWaitForAdobeViewSDK () {
    //         setTimeout(() => {
    //             if (window.adobe_dc_view_sdk) {
    //                 document.dispatchEvent(new Event('adobe_dc_view_sdk.ready'));
    //             } else {
    //                 recursivelyWaitForAdobeViewSDK();
    //             }
    //         }, 300);
    //     }

    //     recursivelyWaitForAdobeViewSDK();
    // };
}
