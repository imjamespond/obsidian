```bash
echo "$( system_profiler SPDisplaysDataType )"
# 显卡
echo ${${${${(f)"$( system_profiler SPDisplaysDataType )"}[2]}%:}# }
# cpu 核数
echo ${${${(f)"$( system_profiler SPHardwareDataType )"}[6]}# Number Of CPUs: }
```