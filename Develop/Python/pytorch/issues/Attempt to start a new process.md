### [Attempt to start a new process before the current process](https://stackoverflow.com/questions/18204782/runtimeerror-on-windows-trying-python-multiprocessing)

```python
RuntimeError: 
            Attempt to start a new process before the current process
            has finished its bootstrapping phase.
            This probably means that you are on Windows and you have
            forgotten to use the proper idiom in the main module:
                if __name__ == '__main__':
                    freeze_support()
                    ...
            The "freeze_support()" line can be omitted if the program
            is not going to be frozen to produce a Windows executable.
```

在程序开始加上
```python
if __name__ == '__main__':   
```