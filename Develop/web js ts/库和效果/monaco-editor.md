- diff
```ts
// init
if (!editorContainer.value) {
  return;
}

editor = monaco.editor.createDiffEditor(editorContainer.value, {
  originalEditable: true,
  minimap: {
    enabled: false,
  },
});

editor.setModel({
  original: monaco.editor.createModel('original text', 'txt'),
  modified: monaco.editor.createModel('modified text', 'txt'),
});

// theme
monaco.editor.defineTheme('it-tools-dark', {
  base: 'vs-dark',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#00000000',
  },
});

monaco.editor.defineTheme('it-tools-light', {
  base: 'vs',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#00000000',
  },
});
monaco.editor.setTheme(isDarkTheme ? 'it-tools-dark' : 'it-tools-light')

// resize
editor?.layout();
// update
editor?.updateOptions(options)
```