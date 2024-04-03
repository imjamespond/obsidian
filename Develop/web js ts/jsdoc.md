# [How to document a dictionary in JSDoc?](https://stackoverflow.com/questions/19513955/how-to-document-a-dictionary-in-jsdoc)

According to the [JSDoc 3 docs](https://jsdoc.app/tags-type.html):

> Arrays and objects (type applications and record types)
> 
> An object with string keys and number values:
> 
> > `{Object.<string, number>}`

So it would be:

```javascript
/** @type {{locales: Object.<string, {name: string, lang: string}>}} */
var CONF = {
    locales: {
        en: {
            name: "English",
            lang: "en-US"
        },
        es: {
            name: "Spanish",
            lang: "es-ES"
        }
    }
};
```

## Cleaner, using `@typedef`

```javascript
/**
 * @typedef {{name: string, lang: string}} Locale
 */
/**
 * @type {{locales: Object.<string, Locale>}}
 */
var CONF = {
    locales: {
        en: {
            name: "English",
            lang: "en-US"
        },
        es: {
            name: "Spanish",
            lang: "es-ES"
        }
    }
};
```