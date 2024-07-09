https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream/getReader#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <script>
      window.onload = function () {
        fetch("/test")
          .then(function (resp) {
            const content = document.querySelector("#content");
            const reader = resp.body.getReader();
            let str = "";
            return pump();
            function pump() {
              return reader.read().then((state) => {
                const { done, value } = state;
                if (done) {
                  console.log("done");
                  return;
                }
                const tmp = new TextDecoder().decode(state.value);
                content.innerHTML = str = str.concat(tmp);
                console.log(tmp, state.value);
                return pump();
              });
            }
          })
          // .then(function (resp) {
          //   return resp.text();
          // })
          // .then(function (text) {
          //   document.body.innerHTML = text;
          // })
          .finally(function () {
            console.log("finally");
          });
      };
    </script>
    <style type="text/css">
      .caret {
        animation: blinker 1s linear infinite;
        font-weight: bold;
      }
      @keyframes blinker {
        10% {
          opacity: 0;
        }
        60% {
          opacity: 0;
        }
      }
    </style>
  </head>
  <body>
    <div>
      <span id="content"></span>
      <span class="caret">|</span>
    </div>
  </body>
</html>

```

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

type fileHandler struct {
	root http.FileSystem
	h    http.Handler
}

func fileServer(root http.FileSystem, h http.Handler) http.Handler {
	return &fileHandler{root, h}
}

func (f *fileHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path
	if _, err := os.Stat("public/" + path); os.IsNotExist(err) {
		http.ServeFile(w, r, "public/404.html")
		return
	}
	f.h.ServeHTTP(w, r)
}

const str = "这是net/http创建的server第一种方式"

func main() {
	// Simple static webserver:
	port := ":8080"
	log.Printf("Serving at: http://localhost%s\n", port)
	fs := http.Dir("public")
	http.Handle("/", fileServer(&fs, http.FileServer(&fs)))
	http.Handle("/test", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if strings.Index(r.URL.String(), "test") > 0 {
			for _, char := range str {
				fmt.Fprintf(w, "%c", char)
				if f, ok := w.(http.Flusher); ok {
					f.Flush()
				} else {
					log.Println("Damn, no flush")
				}
				time.Sleep(time.Millisecond * 500)
			}
		}
	}))

	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal("ListenAndServe fail:", err)
	}
}

```