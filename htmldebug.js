;(function() {

  // global variables
  var css, html, oldLog, loadQueue = "", elemConsole;

  // CSS code for styles
  css =
    `<style>
      .htmldebug {
        box-sizing: border-box;
        margin: 0;
        background-color: white;
        outline: none;
        border: none;
      }
      #htmldebug-window {
        height: 300px;
        width: 300px;
        border: 1px solid black;
        position: fixed;
        top: 25px;
        right: 25px;
      }
      #htmldebug-console {
        height: calc(100% - 30px);
        width: 100%;
        display: block;
        resize: none;
        line-height: 1;
      }
      button.htmldebug {
        height: 30px;
        width: 50%;
        float: left;
        cursor: pointer;
        background-color: #ccccff;
        border-top: 1px solid black;
      }
      #htmldebug-copy {
        border-left: 1px solid black;
      }
    </style>`;

  // html code
  html =
    `<div id="htmldebug-window" class="htmldebug">
      <textarea id="htmldebug-console" class="htmldebug" readonly>$  htmldebug loaded...</textarea>
      <button id="htmldebug-clear" class="htmldebug">Clear</button>
      <button id="htmldebug-copy" class="htmldebug">Copy</button>
    </div>`;

  // hack the console.log() function
  oldLog = console.log;
  console.log = function(msg) {
    oldLog.apply(console, [msg]);
    msg = "\n\n>  " + msg + (typeof msg=="object"?" "+JSON.stringify(msg):"");
    if(!elemConsole)
      loadQueue += msg;
    else
      elemConsole.value += msg;
  };
  
  // create console.log() alias hd()
  hd = console.log;

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
      elemConsole.value = oldValue.replace(/\n\n/g, "\n").replace(/[$>]  /g, "");
      elemConsole.select();
      document.execCommand("copy");
      elemConsole.value = oldValue + "\n\n$  htmldebug console copied";
    });
  };
})();
