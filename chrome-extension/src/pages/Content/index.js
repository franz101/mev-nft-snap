import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');
printLine("Using the 'printLine' function from the Print Module");


setTimeout(() => {
    chrome.storage.sync.set({tabUrl:window.location.href})
  }, 6000);

chrome.runtime.onMessage.addListener( // this is the message listener
    function(request, sender, sendResponse) {
        if (request.message === "method")
            {   
                switch (request.content) {
                    case "fetch":
                         
                      
                        break;
                
                    default:
                        break;
                }
            }
            
    }

);
