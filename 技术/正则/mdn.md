https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet#other_assertions

`x(?!y)`
**Negative lookahead assertion:** Matches "x" only if "x" is not followed by "y". For example, `/\d+(?!\.)/` matches a number ==only if it is not followed by a decimal point==. `/\d+(?!\.)/.exec('3.141')` matches =="141"== but not "3".
