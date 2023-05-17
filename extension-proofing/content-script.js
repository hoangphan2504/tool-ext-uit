//const { log } = require("console");
//var {popup} = require("./popup.js");

console.log("Content script is runnIng", chrome);
const bodyDOM = document.querySelector("body");
let selectionText = "";


// lay duoc selection text
function getSelectedText() {
  var selectedText = '';

  // window.getSelection
  if (window.getSelection) {
      selectedText = window.getSelection().toString();
  }
  // document.getSelection
  else if (document.getSelection) {
      selectedText = document.getSelection().toString();
  }
  // document.selection
  else if (document.selection) {
      selectedText =
          document.selection.createRange().text;
  } else return '';
  // To write the selected text into the textarea
  return selectedText;
}

function getSelectedTextNode() {
    var selectedText = '';
  
    // window.getSelection
    if (window.getSelection) {
        selectedText = window.getSelection();
    }
    // document.getSelection
    else if (document.getSelection) {
        selectedText = document.getSelection();
    }
    // document.selection
    else if (document.selection) {
        selectedText =
            document.selection.createRange().text;
    } else return '';
    // To write the selected text into the textarea
    return selectedText;
}

function getRangeSelectionText() {
    const selectionTextNode = getSelectedTextNode();
    
    const getRange = selectionTextNode.getRangeAt(0); 
    const selectedElement = getRange.commonAncestorContainer.parentElement;  
    const selectionRect = getRange.getBoundingClientRect();
    
    return [selectionRect, selectedElement];
}

function renderTool(selectionTextRange, selectedElement, selectionText, answer){
    const tooltipWrapper = document.createElement('div');
    tooltipWrapper.id = 'research-ext-uit';
    const tooltipIcon = document.createElement('div');
    tooltipIcon.classList.add("research-ext-icon");
    tooltipIcon.innerHTML = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="20.000000pt" height="20.000000pt" viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
   fill="#000" stroke="none"><path d="M2360 5109 c-451 -51 -883 -283 -1173 -628 -439 -523 -548 -1242
   -283 -1863 96 -225 209 -391 386 -568 140 -140 265 -234 417 -312 l103 -53 0
   -237 0 -238 -75 0 -75 0 0 -225 0 -225 75 0 75 0 0 -150 0 -150 73 0 72 0 44
   -218 c24 -119 46 -223 49 -229 3 -10 57 -13 223 -13 l219 0 0 40 0 40 70 0 70
   0 0 -40 0 -40 219 0 c166 0 220 3 223 13 3 6 25 110 49 229 l44 218 73 0 72 0
   0 150 0 150 75 0 75 0 0 225 0 225 -75 0 -75 0 0 238 0 237 71 35 c168 82 345
   215 486 364 455 481 608 1170 401 1801 -39 119 -142 328 -217 440 -368 550
   -1033 858 -1691 784z m475 -163 c612 -103 1127 -558 1304 -1153 51 -172 65
   -278 65 -483 0 -161 -4 -201 -27 -311 -111 -526 -445 -951 -924 -1176 l-93
   -43 0 -285 0 -285 -260 0 -260 0 0 362 0 362 233 235 c128 130 254 265 279
   301 167 238 242 509 217 793 -22 254 -129 505 -290 681 l-52 57 -49 -48 c-26
   -26 -48 -51 -48 -56 0 -4 22 -34 48 -66 113 -136 189 -292 224 -461 16 -78 19
   -122 15 -245 -5 -175 -28 -271 -101 -420 -62 -126 -126 -206 -310 -390 l-161
   -160 -3 455 -2 455 135 135 135 135 -52 53 -53 52 -82 -82 -83 -83 0 168 0
   167 -80 0 -80 0 0 -392 0 -393 -83 83 -83 82 -52 -53 -52 -52 135 -135 135
   -135 0 -230 0 -230 -176 175 c-239 238 -314 354 -376 578 -18 65 -22 105 -22
   252 0 211 16 286 99 455 73 148 119 206 354 440 l201 200 123 -123 122 -122
   53 53 52 52 -175 175 -175 175 -266 -265 c-146 -146 -288 -294 -315 -330 -72
   -94 -164 -285 -194 -403 -89 -353 -25 -702 183 -997 25 -36 151 -171 279 -301
   l233 -235 0 -362 0 -362 -260 0 -260 0 0 288 0 287 -61 25 c-33 13 -104 49
   -158 80 -429 248 -717 660 -807 1155 -25 138 -25 412 0 550 132 732 703 1271
   1443 1365 94 12 349 4 458 -14z m475 -3961 l0 -75 -750 0 -750 0 0 75 0 75
   750 0 750 0 0 -75z m-150 -300 l0 -75 -600 0 -600 0 0 75 0 75 600 0 600 0 0
   -75z"/>
   </g></svg>`;
    tooltipWrapper.appendChild(tooltipIcon);

    // determine top, left of tooltip
    const top = selectionTextRange.top + selectionTextRange.height + 1 + 'px';
    const left = selectionTextRange.left + (selectionTextRange.width / 2) - (tooltipWrapper.offsetWidth/2) + 'px';

    tooltipWrapper.style.position = 'absolute';
    tooltipWrapper.style.background = 'white';
    tooltipWrapper.style.cursor = 'pointer';
    tooltipWrapper.style.padding = '4px';
    tooltipWrapper.style.top = top;
    tooltipWrapper.style.left = left;


    bodyDOM.appendChild(tooltipWrapper);

    const loading = false;
    if(tooltipWrapper) {
    tooltipWrapper.addEventListener("click", async () => {
        const loading = true;


        console.log(selectionText);
        if(selectionText.length > 0){
            try{
                Loading(selectionTextRange, selectionText);
                const result = await fetch(`http://localhost:3001/api/check?input=${selectionText}`);
                const resultJson = await result.json();

                //remove loading 
                const loading = document.querySelector('div#loading-ext-uit')
                loading.remove();

                renderResult(selectionTextRange, selectionText, resultJson.output, selectedElement);
                // addevent 
                // const newElement = document.createElement('div');
                // newElement.innerHTML = resultJson.output; 
                // selectedElement.parentNode.replaceChild(newElement, selectedElement);
                //selectedElement.innerHTML = 
            } 
            catch(err){
                console.log(err);
            }
        }
    });
}   
}


