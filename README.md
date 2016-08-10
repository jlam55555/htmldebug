# htmldebug
An HTML element serving as a simple console.

### Usage

```
<script src="htmldebug.js"></script>
```

Just include the script file (before your other scripts)! This will inject the HTML, and all `console.log()` calls will also be sent to the dialog box. You can now also use the shorter alias `hd()` as a shorter version of `console.log()`:

```
console.log("These two functions are identical.");
hd("These two functions are identical.");
```

### Buttons
#### "Clear"
Use this to clear the console.

#### "Copy"
Use this to copy the console to clipboard. Note that extra `>  ` and `$  ` prompts will be omitted, as well as extra newlines. It will simply be raw output (but still with the htmldebug prompts).

### Inspiration
On slow computers, opening the Developer Tools dialog box is often slow and cumbersome. I decided to write a very light, HTML and VanillaJS-based application to view the console output from the screen.
