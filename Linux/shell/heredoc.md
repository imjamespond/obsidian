https://unix.stackexchange.com/questions/138418/passing-a-variable-to-a-bash-script-that-uses-eof-and-considers-the-variable-a
```bash
cat > /test <<'EOF'
some uninterpreted text $(pwd)
not substituted: $1
EOF
cat >> /test <<EOF
but this will substitute: $1
EOF
```
