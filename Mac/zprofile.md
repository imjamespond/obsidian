```bash
#alias cnpm="npm --registry=https://registry.npm.taobao.org \
#--cache=$HOME/.npm/.cache/cnpm \
#--disturl=https://npm.taobao.org/dist \
#--userconfig=$HOME/.cnpmrc"

alias nocheckssh='ssh  -o PreferredAuthentications=password -o PubkeyAuthentication=no -o "StrictHostKeyChecking=no"  -o "UserKnownHostsFile=/dev/null" '

alias gst="git_status_size"
git_status_size(){
    git status --porcelain -u | awk '{print $2}' | xargs ls -l | sort -r -h | awk '{print $5 "\t" $9}'
}

alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --host-resolver-rules=\"MAP * ~NOTFOUND , EXCLUDE 127.0.0.1, EXCLUDE *.163.com\""

PATH=$PATH:"/Applications/IntelliJ IDEA CE.app/Contents/plugins/maven/lib/maven3/bin"

export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk-11.0.13.jdk/Contents/Home"
# PATH=$PATH:$JAVA_HOME/bin

export GOPATH="$HOME/gopath"
PATH=$PATH:$GOPATH/bin
export GOROOT="/usr/local/go"
PATH=$PATH:$GOROOT/bin

# Setting PATH for Python 3.9
# The original version is saved in .zprofile.pysave
PATH="/Library/Frameworks/Python.framework/Versions/3.9/bin:${PATH}"
export PATH

alias virtualenv="/Users/james/Library/Python/3.8/bin/virtualenv"

# Setting PATH for Python 3.7
# The original version is saved in .zprofile.pysave
PATH="/Library/Frameworks/Python.framework/Versions/3.7/bin:${PATH}"
export PATH


# Setting PATH for Python 3.6
# The original version is saved in .zprofile.pysave
PATH="/Library/Frameworks/Python.framework/Versions/3.6/bin:${PATH}"
export PATH

PATH="${PATH}:$HOME/tools/protoc-3.19.0-osx-x86_64/bin"
PATH="${PATH}:/usr/local/sbin"

PATH="${PATH}:$HOME/tools/aria2-1.36.0"
export PATH
```