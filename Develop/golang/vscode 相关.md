#gopls #dlv #go/debug
### gopls
gopls装在gopath/bin中， `export PATH=$PATH:$GOROOT/bin:$GOPATH/bin`

https://pkg.go.dev/golang.org/x/tools/gopls#section-readme
#### Installation

For the most part, you should not need to install or update `gopls`. Your editor should handle that step for you.

If you do want to get the latest stable version of `gopls`, run the following command:

```bash
go install golang.org/x/tools/gopls@latest
```

Learn more in the [advanced installation instructions](https://cs.opensource.google/go/x/tools/+/gopls/v0.14.2:gopls/doc/advanced.md).

Learn more about gopls releases in the [release policy](https://cs.opensource.google/go/x/tools/+/gopls/v0.14.2:gopls/doc/releases.md).

### dlv
```bash
go install -v github.com/go-delve/delve/cmd/dlv@latest
```

```bash
go install -v golang.org/x/tools/gopls@latest
go install -v github.com/cweill/gotests/gotests@v1.6.0
go install -v github.com/fatih/gomodifytags@v1.16.0
go install -v github.com/josharian/impl@v1.1.0
go install -v github.com/haya14busa/goplay/cmd/goplay@v1.0.0
go install -v github.com/go-delve/delve/cmd/dlv@latest
go install -v honnef.co/go/tools/cmd/staticcheck@latest
```
