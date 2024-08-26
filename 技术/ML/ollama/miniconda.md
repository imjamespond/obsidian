- uninstall
https://zhuanlan.zhihu.com/p/619566718 
```bash
cat  ~/.zshrc
cat ~/.conda/environments.txt
/opt/miniconda3

conda create -n llama_factory python=3.12
conda activate llama_factory
pip install -e '.[torch,metrics]'
```