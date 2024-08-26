```bash
#!/usr/bin/env bash

# error "Message"
function msg() {
osascript <<EOT
    tell app "System Events"
      display dialog "$1" buttons {"OK"} default button 1 with icon caution with title "$(basename $0)"
      return -- Suppress result
    end tell
EOT
}

for ((i=0;i<$1;i++)); do
  sleep 1
  echo "$i seconds passed"
done

msg "Time's up!"

```