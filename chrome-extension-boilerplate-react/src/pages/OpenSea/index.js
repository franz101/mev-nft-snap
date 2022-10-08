import { printLine } from './modules/print';

console.log('Opensea script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");


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
    btn.onclick= function(event) {
        console.log("MEV button clicked")};
    outerArea.style = "margin-top: 20px"
    outerArea.appendChild(btn)
  buttonArea.appendChild(outerArea)
}

main();