https://stackoverflow.com/questions/15806152/how-do-i-override-nested-npm-dependency-versions

**As of npm cli [v8.3.0](https://github.com/npm/cli/releases/tag/v8.3.0) (2021-12-09) this can be solved using the [`overrides` field](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides) of package.json**. _As described in [StriplingWarrior's answer](https://stackoverflow.com/a/70396201/1139105)_

For example, the project has `typescript` version `4.6.2` as _direct_ development dependency and `awesome-typescript-loader` that uses old version `2.7` of `typescript`. Here is how you can tell `npm` to use version `4.6.2` of `typescript` for `awesome-typescript-loader`:

```json
{
  "name": "myproject",
  "version": "0.0.0",
  "scripts": ...
  "dependencies": ...
  "devDependencies": {
    "typescript": "~4.6.2",
    "awesome-typescript-loader": "^5.2.1",
    ...
  },
  "overrides": {
    "awesome-typescript-loader": {
      "typescript": "$typescript"
    }
  }
}
```

If you don't use `typescript` as _direct_ development dependency, then you have to write `4.6.2` instead of `$typescript` in `overrides` section:

```json
{
  "name": "myproject",
  "version": "0.0.0",
  "scripts": ...
  "dependencies": ...
  "devDependencies": {
    "awesome-typescript-loader": "^5.2.1",
    ...
  },
  "overrides": {
    "awesome-typescript-loader": {
      "typescript": "~4.6.2"
    }
  }
}
```

For using the latest version of dependency:

```json
{
  "name": "myproject",
  "version": "0.0.0",
  "scripts": ...
  "dependencies": ...
  "devDependencies": {
    "awesome-typescript-loader": "^5.2.1",
    ...
  },
  "overrides": {
    "awesome-typescript-loader": {
      "typescript": "latest"
    }
  }
}
```

Same `overrides` can be used for both `dependencies` and `devDependencies`.

---

If you're using npm version >5 but <8.3.0: edit your `package-lock.json`: remove the library from `"requires"` section and add it under "dependencies".

For example, you want `deglob` package to use `glob` package version `3.2.11` instead of its current one. You open `package-lock.json` and see:

```json
"deglob": {
  "version": "2.1.0",
  "resolved": "https://registry.npmjs.org/deglob/-/deglob-2.1.0.tgz",
  "integrity": "sha1-TUSr4W7zLHebSXK9FBqAMlApoUo=",
  "requires": {
    "find-root": "1.1.0",
    "glob": "7.1.2",
    "ignore": "3.3.5",
    "pkg-config": "1.1.1",
    "run-parallel": "1.1.6",
    "uniq": "1.0.1"
  }
},
```

Remove `"glob": "7.1.2",` from `"requires"`, add `"dependencies"` with proper version:

```json
"deglob": {
  "version": "2.1.0",
  "resolved": "https://registry.npmjs.org/deglob/-/deglob-2.1.0.tgz",
  "integrity": "sha1-TUSr4W7zLHebSXK9FBqAMlApoUo=",
  "requires": {
    "find-root": "1.1.0",
    "ignore": "3.3.5",
    "pkg-config": "1.1.1",
    "run-parallel": "1.1.6",
    "uniq": "1.0.1"
  },
  "dependencies": {
    "glob": {
      "version": "3.2.11"
    }
  }
},
```

Now remove your `node_modules` folder, run `npm ci` (or `npm install` for old version of node/npm) and it will add missing parts to the `"dependencies"` section.