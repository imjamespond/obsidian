std::borrow::Cow<'_, str>

> How do I get a `&str`

1. Use `Borrow`:
    
    ```rust
    use std::borrow::Borrow;
    alphabet.push_str(example.borrow());
    ```
    
2. Use `AsRef`:
    
    ```rust
    alphabet.push_str(example.as_ref());
    ```
    
3. Use `Deref` explicitly:
    
    ```rust
    use std::ops::Deref;
    alphabet.push_str(example.deref());
    ```
    
4. Use `Deref` implicitly through a coercion:
    
    ```rust
    alphabet.push_str(&example);
    ```
    

> How do I get a `String`

1. Use `ToString`:
    
    ```rust
    example.to_string();
    ```
    
2. Use `Cow::into_owned`:
    
    ```rust
    example.into_owned();
    ```
    
3. Use any method to get a reference and then call `to_owned`:
    
    ```rust
    example.as_ref().to_owned();
    ```> How do I get a `&str`

1. Use `Borrow`:
    
    ```rust
    use std::borrow::Borrow;
    alphabet.push_str(example.borrow());
    ```
    
2. Use `AsRef`:
    
    ```rust
    alphabet.push_str(example.as_ref());
    ```
    
3. Use `Deref` explicitly:
    
    ```rust
    use std::ops::Deref;
    alphabet.push_str(example.deref());
    ```
    
4. Use `Deref` implicitly through a coercion:
    
    ```rust
    alphabet.push_str(&example);
    ```
    

> How do I get a `String`

1. Use `ToString`:
    
    ```rust
    example.to_string();
    ```
    
2. Use `Cow::into_owned`:
    
    ```rust
    example.into_owned();
    ```
    
3. Use any method to get a reference and then call `to_owned`:
    
    ```rust
    example.as_ref().to_owned();
    ```