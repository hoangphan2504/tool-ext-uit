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
    
    return [selectionTextNode,selectionRect, selectedElement, getRange];
}

function renderTool(selectionTextRange, selectedElement, selectionText, getRange, selectionTextNode){
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
    const top = selectionTextRange.top + selectionTextRange.height + 1  + 'px';
    const left = selectionTextRange.left + (selectionTextRange.width / 2) + 20  -  (tooltipWrapper.offsetWidth/2) + 'px';

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
               // // Define the base URL based on the mode
               const baseUrl = 'https://mmlab.uit.edu.vn/check-paper/api/check';
               //const baseUrl = 'http://localhost:3001/api/check';
               // // Construct the complete URL
               const url = `${baseUrl}?input=${encodeURIComponent(selectionText)}`;

               // // Make the fetch request
               const result = await fetch(url);

                //
                const resultJson = await result.json();
                const correctedGrammar = resultJson.output;
                console.log(correctedGrammar);
                //remove loading 
                const loading = document.querySelector('div#loading-ext-uit')
                loading.remove();
                renderResult(selectionTextRange, selectionText, correctedGrammar, selectedElement, getRange, selectionTextNode);
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
  
    bodyDOM.appendChild(tooltipWrapper);
  }
  

  function renderResult(selectionTextRange, selectionText, answer, selectedElement, getRange, selectionTextNode) {
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
  
        console.log(2, tooltipContainer);
  
        const suggestionTab = tooltipContainer.querySelector('#suggestion-tab');
        const paraphraseTab = tooltipContainer.querySelector('#paraphrase-tab');
        suggestionTab.style.fontWeight = 'bold';
        paraphraseTab.style.fontWeight = 'normal';
  
        const outputContainer = tooltipContainer.querySelector('.output-textarea');
  
        let grammar; // Declare grammar variable here
  
        if (answer == "1" || answer == "1.") {
          grammar = "Congratulation, no error. Let's check the paraphrase version.";
          outputContainer.textContent = grammar;
        } else {
          grammar = answer;
          outputContainer.textContent = grammar;
        }
  
        // Add event listeners to the tabs
        suggestionTab.addEventListener('click', showSuggestion);
        paraphraseTab.addEventListener('click', showParaphrase);
  
        // Function to show the Suggestion tab content
        function showSuggestion() {
          // Remove the active-tab class from the paraphraseTab
          paraphraseTab.classList.remove('active-tab');
          // Add the active-tab class to the suggestionTab
          suggestionTab.classList.add('active-tab');
          suggestionTab.style.fontWeight = 'bold';
          paraphraseTab.style.fontWeight = 'normal';
          // Update the output content with the suggestion content
          outputContainer.textContent = grammar;
  
          // Enable/disable buttons based on conditions
          updateButtonState();
        }
  
        let paraphraseFetched = false;
        let parap = "waiting...";
  // Function to fetch the paraphrase result
        async function fetchParaphrase() {
          try {
            const baseUrl = 'https://mmlab.uit.edu.vn/check-paper/api/para';
            // Make the fetch request
            const result = await fetch(baseUrl);
            const resultJson = await result.json();
            parap = resultJson.output;
            return parap;
          } catch (err) {
            console.log(err);
          }}


        // Function to show the Paraphrase tab content
        function showParaphrase() {
          outputContainer.textContent = parap;
          // Remove the active-tab class from the suggestionTab
          suggestionTab.classList.remove('active-tab');
          // Add the active-tab class to the paraphraseTab
          paraphraseTab.classList.add('active-tab');
          paraphraseTab.style.fontWeight = 'bold';
          suggestionTab.style.fontWeight = 'normal';


          if (!paraphraseFetched) {
            // Fetch the paraphrase if it hasn't been fetched before
            fetchParaphrase()
              .then(para => {
                // Update the output container with the paraphrase result
                outputContainer.textContent = para;
                // Set the flag to true indicating that the paraphrase has been fetched
                paraphraseFetched = true;
              })
              .catch(err => {
                console.log(err);
              });
          }


          // Update the output content with the paraphrase content
          //outputContainer.textContent = answer.paraphrase;
  
          // Enable/disable buttons based on conditions
          updateButtonState();
        }
  
        // Function to enable/disable buttons based on conditions
        function updateButtonState() {
          const isSuggestionTabActive = suggestionTab.classList.contains('active-tab');
          const isGrammarOne = answer == '1' || answer == '1.';
  
          // Get the "Copy" and "Approve" button elements
          const copyButton = tooltipContainer.querySelector('#copy-button');
          const approveButton = tooltipContainer.querySelector('#approve-button');
  
          if (isSuggestionTabActive && isGrammarOne) {
            copyButton.disabled = true;
            approveButton.disabled = true;
          } else {
            copyButton.disabled = false;
            approveButton.disabled = false;
          }
        }
  
        // Append the content to the tooltip container
        tooltipWrapper.appendChild(tooltipContainer);
  
        // determine top, left of tooltip
        const top = selectionTextRange.top + selectionTextRange.height - 2 + 'px';
        const left = selectionTextRange.left + (selectionTextRange.width / 2) - (tooltipWrapper.offsetWidth / 2) + 'px';
  
        tooltipWrapper.style.top = top;
        tooltipWrapper.style.left = left;
  
        bodyDOM.appendChild(tooltipWrapper);
  
        // Get the "Approve" button element
        const approveButton = tooltipContainer.querySelector('#approve-button');
  
        // Add event listener to the "Approve" button
        approveButton.addEventListener('click', () => {
          const isSuggestionTabActive = suggestionTab.classList.contains('active-tab');
          const outputContent = isSuggestionTabActive ? answer.correctedGrammar : answer.paraphrase;
  
          let op = outputContent;
          try {
            if (selectionTextNode.rangeCount) {
              getRange.deleteContents();
              getRange.insertNode(document.createTextNode(op));
            }
            tooltipWrapper.remove();
          } catch (error) {
            console.error(error);
          }
        });
  
        const copyButton = tooltipContainer.querySelector('#copy-button');
        copyButton.addEventListener('click', () => {
          const isSuggestionTabActive = suggestionTab.classList.contains('active-tab');
          let text = isSuggestionTabActive ? answer.correctedGrammar : answer.paraphrase;
          navigator.clipboard.writeText(text)
            .then(() => {
              console.log('Text copied to clipboard');
            })
            .catch((error) => {
              console.error('Error copying text to clipboard:', error);
            });
        });
  
        // Enable/disable buttons based on initial conditions
        updateButtonState();

        // drag mouse
        let box = tooltipContainer.querySelector('.box');
        //let boxBody = tooltipContainer.querySelector('.box-body');

        function onDrag({movementX , movementY}){
            let getStyle = window.getComputedStyle(box);
            let leftValue = parseInt(getStyle.left);
            let topValue = parseInt(getStyle.top);

            box.style.left = `${leftValue + movementX}px`;
            box.style.top = `${topValue + movementY}px`;
        }
        box.addEventListener('mousedown', ()=> {
          box.style.cursor = 'all-scroll';
          box.addEventListener('mousemove', onDrag);
        })

        box.addEventListener('mouseup', ()=> {
          box.style.cursor = 'default';
          box.removeEventListener('mousemove', onDrag);
        })

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


bodyDOM.addEventListener("mouseup", () => {
    
    showExtensionIcon();
});

bodyDOM.addEventListener("keyup", (event) => {
    if (event.shiftKey && event.key.includes("Arrow")) {
        showExtensionIcon();
    }
});


let tooltipWrapper;
function showExtensionIcon() {
    const tooltipResult = document.querySelector('div#research-result-ext-uit')
    if(tooltipResult) hideOnClickOutside(tooltipResult)
    //tooltipResult.remove();


    selectionText= getSelectedText();
    if(selectionText.length >0) {  
        const [selectionTextNode, selectionTextRange, selectedElement, getRange]= getRangeSelectionText();

        if(tooltipWrapper) tooltipWrapper.remove();
        renderTool(selectionTextRange, selectedElement, selectionText, getRange, selectionTextNode); // hiển thị icon extension cho user click
        tooltipWrapper = document.querySelector('div#research-ext-uit'); // Update the tooltipWrapper variable with the new tooltip
        setTimeout(() => {
            const tooltipWrapper = document.querySelector('div#research-ext-uit'); 

            if(tooltipWrapper) tooltipWrapper.remove();
        }, 3000)
    }
}
    



