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
                //const baseUrl = 'https://mmlab.uit.edu.vn/check-paper/api/check';
                const baseUrl = 'http://localhost:3001/api/check';
                // // Construct the complete URL
                const url = `${baseUrl}?input=${encodeURIComponent(selectionText)}`;

                // // Make the fetch request
                const result = await fetch(url);
                  //
                  const resultJson = await result.json();
                  const correctedGrammar = resultJson.output.correctedGrammar;
                  const input = resultJson.output.input;

                  console.log(10, input);
                  console.log(11,correctedGrammar);
                  //remove loading 
                  const loading = document.querySelector('div#loading-ext-uit')
                  loading.remove();
                  renderResult(selectionTextRange, selectionText, correctedGrammar, input, selectedElement, getRange, selectionTextNode);
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
    

    function renderResult(selectionTextRange, selectionText, answer, input, selectedElement, getRange, selectionTextNode) {
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
          console.log(14, answer.replace(/\r?\n|\r/g, " ") === input);
          console.log(15, answer.replace(/\r?\n|\r/g, " "));
          console.log(16, input);
          if (answer.replace(/\r?\n|\r/g, " ") === input.replace(/\r?\n|\r/g, " ")) {
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
            outputContainer.textContent = grammar;
    
            // Enable/disable buttons based on conditions
            updateButtonState();
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
          let isCopiedGrammar = false;
          let isCopiedPara = false;

          // Add event listener to the "Approve" button
          approveButton.addEventListener('click', () => {
            const isSuggestionTabActive = suggestionTab.classList.contains('active-tab');
            const outputContent = isSuggestionTabActive ? answer : parap;
            
            
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
            navigator.clipboard.writeText(text)
              .then(() => {
                console.log('Text copied to clipboard');
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
              Used_common_word.innerHTML = `<i class="fas fa-times" style="color: red;"></i>` + Used_common_word;

            } else {
              console.log(0); // Return 0 if the text does not contain any of the dictionary words
              Used_common_word.innerHTML= `<i class="fas fa-check" style="color: green;"></i>` + Used_common_word;

            }
          }

          function checkLengthTitile(input){
            const match = input.match(/\{([^}]+)\}/);
            if (match) {
              const extractedText = match[1];
              // Split the extracted text into words
              const words = extractedText.split(/\s+/);
              Name = tooltipContainer.querySelector('#Name');
              console.log(Name);
              if (words.length > 12) {  
                Name.innerHTML += `<i class="fas fa-times" style="color: red;"></i>`;
                console.log("The text inside curly braces contains more than 12 words.");
              } else {
                Name.innerHTML += `<i class="fas fa-times" style="color: red;"></i>`;
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
              superior_image.innerHTML += `<i class="fas fa-check" style="color: green;"></i>`;
            } else {
              console.log(0); // Return 0 if the text does not contain any key_word_list
              superior_image.innerHTML+= `<i class="fas fa-times" style="color: red;"></i>` ;
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
              Used_common_word.innerHTML += `<i class="fas fa-times" style="color: red;"></i>`;
            } else {
              console.log(0); // Return 0 if the text does not contain any of the dictionary words
              Used_common_word.innerHTML+= `<i class="fas fa-check" style="color: green;"></i>`;

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
            general_scheme.innerHTML += `<i class="fas fa-check" style="color: green;"></i>`;
          } else {
            console.log(0); // Return 0 if the text does not contain any of the dictionary words
            generalScheme_list.innerHTML+= `<i class="fas fa-times" style="color: red;"></i>`;
          }
          if (checkCaption) {
            console.log(1); // Return 1 if the text contains any of the dictionary words
            caption.innerHTML += `<i class="fas fa-check" style="color: green;"></i>`;
          } else {
            console.log(0); // Return 0 if the text does not contain any of the dictionary words
            caption.innerHTML+= `<i class="fas fa-times" style="color: red;"></i>`;
          }
          if (checkEquation) {
            console.log(1); // Return 1 if the text contains any of the dictionary words
            formula.innerHTML += `<i class="fas fa-check" style="color: green;"></i>`;
          } else {
            console.log(0); // Return 0 if the text does not contain any of the dictionary words
            formula.innerHTML+= `<i class="fas fa-times" style="color: red;"></i>`;
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
          general_properties.innerHTML += `<i class="fas fa-check" style="color: green;"></i>`;
        } else {
          console.log(0); // Return 0 if the text does not contain any of the dictionary words
          general_properties.innerHTML+= `<i class="fas fa-times" style="color: red;"></i>`;

        }
      }
          
          
          

          function handleOptionClick(event) {
            event.preventDefault();
            var selectedOption = event.target.getAttribute('data-section');
            var titleOutput = tooltipContainer.querySelector('#output-textarea')
            console.log(titleOutput);
            switch (selectedOption) {
                case 'Option 1':
                    outputContainer.innerHTML = 
                    `<p class = "title-output" id = "title-output" > 
                        <a id = "Used-common-word"> <i class = "fas fa-circle"> </i> Don't use : combine,research,study </a>
                        <br>
                        <a id = "Name"> <i class = "fas fa-circle"> </i> Titile name is less than 13 words</a>
                    </p>`

                    console.log(tooltipContainer.querySelector('#Used-common-word'));
                    containsDictionaryWord(input);
                    checkLengthTitile(input);
                    break;
                case 'Option 2':
                    outputContainer.innerHTML =  
                    `<p class = "abstract-output" id = "abstract-output" > 
                        <a id = "unsolved-prob" > <i class = "fas fa-circle"> </i> Show current unsolved problem </a>
                        <br>
                        <a id = "solution"> <i class = "fas fa-circle"> </i> Solution for unsolved problem </a>
                        <br>              
                    </p>`;
                    if (!abs1Fetched) {
                      // Fetch the paraphrase if it hasn't been fetched before
                      fetchAbstract1()
                        .then(abs1 => {
                          // Update the output container with the paraphrase result
                            console.log(abs1);
                            unsolved_prob = tooltipContainer.querySelector('#unsolved-prob')
                            if(abs1 =='Yes')
                            {

                              unsolved_prob.innerHTML +=  `<i class="fas fa-check" style="color: green;"></i>`;
                            }
                            else{
                              unsolved_prob.innerHTML+= `<i class="fas fa-times" style="color: red;"></i>`;
                            }
                          // Set the flag to true indicating that the paraphrase has been fetched
                          abs1Fetched = true;
                        })
                        .catch(err => {
                          console.log(err);
                        });
                  }
                    break;
                  case 'Option 3':
                    outputContainer.innerHTML =
                    `<p class = "intro-output" id = "intro-output" > 
                    <a id = "Teaser" > <i class = "fas fa-circle"> </i> Has Teaser </a>
                    <br>
                    <a id = "highly-general-idea" > <i class = "fas fa-circle"> </i> Solution for the problem is highly general (Don't use combine,using) </a>
                    <br>
                    </p>`;
                  console.log(tooltipContainer.querySelector('#superior-image'));
                  checkTeaser(input);
                  
                  GeneralIdea(input);
                    break;
                case 'Option 4':
                    outputContainer.innerHTML = 
                    `<p class = "Related-work" id = "Related-work" "> 
                    <a id = "show-paper"> <i class = "fas fa-circle"> </i> Show at least 3 recent papers (2 years back) </a>
                    <br>
                    <a id = "pros-cons"  > <i class = "fas fa-circle"> </i> Show pros and cons for each method </a>
                  </p>`;
                  break;
                  case 'Option 5':
                    outputContainer.innerHTML = 
                    `<p class = "proposed-output" id = "proposed-output"  "> 
                    <a id = "general-scheme"> <i class = "fas fa-circle"> </i> General scheme </a>
                    <br>
                    <a id = "caption"  > <i class = "fas fa-circle"> </i> Caption describe the main components of General Scheme </a>
                    <br>              
                    <a id = "formula"> <i class = "fas fa-circle"> </i> Explicit formula</a>
                  </p>`;
                  checkProposedMethod(input);
                  break;
                case 'Option 6':
                  outputContainer.innerHTML = 
                  `<p class = "Experiments" id = "Experiments" > 
                  <a id = "Empirical-dataset"> <i class = "fas fa-circle"> </i> Describe empirical dataset: name,quantity,data properties </a>
                    <br>
                    <a id = "Empirical-protocol"  > <i class = "fas fa-circle"> </i>Describe empirical protocol: train/val/test, metrics  </a>
                    <br>              
                    <a id = "Hyperparameter"> <i class = "fas fa-circle"> </i>Describe hyperparameter : learning rate, train:valid, K fold, epoch, lambda</a>
                    <br>
                    <a id = "General-properties"> <i class = "fas fa-circle"> </i>Quantitative Analysis and Visualizations</a>
                    <br>
                </p>`;
                checkExperiment(input);
                  break;
                case 'Option 7':
                  outputContainer.innerHTML =
                  `<p class = "Conclusion" id = "Conclusion" > 
                  <a id = "paper-contribution"> <i class = "fas fa-circle"> </i> Show the contribution of this paper </a>
                  <br>
                  <a id = "future-work"  > <i class = "fas fa-circle"> </i> Show future work </a>
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
      //if(tooltipResult) hideOnClickOutside(tooltipResult)
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
      



