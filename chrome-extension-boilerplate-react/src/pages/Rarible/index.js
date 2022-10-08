import { printLine } from './modules/print';

console.log('Opensea script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");
function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const main = async () => {
  let buttonArea = undefined
  do{
    buttonArea =  getElementByXpath("//*[@id='purchase']/./../../../div");
    await wait(500)
  }
  while(!buttonArea)

  let outerArea = document.createElement("div");
  let btn = document.createElement("button");
    btn.innerHTML = "⚡ MEV";
    btn.type = "submit";
    btn.name = "formBtn";
    //style the button in CSS with a light blue background and a strong blue font min width 75px and padding 10px
    btn.style = `
    
    border-radius: 13px; height: 42px; border-color: rgba(255, 255, 255, 0.08); color:
    rgb(255, 255, 255); background: transparent; outline: none;
     padding: 0px 21px; justify-content: center; flex-flow: row nowrap; display: flex;
     align-items: center; font-size: 14px; font-weight: 900; width:100%;
    
    `;
    btn.onclick= function(event) {
        console.log("MEV button clicked")};
    outerArea.style = "margin-top: 20px; width: 100%"
    outerArea.appendChild(btn)
  buttonArea.appendChild(outerArea)
}

main();