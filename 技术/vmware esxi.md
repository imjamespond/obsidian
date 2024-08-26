从导出的vmdk加载到硬盘vmdk文件,打开verbose可以知道完成时间
`vmkfstools -v 9 -i source.vmdk -d thin target.vmdk`

Issues:
新的Dell dhcp失败, 原因6.0太旧估计驱动太旧, 装6.7后正常