async function Loading(selectionTextRange, selectionText) {
    const tooltipWrapper = document.createElement('div');
    tooltipWrapper.id = 'loading-ext-uit';
    const tooltipContainer = document.createElement('div');
    tooltipContainer.classList.add("loading-ext-container");
  
    // Fetch the HTML file
    const filePath = chrome.runtime.getURL('loader.html');
    const response = await fetch(filePath);
    const htmlContent = await response.text();
  
    // Set the fetched HTML as the inner HTML of the tooltip container
    tooltipContainer.innerHTML = htmlContent;
  
    tooltipWrapper.appendChild(tooltipContainer);
  
    // determine top, left of tooltip
    const top = selectionTextRange.top + selectionTextRange.height - 2 + 'px';
    const left = selectionTextRange.left + (selectionTextRange.width / 2) - (tooltipWrapper.offsetWidth / 2) + 'px';
  
    tooltipWrapper.style.position = 'absolute';
    tooltipWrapper.style.background = 'white';
    tooltipWrapper.style.cursor = 'pointer';
    tooltipWrapper.style.padding = '4px';
    tooltipWrapper.style.top = top;
    tooltipWrapper.style.left = left;
    bodyDOM.appendChild(tooltipWrapper);
  }
  


function renderResult(selectionTextRange, selectionText, answer, selectedElement) {
    const tooltipWrapper = document.createElement('div');
    tooltipWrapper.id = 'research-result-ext-uit';
    const tooltipContainer = document.createElement('div');
    tooltipContainer.classList.add('box');
  
    const filePath = chrome.runtime.getURL('popup-content.html');
  
    // Fetch the HTML content
    fetch(filePath)
      .then(response => response.text())
      .then(html => {
        tooltipContainer.innerHTML = html;
  
        // Update the content of the HTML template
        const inputTextarea = tooltipContainer.querySelector('.input-textarea');
        const outputTextarea = tooltipContainer.querySelector('.output-textarea');
  
        inputTextarea.textContent = selectionText;
        outputTextarea.textContent = answer;
  
        // Append the content to the tooltip container
        tooltipWrapper.appendChild(tooltipContainer);
  
        // determine top, left of tooltip
        const top = selectionTextRange.top + selectionTextRange.height - 2 + 'px';
        const left = selectionTextRange.left + (selectionTextRange.width / 2) - (tooltipWrapper.offsetWidth / 2) + 'px';
  
        tooltipWrapper.style.position = 'absolute';
        tooltipWrapper.style.background = 'white';
        tooltipWrapper.style.cursor = 'pointer';
        tooltipWrapper.style.padding = '4px';
        tooltipWrapper.style.top = top;
        tooltipWrapper.style.left = left;
  
        bodyDOM.appendChild(tooltipWrapper);
  
        // Get the "Approve" button element
        const approveButton = tooltipContainer.querySelector('#approve-button');
  
        // Add event listener to the "Approve" button
        approveButton.addEventListener("click", () => {
            const newElement = document.createElement('div');
                newElement.innerHTML = answer; 
                selectedElement.parentNode.replaceChild(newElement, selectedElement);
        });
      })
      .catch(error => {
        console.error('Error loading HTML content:', error);
      });
  }
  
  


function hideOnClickOutside(element) {
    const outsideClickListener = event => {
        if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
          element.remove();
          removeClickListener();
        }
    }

    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener);
    }

    document.addEventListener('click', outsideClickListener);
}

const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );


bodyDOM.addEventListener("mouseup", ()=>{
    const tooltipResult = document.querySelector('div#research-result-ext-uit')
    if(tooltipResult) hideOnClickOutside(tooltipResult)
    //tooltipResult.remove();


    selectionText= getSelectedText();
    if(selectionText.length >0) {  
        const [selectionTextRange, selectedElement]= getRangeSelectionText();

        // console.log(selectionText);    
        // console.log(selectionTextRange);
        renderTool(selectionTextRange, selectedElement, selectionText);

        setTimeout(() => {
            const tooltipWrapper = document.querySelector('div#research-ext-uit'); 

            if(tooltipWrapper) tooltipWrapper.remove();
        }, 3000)
    }
})


// lang nghe khi nguoi dung click vao icon translator 
