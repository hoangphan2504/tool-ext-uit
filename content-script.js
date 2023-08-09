<!DOCTYPE html>
<html>
  <head>
    <title>Source and Output Box</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    
    <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->
    <style>
      
        
      .box {
        position:fixed;
        width: 420px; 
        height: 350px;
        left: 40%;
        top:15%;
        margin-left: -400px; /* Half of the width to center */
        margin: 20px auto;
        padding: 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  
        background: rgb(6, 158, 145);

        flex-wrap: wrap;
        justify-content: space-between;
        border-radius: 5%;
        
      }
    
      
      .output {
        color : white;
        overflow: auto;
        font-family: cursive;
        box-sizing: border-box;
       width: calc(100% - 0px);
        font-size: 25px;
        margin-top: -30px;
      }
      
    .output h2 {
      /* Add display: flex to make the links expand */
      display: flex;
      /* Adjust the padding as needed */
      text-align: center;
      padding: 0 25px;
      /* ... Your existing styles ... */
    }
      .output h2 span{
        flex-grow: 2;
        font-size: 19px;
        color : white;
        padding: 2px;
      }
      .paraphrase {
        padding: 10px;
        color : white;
        overflow: auto;
        
        box-sizing: border-box;
       margin-left: 100px;
       
      font-size: 22px;
        margin-top: -37px;
      }
      
      .input-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
        text-decoration:chocolate;
        font-size: 100cm;       
      }
      
      
     
      .box-header { 
        /*background: rgb(2,0,36);
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(22,0,29,1) 35%, rgba(0,212,255,1) 100%);
        */
        color : white; 
        font-size: 17px;
        text-align: left;
      margin-top: 50px;
    
      }
      .output-container {
        text-decoration: chocolate;
      
  
        margin-top: -35px;
       
        overflow-x: hidden; 
      }
      .output-textarea {
        width: auto;/* Subtract the width of the navigation bar (100px) */
        height: 230px;
        box-sizing: border-box;
        padding:  2px;
        background-color: white; /* Set the background to white, completely opaque */
        font-size: 17px;
        margin-top: 40px;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        color: black; /* Set the text color to black for better contrast */
        border-radius: 9px;
        overflow-y: auto;
      }      
      .output-textarea::-webkit-scrollbar {
  width: 8px;
}

.output-textarea::-webkit-scrollbar-track {
  background: transparent;
}

.output-textarea::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 8px;
  border: 6px solid transparent;
 
}

#suggestion-tab,#section-tab,
#paraphrase-tab {
  cursor: pointer;
}


.output-textarea::-webkit-scrollbar-thumb:hover {
  background: #555;
}
      .approve-button {
        background-color: white; 
        padding: 2px 5px;
        font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        position:fixed;
        margin-left: 265px;
        width: 113px;
        margin-top :-27px ;
    }
    .copy-button {
      background-color: white;
    padding: 2px 5px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    position:absolute;
    margin-left: 162px;
    overflow-wrap: break-word;
    width: 100px;
    margin-top: -27px;

    }
    .copy-button i {
  margin-right: 5px;
}
.approve-button i {
  margin-right: 5px;
}
.close-button {
  position: absolute;
  top: 10px;
  right: -25px;
  cursor: pointer;
  color: black;
  font-size: 25px;
  transition: transform 0.2s ease-in-out;
    }

    .close-button:hover {
      transform: scale(1.2);
    }

    .output h2 .dropdown {
      position: relative;
      display: inline-block;  
      cursor: pointer;
    }
    .output h2.dropdown::-webkit-scrollbar-thumb:hover {
  background: #555;
}
 

    .output h2 .dropdown:hover .dropdown-content {
      display: block;
      color: white;
    }
    .output h2 .dropdown-content {
        display: none;
        position: absolute;
        transition: (-50,-50);
        border-radius: 5px;
        padding: 5px 5px;
        cursor: pointer;
        color: white;
        /* New CSS properties for vertical display */
        top: 12%;
        left: 260px;
        background: rgb(0,0,0);
        background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 0%, rgba(247,249,251,1) 5%, rgba(247,249,250,1) 81%, rgba(255,255,255,1) 97%, rgba(247,249,250,1) 100%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%);
        width:120px ;
        height: 100px;

      overflow-y: auto;
      }
      .output h2 .dropdown-content::-webkit-scrollbar {
  width: 6px;
}

