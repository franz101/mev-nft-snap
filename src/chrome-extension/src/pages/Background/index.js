console.log('This is the background page.');
console.log('Put the background scripts here.');
// async function getCurrentTab() {
//     let queryOptions = { active: true, lastFocusedWindow: true };
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
//   }


//   chrome.tabs.onActivated.addListener(main)
// function main (){
//     console.log("main")
//     getCurrentTab().then((tab) => {console.log(tab)})
// }

// main()

// chrome.webRequest.onBeforeRequest.addListener(
//     function (details) {
//         var javascriptCode = loadSynchronously(details.url);
//         console.log(javascriptCode);
//         // modify javascriptCode here
//         return { redirectUrl: "data:text/javascript," 
//                              + encodeURIComponent(javascriptCode) };
//     },
//     { urls: ["*://*.example.com/*.js"] },
//     ["blocking"]);