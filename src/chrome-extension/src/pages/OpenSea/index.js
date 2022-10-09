import { printLine } from './modules/print';

console.log('Opensea script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
const mainSearch = async () => {
  console.log("search")
  let path = "//a[contains(@href,'/assets/')]"
  let assetUrl = getElementByXpath(path)
  console.log(assetUrl)
  if(!window.location.href.includes("/0x")){

    do {
      console.log("searching")
      assetUrl = getElementByXpath(path)
      await wait(500)
    }
    while (!assetUrl)
    const assetUrlPaths = assetUrl.href.split("/")
    const asset = assetUrlPaths[5]
    const chain = assetUrlPaths[4]
    console.log("Setting asset, chain", asset, chain)
    chrome.storage.sync.set({ asset, chain })
  }
}

const main = () => {
  //> div:nth-child(3) > div
  const buttonArea = document.querySelector('div .TradeStation--main  ');//> div:nth-child(3) > div
  let outerArea = document.createElement("div");
  let btn = document.createElement("button");
  btn.innerHTML = "⚡ MEV";
  btn.type = "submit";
  btn.name = "formBtn";
  //style the button in CSS with a light blue background and a strong blue font min width 75px and padding 10px
  btn.style = "justify-content: center; text-align: center; padding: 17px 24px; width: 100%; border: 2px solid rgb(229, 232, 235); background-color: white ; color: rgb(32, 129, 226); display: inline-flex; flex-direction: row; font-weight: 600; border-radius: 12px";
  btn.onclick = function (event) {
    console.log("MEV button clicked")
    chrome.runtime.sendMessage({
      msg: "something_completed",
      data: {
        subject: "Loading",
        content: "Just completed!"
      }
    });

  };
  outerArea.style = "margin-top: 20px"
  outerArea.appendChild(btn)
  buttonArea.appendChild(outerArea)

}

// mainSearch()
try {
  
  main();
} catch (error) {
  
}
try {
  
  mainSearch()

} catch (error) {
  
}