.output h2 .dropdown-content::-webkit-scrollbar-track {
  background: transparent;
}

.output h2 .dropdown-content::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 5px;
  border: 5px solid transparent;
 
}

      .output h2 .dropdown-content a {
        display: block;
        color:black;
        font-family: cursive;
        font-weight: normal;
        text-decoration: none;
        font-size: 18px;
      }
    
.output h2 .dropdown-content :hover {
  background: rgb(0,0,0);
background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(39,243,198,0.9346113445378151) 2%, rgba(37,228,187,1) 8%, rgba(57,249,212,1) 20%, rgba(39,241,196,1) 100%, rgba(2,0,24,1) 100%);  width: 100px;
  width: 100%;
}
.fa-circle{
  font-size: 8px;
  color :black;

}
.abstract-output {
  font-size: 18px;
  margin-top: -3px;
  padding-top: 5px;
}
.proposed-ouput {
  font-size: 18px;
  margin-top: -3px;
  padding-top: 5px;
}
.abstract-output a {
  font-family: cursive;
  font-size: 18px;
}
.title-ouput {
  font-size: 18px;
  margin-top: -3px;
  padding-top: 5px;
}
.title-output a {
  font-family: cursive;
  font-size: 18px;

}
.proposed-output a {
  font-family: cursive;
  font-size: 18px;

}
.box-footer {
  margin-top: 15px;
}
.accept-button{
      background-color: white; 
       padding: 2px 5px;
       font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
       border: none;
       border-radius: 5px;
       cursor: pointer;
       font-size: 14px;
       position:fixed;
       margin-left: 265px;
       width: 113px;
       margin-top :-27px ;
}
.reject-button {
    background-color: white;
    padding: 2px 5px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    position:absolute;
    margin-left: 162px;
    overflow-wrap: break-word;
    width: 100px;
    margin-top: -27px;
}
  </style>
    
  </head>

  <body>
    <div class="box">
      <span class="close-button">
        <i class="fas fa-times"></i>
      </span>
      
    <div class="output">
        <h2> 
          <span id="suggestion-tab" class="active-tab"> Grammar  |   </span>
          <span id="paraphrase-tab" class="paraphrase-link">Paraphrase   |</span>
          <span id="section-tab" class="active-tab">Section <i class="fas fa-caret-down"></i>
            <div id="dropdown-content" class="dropdown-content" >
              <a href="#" data-section="Option 1">Title</a>
              <a href="#" data-section="Option 2">Abstract</a>
              <a href="#" data-section="Option 3">Introduction</a>
              <a href="#" data-section="Option 4">Related work</a>
              <a href="#" data-section="Option 5">Proposed method</a>
              <a href="#" data-section="Option 6">Experiments</a>
              <a href="#" data-section="Option 7">Conclusion</a>
            </div>
          </span>
        </h2>
      
        <div class="output-container">
            <div class="output-textarea" id ="output-textarea">
          </div>
        </div>
      </div> 

        <!-- <div><p id="output-textarea"></p></div> -->
       <div class = "box-footer">
        <span class = "box-header">PAPER PROOFING</span> 
        <button class="accept-button" id="accept-button" style="display: none" ">Accept</button>
        <button class="reject-button" id="reject-button" style="display: none"  ">Reject</button>
        <button class="copy-button" id="copy-button" style="display: none" "><i class="fas fa-copy" ></i>Copy</button>
        <button class="approve-button" id="approve-button" style ="display:none" "><i class="fa fa-check" aria-hidden="true" ></i>Approve</button>
      </div>
        <!-- <button class="copy-button" id="copy-button"><i class="fas fa-copy"></i>Copy</button>
        <button class="approve-button" id="approve-button"><i class="fa fa-check" aria-hidden="true"></i>Approve</button> -->

      </div>
    </div>
    </div>
  </body>
</html>
