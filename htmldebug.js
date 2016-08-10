;(function() {

  // global variables
  var css, html, oldLog, loadQueue = "", elemConsole;

  // CSS code for styles
  css =
    `<style>
      .htmldebug {
        box-sizing: border-box;
        margin: 0;
        outline: none;
        border: none;
        font-family: courier new;
        font-size: 12px;
      }
      #htmldebug-window {
        height: 300px;
        width: 300px;
        border: 1px solid black;
        position: fixed;
        top: 25px;
        right: 25px;
        z-index: 1000000000000;
        border-radius: 5px;
      }
      #htmldebug-console {
        height: calc(100% - 60px);
        width: 100%;
        display: block;
        resize: none;
        line-height: 1;
        font-weight: bold;
        background-color: #1d1f21;
        color: #c5c8c6;
        padding: 10px;
        overflow-y: hidden;
      }
      #htmldebug-console:hover {
        overflow-y: scroll;
      }
      #htmldebug-console::-webkit-scrollbar {
        width: 10px;
        padding-right: 5px;
      }
      #htmldebug-console::-webkit-scrollbar-track {
        background-color: transparent;
      }
      #htmldebug-console::-webkit-scrollbar-thumb {
        background-color: #373b41;
        border-radius: 10px;
      }
      #htmldebug-console::-webkit-scrollbar-thumb:active {
        background-color: #707880;
      }
      #htmldebug-prompt, #htmldebug-js {
        float: left;
        height: 30px;
        line-height: 30px;
        display: block;
        border-top: 1px solid black;
      }
      #htmldebug-prompt {
        width: 50px;
        padding: 0 10px;
      }
      #htmldebug-js {
        width: calc(100% - 50px);
      }
      button.htmldebug {
        height: 30px;
        width: 50%;
        float: left;
        cursor: pointer;
        color: #1d1f21;
        background-color: #c5c8c6;
        border-top: 1px solid black;
        font-weight: bold;
      }
      #htmldebug-clear {
        border-bottom-left-radius: 5px;
      }
      #htmldebug-copy {
        border-left: 1px solid black;
        border-bottom-right-radius: 5px;
      }
    </style>`;

  // html code
  html =
    `<div id="htmldebug-window" class="htmldebug">
      <textarea id="htmldebug-console" class="htmldebug" readonly>$  htmldebug loaded...</textarea>
      <span id="htmldebug-prompt" class="htmldebug">JS &gt; </span>
      <input id="htmldebug-js" class="htmldebug">
      <button id="htmldebug-clear" class="htmldebug">Clear</button>
      <button id="htmldebug-copy" class="htmldebug">Copy</button>
    </div>`;

  // hack the console.log() function
  oldLog = console.log;
  console.log = function(msg, err, csl) {
    oldLog.apply(console, [msg]);
    msg="\n\n"+(err?"!":csl?"=":">")+"  "+msg+(typeof msg=="object"?" "+JSON.stringify(msg):"");
    if(!elemConsole)
      loadQueue += msg;
    else {
      elemConsole.value += msg;
      elemConsole.scrollTop = elemConsole.scrollHeight;
    }
  };
  
  // create console.log() alias hd()
  hd = console.log;

  // error logs as well
  window.onerror = function(error, url, line) {
    if(line == 0)
      error = error.substring(0, error.length-1) + " in virtual console.";
    console.log("Error on line " + line + ": " + error, true);
  };

  // load into window onload
  window.onload = function() {

    // add CSS, HTML
    document.body.innerHTML += css + html;

    // set elemConsole
    elemConsole = document.getElementById("htmldebug-console");

    // if loaded console.log() before load, write them in
    if(loadQueue)
      elemConsole.value += loadQueue;

    // clear button functionality
    document.getElementById("htmldebug-clear").addEventListener("click", function() {
      elemConsole.value = "$  htmldebug console cleared";
    });

    // copy button functionality
    document.getElementById("htmldebug-copy").addEventListener("click", function() {
      var oldValue = elemConsole.value;
      elemConsole.value = oldValue.replace(/\n\n/g, "\n").replace(/[\$\>\!\=]  /g, "");
      elemConsole.select();
      document.execCommand("copy");
      elemConsole.value = oldValue + "\n\n$  htmldebug console copied";
      elemConsole.scrollTop = elemConsole.scrollHeight;
    });
    
    // input JS functionality
    document.getElementById("htmldebug-js").addEventListener("keyup", function(event) {
      if(event.which != 13)
        return;
      hd(eval(this.value), false, true);
      this.value = "";
    });
  };
})();
