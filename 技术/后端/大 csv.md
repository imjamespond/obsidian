大 csv 不要用 easyExcel 读，用 commons csv ，CSVParser 可以迭代器访问，不用全部载入内存  
  
边读边聚合，一次汇总完所有指标，同一个文件只读一次

