https://medium.com/@spe_/debugging-c-c-programs-remotely-using-visual-studio-code-and-gdbserver-559d3434fb78
https://www.thegeekstuff.com/2014/04/gdbserver-example/
http://tomszilagyi.github.io/2018/03/Remote-gdb-with-stl-pp
1, 远程
```
yum install gdb-gdbserver
sudo apt-get install gdbserver
```
路径不相同, 只能适用于本地调试
gdbserver localhost:2000 ./build/network/tests/epoll_test
vscode with 
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug",
      "type": "gdb",
      // "request": "launch",
      // "target": "./bin/executable",
      "cwd": "${workspaceRoot}",
      "valuesFormatting": "parseText",
      "request": "attach",
      "name": "Attach to gdbserver",
      "executable": "./build/network/tests/epoll_test",
      "target": "yy:2000",
      "remote": true,
      "gdbpath": "/usr/local/bin/gdb"
    }
  ]
}

{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug",
      "type": "gdb",
      "request": "launch",
      // "target": "./bin/executable",
      "cwd": "${workspaceRoot}",
      // "valuesFormatting": "parseText",
      // "request": "attach",
      // "executable": "./build/network/tests/epoll_test",
      "target": "/home/test/codechiev/build/network/tests/epoll_test",
      "ssh": {
        "forwardX11": false,
        "host": "yy",
        "cwd": "/home/test/codechiev",
        // "keyfile": "/path/to/.ssh/key", // OR
        "password": "1212",
        "user": "test",
        "useAgent": false,
        // Optional, content will be executed on the SSH host before the debugger call.
        //"bootstrap": "source /home/remoteUser/some-env"
      }
    }
  ]
}
```


