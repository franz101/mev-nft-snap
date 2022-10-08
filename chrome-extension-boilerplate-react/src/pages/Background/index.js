console.log('This is the background page.');
console.log('Put the background scripts here.');
chrome.tabs.onUpdated.addListener((activeInfo,changeInfo)=>{
    if(changeInfo.url){
        console.log(changeInfo)
    }else{

        chrome.tabs.get(activeInfo.tabId, (tab)=>{
            console.log(tab.url);
        });
    }
}
);

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        var javascriptCode = loadSynchronously(details.url);
        console.log(javascriptCode);
        // modify javascriptCode here
        return { redirectUrl: "data:text/javascript," 
                             + encodeURIComponent(javascriptCode) };
    },
    { urls: ["*://*.example.com/*.js"] },
    ["blocking"]);