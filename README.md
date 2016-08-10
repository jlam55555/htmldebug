# htmldebug
An HTML element serving as a simple console.

![Screenshot of htmldebug window](http://i.imgur.com/g6DBSrH.png)

### Usage

```
<script src="htmldebug.js"></script>
```

Just include the script file (before your other scripts)! This will inject the HTML, and all `console.log()` calls and error messages will also be sent to the dialog box. You can now also use the shorter alias `hd()` as a shorter version of `console.log()`:

```
console.log("These two functions are identical.");
hd("These two functions are identical.");
```

Output:
> &gt;&nbsp;&nbsp;These two functions are identical.
>
> &gt;&nbsp;&nbsp;These two functions are identical.

Multiple values can be sent to `console.log()`, and these will be printed on consecutive lines:

```
hd("hello", "world!");
```

Output:
> &gt;&nbsp;&nbsp;hello
&gt;&nbsp;&nbsp;world!


### Buttons
- "Clear"
    Use this to clear the console.

- "Copy"
    Use this to copy the console to clipboard. Note that the prompts and extra newlines will be omitted. It will simply be raw output (but still with the htmldebug prompts).

### Console
Anything inputted to the `JS >` prompt will be run with JavaScript. You can run any normal JavaScript on your site. This only supports single-line statements, however.

You can press <kbd>Shift</kbd>+<kbd>C</kbd> as a shortcut to focus on the console line, and <kbd>Esc</kbd> will exit it.

### Tutorial
Open `tutorial.html` in your browser to see a usage example.

### Inspiration
On slow computers, opening the Developer Tools dialog box is often slow and cumbersome. I decided to write a very light, HTML and VanillaJS-based application to view the console output from the screen.

### Disclaimer
This is not to be used with production software. Using this on production software can open up many security flaws. Use only with local development, and make sure to remove any debugging `hd()` function calls before releasing.
