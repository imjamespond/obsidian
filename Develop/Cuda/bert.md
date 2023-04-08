https://github.com/google-research/bert
Before running this example you must download the GLUE data by running this script and unpack it to some directory $GLUE_DIR. Next, download the BERT-Base checkpoint and unzip it to some directory $BERT_BASE_DIR.

取微调数据 python _glue_data.py --data_dir glue_data --tasks all
训练和测试 python run_classifier.py \
--task_name=MRPC \
--do_train=false \
...
可以不训练

BERT-Base, Uncased:

一个CS服务
https://bert-as-service.readthedocs.io/en/latest/tutorial/fine-tune.html

科大
https://github.com/ymcui/Chinese-BERT-wwm
./venv/bin/bert-serving-start -model_dir=./chinese_roberta_wwm_large_ext_L-24_H-1024_A-16/

![[jd.md]]
![[chinese.py]]