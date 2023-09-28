console.log("Content script is runnIng", chrome);
const bodyDOM = document.querySelector("body");
let selectionText = "";

function injectHelperScript() {
  const scriptElement = document.createElement('script');
  scriptElement.src = chrome.runtime.getURL('diff_match_patch.js');
  (document.head || document.documentElement).appendChild(scriptElement);
}

// Wait for a 1-second delay before injecting the helper script
setTimeout(injectHelperScript, 1000);

// lay duoc selection text
function getSelectedText() {
  var selectedText = '';

  // window.getSelection
  if (window.getSelection) {
      selectedText = window.getSelection().toString();
      console.log("vô window");
  }
  // document.getSelection
  else if (document.getSelection) {
      selectedText = document.getSelection().toString();
  }
  // document.selection
  else if (document.selection) {
      selectedText = document.selection.createRange().text;
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



    
    tooltipIcon.innerHTML = `<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" fill="none"><?xml version="1.0" ?><svg data-name="Layer 1" id="Layer_1" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#ffc43d;}.cls-2{fill:#faae17;}.cls-3{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:20px;}.cls-4{fill:#727373;}.cls-5{fill:#606161;}</style></defs><title/><path class="cls-1" d="M370.44,222.29a120.44,120.44,0,1,0-229.76,50.59l58.4,127.88H300.92l58.4-127.88A120,120,0,0,0,370.44,222.29Z"/><path class="cls-2" d="M250,101.85a120.44,120.44,0,0,0-16.1,1.2,120.37,120.37,0,0,1,93.22,169.83l-58.4,127.88h32.2l58.4-127.88A120.48,120.48,0,0,0,250,101.85Z"/><line class="cls-3" x1="250" x2="250" y1="10.88" y2="50.42"/><line class="cls-3" x1="398.45" x2="370.72" y1="73.67" y2="101.85"/><line class="cls-3" x1="456.14" x2="416.61" y1="223.18" y2="223.18"/><line class="cls-3" x1="101.55" x2="129.28" y1="73.67" y2="101.85"/><line class="cls-3" x1="43.86" x2="83.39" y1="223.18" y2="223.18"/><path class="cls-3" d="M370.44,222.29a120.44,120.44,0,1,0-229.76,50.59l58.4,127.88H300.92l58.4-127.88A120,120,0,0,0,370.44,222.29Z"/><path class="cls-4" d="M199,400.76H301a0,0,0,0,1,0,0v37.39a51,51,0,0,1-51,51h0a51,51,0,0,1-51-51V400.76A0,0,0,0,1,199,400.76Z"/><path class="cls-5" d="M268.77,400.76v37.39a51,51,0,0,1-34.87,48.33,50.78,50.78,0,0,0,16.1,2.64h0a51,51,0,0,0,51-51V400.76Z"/><path class="cls-3" d="M199,400.76H301a0,0,0,0,1,0,0v37.39a51,51,0,0,1-51,51h0a51,51,0,0,1-51-51V400.76A0,0,0,0,1,199,400.76Z"/><line class="cls-3" x1="186.39" x2="313.61" y1="436.13" y2="436.13"/><line class="cls-3" x1="186.39" x2="313.61" y1="400.76" y2="400.76"/></svg></svg>`
     tooltipWrapper.appendChild(tooltipIcon);

    // determine top, left of tooltip
    // const top = selectionTextRange.top + selectionTextRange.height + 1  + 'px';
    // const left = selectionTextRange.left + (selectionTextRange.width / 2) + 20  -  (tooltipWrapper.offsetWidth/2) + 'px';

    // tooltipWrapper.style.position = 'absolute';
    // tooltipWrapper.style.background = 'white';
    // tooltipWrapper.style.cursor = 'pointer';
    // tooltipWrapper.style.padding = '4px';
    // tooltipWrapper.style.top = top;
    // tooltipWrapper.style.left = left;



    const tooltipWidth = tooltipWrapper.offsetWidth;
  const tooltipHeight = tooltipWrapper.offsetHeight;
  const top = (window.innerHeight - tooltipHeight) / 2 + 'px';
  const left = (window.innerWidth - tooltipWidth) / 2 + 'px';

  tooltipWrapper.style.position = 'fixed';
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
              //bỏ loading đi
              console.log("render", selectionText);
                Loading(selectionTextRange, selectionText);
              // // Define the base URL based on the mode
              //const baseUrl = 'https://mmlab.uit.edu.vn/check-paper/api/check';
              const baseUrl = 'http://localhost:3001/api/check';
              //  Construct the complete URL
              const url = `${baseUrl}?input=${encodeURIComponent(selectionText)}`;

              // Make the fetch request
                const result = await fetch(url);
                //
                const resultJson = await result.json();
                console.log("selectionText: ", selectionText);
                let correctedGrammar = resultJson.output.correctedGrammar;
                console.log("grammar",correctedGrammar);
                let newVersion = resultJson.output.correctedGrammar;
                 const dmp = new diff_match_patch();
                 const diffs = dmp.diff_main(selectionText, correctedGrammar);
                 dmp.diff_cleanupSemantic(diffs);
                
                 const pattern = /No\s+(grammar|grammatical\s+)?error(s)?/i;

                // Use the test method to check if the sentence contains the pattern

                let grammarBox = pattern.test(correctedGrammar)? "No grammar error": dmp.diff_prettyHtml(diffs);
                correctedGrammar = dmp.diff_prettyHtml(diffs);

                console.log("after corrrect", correctedGrammar);


                const input = resultJson.output.input;

                console.log(10, input);
                console.log(11,correctedGrammar);
                //remove loading 
                const loading = document.querySelector('div#loading-ext-uit')
                loading.remove();
                renderResult(selectionTextRange, selectionText, grammarBox, input, selectedElement, getRange, selectionTextNode, newVersion);
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
  

  function renderResult(selectionTextRange, selectionText, answer, input, selectedElement, getRange, selectionTextNode, newVersion) {
    const tooltipWrapper = document.createElement('div');
    tooltipWrapper.id = 'research-result-ext-uit';
    const tooltipContainer = document.createElement('div');
    tooltipContainer.classList.add('box');
  
    const filePath = chrome.runtime.getURL('popup-content.html');
    console.log(100, answer);
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
        console.log("outputContainer", outputContainer);
        let grammar; // Declare grammar variable here
        console.log(14, answer.replace(/\r?\n|\r/g, " ") === input);
        console.log(15, answer.replace(/\r?\n|\r/g, " "));
        console.log(16, input);
        if (answer.replace(/\r?\n|\r/g, " ") === input.replace(/\r?\n|\r/g, " ")) {
          grammar = "Congratulation, no error. Let's check the paraphrase version.";
          outputContainer.textContent = grammar;
        } else {
          grammar = answer;
          outputContainer.innerHTML = grammar;
        }
  
        // Add event listeners to the tabs
        suggestionTab.addEventListener('click', showSuggestion);
        paraphraseTab.addEventListener('click', showParaphrase);
  
        // Function to show the Suggestion tab content
        function showSuggestion() {
          console.log("para", isCopied, " ", isCopiedPara);
          let status = isCopiedGrammar; 
          updateCopyButtonContent(status);
          // Remove the active-tab class from the paraphraseTab
          paraphraseTab.classList.remove('active-tab');
          // Add the active-tab class to the suggestionTab
          suggestionTab.classList.add('active-tab');
          suggestionTab.style.fontWeight = 'bold';
          paraphraseTab.style.fontWeight = 'normal';
          // Update the output content with the suggestion content
          outputContainer.innerHTML = answer;
          attachEventListenersToDels();
          
          // Enable/disable buttons based on conditions
          updateButtonState();
        }

        const acceptClicked = (element) => {
          // Check if del is a <del> tag
            console.log("tag",element);
          if (element && element.tagName === 'DEL') {
            console.log(1,"remove trong accept");
            const insTag = element.nextSibling;
            if(insTag && insTag.tagName === 'INS')
            {
              const text = insTag.textContent;
              const spanElement = document.createElement('span');
              spanElement.textContent = text;
              insTag.parentNode.replaceChild(spanElement, insTag);
            }
            const elementText = element.textContent;
            console.log(12321432,elementText);
            if (elementText.includes("¶")) {
            // If found, replace the entire content with "para<br>"
            const spanElement = document.createElement('span');
            spanElement.innerHTML =  "¶<br>";
            console.log("span trong accept", spanElement);
            element.parentNode.replaceChild(spanElement, element);
           }
           else{
             element.remove()
           }
          } 
          else {
            // If del is an <ins> tag, convert it to <span> and remove the background
            if (element && element.tagName === 'INS') {
                const text = element.textContent;
                const spanElement = document.createElement('span');
                spanElement.textContent = text;
               
                console.log("span after", spanElement);
                element.parentNode.replaceChild(spanElement, element);
                    //console.log(2, spanElement);
                   console.log("đổi span trong accept");
            }
          }
            answer = outputContainer.innerHTML
            isCopied = false;
            updateCopyButtonContent(isCopied)
            acceptButton.style.display = "none";
            rejectButton.style.display = "none";
            approveButton.style.display = "block";
            copyButton.style.display = "block";
        }
          
        const rejectClicked = (element) => {
            // Check if del is an <ins> tag
            if (element && element.tagName === 'INS') {
              // Remove the <ins> tag and its background
                console.log("remove trong reject");
              element.remove()
            } else {
              // If del is a <del> tag, convert it to <span> and remove the background
              if (element && element.tagName === 'DEL') {
                const text = element.innerHTML;
                const spanElement = document.createElement('span');
                spanElement.innerHTML = text;
    
                console.log("span after", spanElement);
                element.parentNode.replaceChild(spanElement, element);
    
              }
            }
            answer = outputContainer.innerHTML
            isCopied = false;
            updateCopyButtonContent(isCopied)
            acceptButton.style.display = "none";
            rejectButton.style.display = "none";
            approveButton.style.display = "block";
            copyButton.style.display = "block";
        }

        let currentElement = null;

        const delGroupPressed = (event) => {
          clickedElement  = event.target; // Store the target element
          console.log("event", event.target);
          rejectButton.style.display = "block";
          acceptButton.style.display = "block";
          approveButton.style.display = "none";
          copyButton.style.display = "none";
          console.log("current", currentElement);
          if (currentElement !== null) {
            currentElement.style.fontWeight = "normal";
          }
          if (currentElement !== clickedElement) {
            console.log("khác nè");
            clickedElement.style.fontWeight = "bold";
            currentElement = clickedElement;
          } else {
            currentElement = null;
          }

          acceptButton.addEventListener("click", () => acceptClicked(clickedElement));
          rejectButton.addEventListener("click", () => rejectClicked(clickedElement));
        } ;

        tooltipContainer.addEventListener("click", (event) => {
          const isInsideOutputTextarea = outputContainer.contains(event.target);
          const dels = outputContainer.querySelectorAll("span, ins, del");
      
          if (isInsideOutputTextarea) {
            const isInsideElements = Array.from(dels).some((element) => {
                return element.contains(event.target);
            });
    
            if (!isInsideElements) {
                // Show approve and copy buttons
                acceptButton.style.display = "none";
                rejectButton.style.display = "none";
                approveButton.style.display = "block";
                copyButton.style.display = "block";
            }
        }
      });
    
      
      console.log("outputConain234", outputContainer);
      const acceptButton = tooltipContainer.querySelector("#accept-button");
      const rejectButton = tooltipContainer.querySelector("#reject-button");
      
      function attachEventListenersToDels() {
        const dels = outputContainer.querySelectorAll("span, ins, del");
        
        console.log("del ne", dels);
      
        dels.forEach((element) => {
          console.log("del");
          element.addEventListener("click", delGroupPressed);
        });
      }

      attachEventListenersToDels();
      // const dels = outputContainer.querySelectorAll("span, ins, del");
      // const acceptButton = tooltipContainer.querySelector("#accept-button");
      // const rejectButton = tooltipContainer.querySelector("#reject-button");

      // console.log("del ne", dels);

      // dels.forEach((element) => {
      //   console.log("del");
      //   element.addEventListener("click", delGroupPressed);
      // });

        //dels.addEventListener("click", delGroupPressed);
    
        function combineSpans() {
          const outputDiv = tooltipContainer.querySelector("#output-textarea");
          if (areAllSpans(outputDiv)) {
            const spanText = outputDiv.textContent;
            const spanElement = document.createElement('span');
            spanElement.textContent = spanText;
            outputDiv.innerHTML = '';
            outputDiv.appendChild(spanElement);
            answer = spanText;
            console.log("answer cuối cùng", answer);
            document.querySelector(".copy-button").style.display = "block";
            document.querySelector(".approve-button").style.display = "block";
          }
          else{
            console.log("no");
          }
        }
    
        function areAllSpans(element) {
          const children = element.childNodes;
          for (const child of children) {
            if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'SPAN') {
              return false;
            }
         }
          return true;
      }

  
        let paraphraseFetched = false;
        let parap = "waiting...";
  // Function to fetch the paraphrase result
        async function fetchParaphrase() {
          try {
            const baseUrl = 'http://localhost:3001/api/para';
            //const baseUrl = 'https://mmlab.uit.edu.vn/check-paper/api/para';
            // Make the fetch request
            const result = await fetch(baseUrl);
            const resultJson = await result.json();
            console.log(resultJson.output);
            parap = resultJson.output;
            return parap;
          } catch (err) {
            console.log(err);
          }}


        // Function to show the Paraphrase tab content
        function showParaphrase() {
          let status =isCopiedPara;
          updateCopyButtonContent(status);
          console.log("para", isCopied, " ", isCopiedPara);
          outputContainer.innerHTML = parap;
          // Remove the active-tab class from the suggestionTab
          suggestionTab.classList.remove('active-tab');
          // Add the active-tab class to the paraphraseTab
          paraphraseTab.classList.add('active-tab');
          paraphraseTab.style.fontWeight = 'bold';
          suggestionTab.style.fontWeight = 'normal';


          if (!paraphraseFetched) {
            // Fetch the paraphrase if it hasn't been fetched before
            fetchParaphrase()
              .then(parap => {
                // Update the output container with the paraphrase result
                outputContainer.innerHTML = parap;
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
        let isCopiedGrammar = false;
        let isCopiedPara = false;

        // Add event listener to the "Approve" button
        approveButton.addEventListener('click', () => {
          //const isSuggestionTabActive = suggestionTab.classList.contains('active-tab');
          
          const outputTextarea = tooltipContainer.querySelector('.output-textarea');
          var tempElement = document.createElement("div");
          tempElement.innerHTML = outputTextarea.innerHTML;
          console.log("temp", tempElement);
          
          // Get all ins elements within the temporary element
          var delElements = tempElement.getElementsByTagName("DEL");
          console.log("delfiest", delElement);
          var insElements = tempElement.getElementsByTagName("INS");
          console.log("ins", insElement);
          // Convert ins tags to span tags and remove background
          for (var i = 0; i < insElements.length; i++) {
              var insElement = insElements[i];
              var newSpan = document.createElement("span");
              newSpan.innerHTML = insElement.innerHTML;
              insElement.parentNode.replaceChild(newSpan, insElement);
          }
          
          // Remove del tags
          var delElements = tempElement.getElementsByTagName("DEL");
          console.log("ban", tempElement);
          console.log("del", delElements);
          for (var i = delElements.length - 1; i >= 0; i--) {
            var delElement = delElements[i];
            delElement.parentNode.removeChild(delElement);
        }

          
          // Combine span elements into one span
          var combinedSpanText = "";
          var spanElements = tempElement.getElementsByTagName("span");
          console.log("span", spanElements);
          console.log("span length", spanElements[0], " ", spanElements[1]);
          for (var i = 0; i < spanElements.length; i++) {
              combinedSpanText += spanElements[i].textContent;
              console.log("checkk",combinedSpanText);
          }
        
          
          console.log("finish", combinedSpanText);
          combinedSpanText = combinedSpanText.replace(/¶/g, "\n")
          console.log("finish2", combinedSpanText);
          
          try {
            if (selectionTextNode.rangeCount) {
              getRange.deleteContents();
              getRange.insertNode(document.createTextNode(combinedSpanText));
            }
            tooltipWrapper.remove();
          } catch (error) {
            console.error(error);
          }
        });
        
        let isCopied = false;
        const copyButton = tooltipContainer.querySelector('#copy-button');
        copyButton.addEventListener('click', () => {
          const isSuggestionTabActive = suggestionTab.classList.contains('active-tab');
          console.log("bấm click");
          let text = isSuggestionTabActive ? answer : parap;
          if(text === answer)
          {
            console.log("check");
            isCopiedGrammar = true;
            isCopiedPara = false;
          }
          else 
          {
            isCopiedPara = true;
            isCopiedGrammar = false;
          }

          isCopied  = isSuggestionTabActive ? isCopiedGrammar : isCopiedPara;
          console.log(isCopiedGrammar, isCopiedPara);




          const outputTextarea = tooltipContainer.querySelector('.output-textarea');
          var tempElement = document.createElement("div");
          tempElement.innerHTML = outputTextarea.innerHTML;
          console.log("temp", tempElement);
          
          // Get all ins elements within the temporary element
          var delElements = tempElement.getElementsByTagName("DEL");
          console.log("delfiest", delElement);
          var insElements = tempElement.getElementsByTagName("INS");
          console.log("ins", insElement);
          // Convert ins tags to span tags and remove background
          for (var i = 0; i < insElements.length; i++) {
              var insElement = insElements[i];
              var newSpan = document.createElement("span");
              newSpan.innerHTML = insElement.innerHTML;
              insElement.parentNode.replaceChild(newSpan, insElement);
          }
          
          // Remove del tags
          var delElements = tempElement.getElementsByTagName("DEL");
          console.log("ban", tempElement);
          console.log("del", delElements);
          for (var i = delElements.length - 1; i >= 0; i--) {
            var delElement = delElements[i];
            delElement.parentNode.removeChild(delElement);
        }

          
          // Combine span elements into one span
          var combinedSpanText = "";
          var spanElements = tempElement.getElementsByTagName("span");
          console.log("span", spanElements);
          console.log("span length", spanElements[0], " ", spanElements[1]);
          for (var i = 0; i < spanElements.length; i++) {
              combinedSpanText += spanElements[i].textContent;
              console.log("checkk",combinedSpanText);
          }
        
          
          console.log("finish", combinedSpanText);
          combinedSpanText = combinedSpanText.replace(/¶/g, "\n")
          console.log("finish2", combinedSpanText);

          let copytext = isSuggestionTabActive ? combinedSpanText : parap;

          navigator.clipboard.writeText(copytext)
            .then(() => {
              console.log('Text copied to clipboard');
              console.log(isCopied);
              updateCopyButtonContent(isCopied);
            })
            .catch((error) => {
              console.error('Error copying text to clipboard:', error);
            });
        });

        function updateCopyButtonContent(status) {
          if (status) {
            copyButton.innerHTML = '<i class="fas fa-copy"></i> Copied';
          } else {
            copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
          }
        }
  
        // Enable/disable buttons based on initial conditions
        updateButtonState();

        // Find the close button element
        const closeButton = tooltipContainer.querySelector('.close-button');

        // Find the research result element
        const researchResult = document.querySelector('div#research-result-ext-uit');

        // Add click event listener to the close button
        closeButton.addEventListener('click', function() {
          // Remove the research result element
          console.log("click");
          if (researchResult) {
            console.log(1);
            researchResult.remove();
          }
        });

        const sectionTab = tooltipContainer.querySelector('#section-tab');
        
        // Function to handle the dropdown menu display
        function toggleDropdown() {
          var dropdownContent = tooltipContainer.querySelector('.dropdown-content');
          dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
        }

        sectionTab.addEventListener('click', toggleDropdown);

        // Function to handle the selection of options in the dropdown - when click on content, the dropdown disappear
        function handleDropdownOptionSelect() {
          // Hide the dropdown content when an option is selected
          var dropdownContent = tooltipContainer.querySelector('.dropdown-content');
          dropdownContent.style.display = 'none';
        }

        // Attach a click event listener to each dropdown option
        var dropdownOptions = tooltipContainer.querySelectorAll('.dropdown-option');
        dropdownOptions.forEach(function (option) {
          option.addEventListener('click', handleDropdownOptionSelect);
        });

        var dropdownContent = tooltipContainer.querySelector('.dropdown-content');
        dropdownContent.addEventListener('click', function (event) {
          // Stop the event from propagating to the sectionTab element
          event.stopPropagation();
        });

        //TITLE function check
        function containsDictionaryWord(input){
          const dictionaryWords = ["combine", "research", "study", "using"];
          let containsDictionaryWord = false;
          dictionaryWords.forEach(word => {
            if (input.includes(word)) {
              containsDictionaryWord = true;
            }
          });
          Used_common_word = tooltipContainer.querySelector('#Used-common-word');
          if (containsDictionaryWord) {
            console.log(1); // Return 1 if the text contains any of the dictionary words
            var icon = document.createElement("i");
            icon.className = "fas fa-times";
            icon.style.color = "red";
            Used_common_word.insertBefore(icon, Used_common_word.firstChild);
            //Used_common_word.innerHTML += `<i class="fas fa-times" style="color: red;"></i>`;

          } else {
            console.log(0); // Return 0 if the text does not contain any of the dictionary words
            var icon = document.createElement("i");
            icon.className = "fas fa-check";
            icon.style.color = "green";
            Used_common_word.insertBefore(icon, Used_common_word.firstChild);
            //Used_common_word.innerHTML += `<i class="fas fa-check" style="color: green;"></i>` ;

          }
        }

        function checkLengthTitile(input){
          const match = input
          if (1) {
            const extractedText = match[1];
            // Split the extracted text into words
            const words = extractedText.split(/\s+/);
            Name = tooltipContainer.querySelector('#Name');
            
      
            console.log(Name);
            if (words.length > 12) {  
              var iconElement = document.createElement("i");
              iconElement.className = "fas fa-times";
              iconElement.style.color = "red";
              Name.insertBefore(iconElement, Name.firstChild);

              //Name.innerHTML += `<i class="fas fa-times" style="color: red;"></i>`;
              console.log("The text inside curly braces contains more than 12 words.");
            } else {
              var iconElement = document.createElement("i");
              iconElement.className = "fas fa-check";
              iconElement.style.color = "green";
              Name.insertBefore(iconElement, Name.firstChild);
              //Name.innerHTML += `<i class="fas fa-times" style="color: red;"></i>`;
              console.log("The text inside curly braces does not contain more than 12 words.");
            }
          } else {
            console.log("No text inside curly braces found.");
          }
          
        }

        let abs1Fetched = false
        async function fetchAbstract1() {
          try {
            const baseUrl = 'http://localhost:3001/api/abstract1';
            //const baseUrl = 'https://mmlab.uit.edu.vn/check-paper/api/para';
            // Make the fetch request
            const result = await fetch(baseUrl);
            const resultJson = await result.json();
            abs1 = resultJson.output;
            return abs1;
          } catch (err) {
            console.log(err);
          }}

          let abs2Fetched = false
          async function fetchAbstract2() {
            try {
             const baseUrl = 'http://localhost:3001/api/abstract2';
              //const baseUrl = 'https://mmlab.uit.edu.vn/check-paper/api/abstract2';
              // Make the fetch request
              const result = await fetch(baseUrl);
              const resultJson = await result.json();
              abs2 = resultJson.output;
              return abs2;
            } catch (err) {
              console.log(err);
            }}

      
        
        // Introduction check :
        //1. check image superior
        // Introduction check :
        //1. check image superior
        function checkTeaser(input){
          const keyword_list = ["\figure", "\includegraphics","\begin{tabular}", "\caption", "\begin{center}"];
          let contains_keyword_list = false;
          keyword_list.forEach( keyword => {
            if(input.includes(keyword)) {
              contains_keyword_list = true;
            }
          });
          superior_image = tooltipContainer.querySelector('#Teaser');
          if (contains_keyword_list) {
            console.log(1); // Return 1 if the text contains any of the key_word_list 
            var icon = document.createElement("i");
            icon.className = "fas fa-check";
            icon.style.color = "green";
           superior_image.insertBefore(icon, superior_image.firstChild);
            
          } else {
            console.log(0); // Return 0 if the text does not contain any key_word_list
            var icon = document.createElement("i");
            icon.className = "fas fa-times";
            icon.style.color = "red";
            superior_image.insertBefore(icon, superior_image.firstChild);
            //superior_image.innerHTML+= `<i class="fas fa-times" style="color: red;"></i>` ;
          }
        }

        //6. Idea highly general
        function GeneralIdea(input){
          const dictionaryWords = ["combine", "using"];
          let containsDictionaryWord = false;
          dictionaryWords.forEach(word => {
            if (input.includes(word)) {
              containsDictionaryWord = true;
            }
          });
          Used_common_word = tooltipContainer.querySelector('#highly-general-idea');
          if (containsDictionaryWord) {
            console.log(1); // Return 1 if the text contains any of the dictionary words
            var icon = document.createElement("i");
            icon.className = "fas fa-times";
            icon.style.color = "red";
            Used_common_word.insertBefore(icon, Used_common_word.firstChild);
            //Used_common_word.innerHTML += `<i class="fas fa-times" style="color: red;"></i>`;
          } else {
            console.log(0); // Return 0 if the text does not contain any of the dictionary words
            var icon = document.createElement("i");
            icon.className = "fas fa-check";
            icon.style.color = "green";
           Used_common_word.insertBefore(icon, Used_common_word.firstChild);
           // Used_common_word.innerHTML+= `<i class="fas fa-check" style="color: green;"></i>`;

          }
        }
  
  // Proposed method check
      function checkProposedMethod(input){
        const generalScheme_list = ["\includegraphics", "\begin{figure}"];
        const clearlyCaption = ["\caption"];
        const clearlyEquation = ["\begin{equation}", "\[\]", "\math_cal"];
        let contains_general_scheme = false;
        let checkCaption = false;
        let checkEquation = false;
        generalScheme_list.forEach(word => {
          if (input.includes(word)) {
            contains_general_scheme = true;
          }
        });
        clearlyCaption.forEach(word => {
          if (input.includes(word)) {
            checkCaption = true;
          }
        });
        clearlyEquation.forEach(word => {
          if (input.includes(word)) {
            checkEquation = true;
          }
        });
        general_scheme = tooltipContainer.querySelector('#general-scheme');
        caption = tooltipContainer.querySelector('#caption');
        formula = tooltipContainer.querySelector('#formula');
        
        if (contains_general_scheme) {
          console.log(1); // Return 1 if the text contains any of the dictionary words
          var icon = document.createElement("i");
          icon.className = "fas fa-check";
          icon.style.color = "green";
          general_scheme.insertBefore(icon, general_scheme.firstChild);
          //general_scheme.innerHTML += `<i class="fas fa-check" style="color: green;"></i>`;
        } else {
          console.log(0); // Return 0 if the text does not contain any of the dictionary words
          var icon = document.createElement("i");
            icon.className = "fas fa-times";
            icon.style.color = "red";
            general_scheme.insertBefore(icon, general_scheme.firstChild);
          //generalScheme_list.innerHTML+= `<i class="fas fa-times" style="color: red;"></i>`;
        }
        if (checkCaption) {
          console.log(1); // Return 1 if the text contains any of the dictionary words
          var icon = document.createElement("i");
          icon.className = "fas fa-check";
            icon.style.color = "green";
           caption.insertBefore(icon, caption.firstChild);
          //caption.innerHTML += `<i class="fas fa-check" style="color: green;"></i>`;
        } else {
          console.log(0); // Return 0 if the text does not contain any of the dictionary words
          var icon = document.createElement("i");
          icon.className = "fas fa-times";
          icon.style.color = "red";
          caption.insertBefore(icon, caption.firstChild);
         // caption.innerHTML+= `<i class="fas fa-times" style="color: red;"></i>`;
        }
        if (checkEquation) {
          console.log(1); // Return 1 if the text contains any of the dictionary words
          var icon = document.createElement("i");
          icon.className = "fas fa-check";
            icon.style.color = "green";
           formula.insertBefore(icon, formula.firstChild);
          formula.innerHTML += `<i class="fas fa-check" style="color: green;"></i>`;
        } else {
          console.log(0); // Return 0 if the text does not contain any of the dictionary words
          var icon = document.createElement("i");
          icon.className = "fas fa-times";
          icon.style.color = "red";
          formula.insertBefore(icon, formula.firstChild);
          //formula.innerHTML+= `<i class="fas fa-times" style="color: red;"></i>`;
        }
      }
    // Check experiments :
    // 4 tieu chi cuoi
    function checkExperiment(input){
      const key_word_list = ["\begin{tabular}", "\begin {table}", "\begin{table*}", "\includegraphics","\begin{figure*}","\begin{figure}","\ablation study"];
      let keyword = false;
      key_word_list.forEach(word => {
        if (input.includes(word)) {
          keyword = true;
        }
      });
      general_properties = tooltipContainer.querySelector('#General-properties');
      

      if (keyword) {
        console.log(1); // Return 1 if the text contains any of the dictionary words
        var icon = document.createElement("i");
        icon.className = "fas fa-check";
          icon.style.color = "green";
         general_properties.insertBefore(icon, general_properties.firstChild);
       // general_properties.innerHTML += `<i class="fas fa-check" style="color: green;"></i>`;
      } else {
        console.log(0); // Return 0 if the text does not contain any of the dictionary words
          var icon = document.createElement("i");
          icon.className = "fas fa-times";
          icon.style.color = "red";
          general_properties.insertBefore(icon, general_properties.firstChild);
        //general_properties.innerHTML+= `<i class="fas fa-times" style="color: red;"></i>`;

      }
    }

    function checkYearPaper(input) {
      const currentYear = new Date().getFullYear();
      
      // Find all occurrences of 'year = <year>' pattern
      const yearPattern = /year\s*=\s*{(\d{4})}/g;
      
      const matches = input.match(yearPattern);
      console.log(matches)
      
      
      // Extract years and count occurrences greater than or equal to the specified year
      const count = matches
        .map(match => parseInt(match.match(/\d{4}/)))
        .filter(year => year >= currentYear-2 && year <= currentYear)
        .length;
      console.log(`Number of citations from ${currentYear} and later: ${count}`);
      showPaper=tooltipContainer.querySelector('#show-paper')
      if(count >= 3){
        console.log(1) // return 1 if has at least 3 paper 
        var icon = document.createElement("i");
        icon.className = "fas fa-check";
        icon.style.color = "green";
        showPaper.insertBefore(icon,showPaper.firstChild);
      }
      else {
        console.log(0); 
        var icon = document.createElement("i");
        icon.className = "fas fa-times";
        icon.style.color = "red";
        showPaper.insertBefore(icon, showPaper.firstChild);
      }
          }

          function checkFigureCaption(input) {
            const figureRegex = /\\begin{figure\*?}[\s\S]*?\\end{figure\*?}|\\begin{figure\*?}[\s\S]*?\\caption[\s\S]*?\\end{figure\*?}|\\begin{figure\*?}[\s\S]*?(?=\\end{figure\*?}|\\caption|$)/g;
          
            // Find all figure environments in the input
            const figureMatches = input.match(figureRegex);
            console.log(figureMatches);
            
            // Initialize a counter for figures with captions
            let figureCountWithCaption = 0;
            
            // Initialize a flag to track whether all figures have captions
            let allFiguresHaveCaption = true;
            
            // Check if any of the figure environments contain a \caption
            if (figureMatches) {
              for (const figureContent of figureMatches) {
                if (figureContent.includes('\caption')) {
                  allFiguresHaveCaption = true;
                  figureCountWithCaption++;
                } else {
                  allFiguresHaveCaption = false;
                  break;
                }
              }
            }
            if (allFiguresHaveCaption) {
              console.log(`There are ${figureCountWithCaption} figures, and all have captions.`);
            } else {
              console.log(`There are ${figureCountWithCaption} figures, and not all have captions.`);
            }
            showPaper=tooltipContainer.querySelector('#figureCaption')
            if(allFiguresHaveCaption){
             console.log(1) // 
             console.log(`There are ${figureCountWithCaption} figures, and all have captions.`); 
             var icon = document.createElement("i");
             icon.className = "fas fa-check";
             icon.style.color = "green";
             showPaper.insertBefore(icon,showPaper.firstChild);
            }
            else {
             console.log(0);
             var icon = document.createElement("i");
             icon.className = "fas fa-times";
             icon.style.color = "red";
             showPaper.insertBefore(icon, showPaper.firstChild);
            }
             }
          // check caption in proposed method
          function checkClearlyCaption(input){
            const figureRegex = /\\begin{figure\*?}[\s\S]*?\\end{figure\*?}|\\begin{figure\*?}[\s\S]*?\\caption[\s\S]*?\\end{figure\*?}|\\begin{figure\*?}[\s\S]*?(?=\\end{figure\*?}|\\caption|$)/g;
          
            // Find all figure environments in the input
            const figureMatches = input.match(figureRegex);
            console.log(figureMatches);
          
            // Initialize a counter for figures with captions
            let figureCountWithCaption = 0;
            
            // Initialize a flag to track whether all figures have captions
            let allFiguresHaveCaption = true;
            
            // Check if any of the figure environments contain a \caption
            if (figureMatches) {
              for (const figureContent of figureMatches) {
                if (figureContent.includes('\caption')) {
                  allFiguresHaveCaption = true;
                  figureCountWithCaption++;
                } else {
                  allFiguresHaveCaption = false;
                  break;
                }
              }
            }
            if (allFiguresHaveCaption) {
              console.log(`There are ${figureCountWithCaption} figures, and all have captions.`);
            } else {
              console.log(`There are ${figureCountWithCaption} figures, and not all have captions.`);
            }
            showPaper=tooltipContainer.querySelector('#clearly-caption')
            if(allFiguresHaveCaption){
             console.log(1) // 
             console.log(`There are ${figureCountWithCaption} figures, and all have captions.`); 
             var icon = document.createElement("i");
             icon.className = "fas fa-check";
             icon.style.color = "green";
             showPaper.insertBefore(icon,showPaper.firstChild);
            }
            else {
             console.log(0);
             var icon = document.createElement("i");
             icon.className = "fas fa-times";
             icon.style.color = "red";
             showPaper.insertBefore(icon, showPaper.firstChild);
            }
          
          }
        
        
        

        function handleOptionClick(event) {
          event.preventDefault();
          var selectedOption = event.target.getAttribute('data-section');
          var titleOutput = tooltipContainer.querySelector('#output-textarea')
          console.log(titleOutput);
          // tắt cái toggle down
          switch (selectedOption) {
              case 'Option 1':
                  outputContainer.innerHTML = 
                  `<p class = "title-output" id = "title-output" > 
                      <a id = "Used-common-word"></i> Don't use: combine, research, study</a>
                      <br>
                      <a id = "Name"></i> Titile name is less than 13 words</a>
                  </p>`

                  console.log(tooltipContainer.querySelector('#Used-common-word'));
                  containsDictionaryWord(input);
                  checkLengthTitile(input);
                  break;
              case 'Option 2':
                  outputContainer.innerHTML =  
                  `<p class = "abstract-output" id = "abstract-output" > 
                      <a id = "unsolved-prob" >  Show current unsolved problem </a>
                      <br>
                      <a id = "solution">   Solution for unsolved problem </a>
                      <br>              
                  </p>`;
                  if (!abs1Fetched) {
                    // Fetch the paraphrase if it hasn't been fetched before
                    fetchAbstract1()
                      .then(abs1 => {
                        // Update the output container with the paraphrase result
                          console.log(abs1);
                          solution = tooltipContainer.querySelector('#solution')
                          if(abs1 =='Yes')
                          {
                            var icon = document.createElement("i");
                            icon.className = "fas fa-check";
                            icon.style.color = "green";
                            solution.insertBefore(icon, solution.firstChild);
                    
                          }
                          else{
                            var icon = document.createElement("i");
                            icon.className = "fas fa-times";
                            icon.style.color = "red";
                            solution.insertBefore(icon, solution.firstChild);
                            
                          }
                        // Set the flag to true indicating that the paraphrase has been fetched
                        abs1Fetched = true;
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                  if (!abs2Fetched) {
                    // Fetch the paraphrase if it hasn't been fetched before
                    fetchAbstract2()
                      .then(abs2 => {
                        // Update the output container with the paraphrase result
                          console.log(abs2);
                          unsolved_prob = tooltipContainer.querySelector('#unsolved-prob')
                          if(abs2 =='Yes')
                          {
                            console.log(1); // Return 1 if the text contains any of the dictionary words
                            var icon = document.createElement("i");
                            icon.className = "fas fa-check";
                              icon.style.color = "green";
                             unsolved_prob.insertBefore(icon, unsolved_prob.firstChild); 
                            //unsolved_prob.innerHTML +=  `<i class="fas fa-check" style="color: green;"></i>`;
                          }
                          else{
                            console.log(0); // Return 0 if the text does not contain any of the dictionary words
                              var icon = document.createElement("i");
                              icon.className = "fas fa-times";
                              icon.style.color = "red";
                              unsolved_prob.insertBefore(icon, unsolved_prob.firstChild);
                            //unsolved_prob.innerHTML+= `<i class="fas fa-times" style="color: red;"></i>`;
                          }
                        // Set the flag to true indicating that the paraphrase has been fetched
                        abs2Fetched = true;
                      })
                      .catch(err => {
                        console.log(err);
                      });
                }


                  break;
                case 'Option 3':
                  outputContainer.innerHTML =
                  `<p class = "intro-output" id = "intro-output" > 
                  <a id = "Teaser" >  Has Teaser </a>
                  <br>
                  <a id = "highly-general-idea" > Solution for the problem is highly general (Don't use combine,using) </a>
                  <br>
                 <a id = "figureCaption" >All Figures have caption </a>
                  </p>`;
                console.log(tooltipContainer.querySelector('#superior-image'));
                checkTeaser(input);
                checkFigureCaption(input)
                GeneralIdea(input);
                  break;
              case 'Option 4':
                  outputContainer.innerHTML = 
                  `<p class = "Related-work" id = "Related-work" "> 
                  <a id = "show-paper">  Show at least 3 recent papers (2 years back) </a>
                  <br>
                  <a id = "pros-cons"  >  Show pros and cons for each method </a>
                </p>`;
                checkYearPaper(input);
                break;
                case 'Option 5':
                  outputContainer.innerHTML = 
                  `<p class = "proposed-output" id = "proposed-output"  "> 
                  <a id = "general-scheme"> General scheme </a>
                  <br>
                  <a id = "caption"  >   Caption describe the main components of General Scheme </a>
                  <br>              
                  <a id = "formula"> Explicit formula</a>
                  <br>
                  <a id = clearly-caption> Has caption </a>

               </p>`;
               checkProposedMethod(input);
               checkClearlyCaption(input);
              break;
              case 'Option 6':
                outputContainer.innerHTML = 
                `<p class = "Experiments" id = "Experiments" > 
                  <a id = "General-properties"> Quantitative Analysis and Visualizations</a>
                  <br>
              </p>`;
              checkExperiment(input);
                break;
              case 'Option 7':
                outputContainer.innerHTML =
                `<p class = "Conclusion" id = "Conclusion" > 
                <a id = "paper-contribution">  Show the contribution of this paper </a>
                <br>
                <a id = "future-work">  Show future work </a>
              </p>`;
                break;
              // Add cases for other options if needed
              default:
                  outputContainer.textContent = '';
          }

          // Hide the dropdown after selecting an option
          toggleDropdown();
        }

        var dropdownLinks = tooltipContainer.querySelectorAll('.dropdown-content a');
            dropdownLinks.forEach(function(link) {
            link.addEventListener('click', handleOptionClick);
        });
      
        // // drag mouse
        // let box = tooltipContainer.querySelector('.box');
        // //let boxBody = tooltipContainer.querySelector('.box-body');

        // function onDrag({movementX , movementY}){
        //     let getStyle = window.getComputedStyle(box);
        //     let leftValue = parseInt(getStyle.left);
        //     let topValue = parseInt(getStyle.top);

        //     box.style.left = `${leftValue + movementX}px`;
        //     box.style.top = `${topValue + movementY}px`;
        // }
        // box.addEventListener('mousedown', ()=> {
        //   box.style.cursor = 'all-scroll';
        //   box.addEventListener('mousemove', onDrag);
        // })

        // box.addEventListener('mouseup', ()=> {
        //   box.style.cursor = 'default';
        //   box.removeEventListener('mousemove', onDrag);
        // })

      })
      .catch(error => {
        console.error('Error loading HTML content:', error);
      });
  }
  
  
  
  


// function hideOnClickOutside(element) {
//     const outsideClickListener = event => {
//         if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
//           element.remove();
//           removeClickListener();
//         }
//     }

//     const removeClickListener = () => {
//         document.removeEventListener('click', outsideClickListener);
//     }

//     document.addEventListener('click', outsideClickListener);
// }
// const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );


bodyDOM.addEventListener("mouseup", () => {
    console.log("bấm bấm");
    showExtensionIcon();
});

bodyDOM.addEventListener("keyup", (event) => {
  
    if (event.shiftKey && event.key.includes("Arrow")) {
        showExtensionIcon();
    }
});

bodyDOM.addEventListener("keydown", (event) => {
  if (event.ctrlKey && (event.key === 'a' || event.key === 'A')) {
    event.preventDefault(); // Prevents the default Ctrl + A behavior (select all)
    console.log("Ctrl + A pressed");
    showExtensionIcon();
  }
});



let tooltipWrapper;
function showExtensionIcon() {
    const tooltipResult = document.querySelector('div#research-result-ext-uit')
    //if(tooltipResult) hideOnClickOutside(tooltipResult)
    //tooltipResult.remove();

    selectionText= getSelectedText();
    if(selectionText.length >0) {  
        const [selectionTextNode, selectionTextRange, selectedElement, getRange]= getRangeSelectionText();
        console.log("lần đầu:",selectionText);
        if(tooltipWrapper) tooltipWrapper.remove();
        renderTool(selectionTextRange, selectedElement, selectionText, getRange, selectionTextNode); // hiển thị icon extension cho user click
        tooltipWrapper = document.querySelector('div#research-ext-uit'); // Update the tooltipWrapper variable with the new tooltip
        setTimeout(() => {
            const tooltipWrapper = document.querySelector('div#research-ext-uit'); 

            if(tooltipWrapper) tooltipWrapper.remove();
        }, 3000)
    }
}
    
