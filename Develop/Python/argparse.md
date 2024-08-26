```python
# 解析命令行参数
parser = argparse.ArgumentParser(description='MySQL packet sniffer')
parser.add_argument('-p', '--port', type=int, help='MySQL server port', required=True)
parser.add_argument('-t', '--tables', nargs='+', help='Table names to capture')
parser.add_argument('-l', '--log', type=str, default='mysql_packet.sql', help='Log file path')
parser.add_argument('-c', '--console', action='store_true', help='Print log to console')
parser.add_argument('-r', '--runtime', type=int, help='Runtime of packet sniffing in seconds')
parser.add_argument('-v', '--version', action='version', version='mysql_sniffer工具版本号: 1.0.4，更新日期：2023-10-28')
args = parser.parse_args()
port = args.port
table_names = args.tables
log_file = args.log
```