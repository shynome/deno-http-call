# v0.0.5

- change: 子命令 `encode`, `decode` 改为意图更准确的 `crypt`, `decrypt`
- change: 可以通过环境变量 `PORT` 来设置端口了
- add: 启动时会输出版本号方便定位版本了

# v0.0.4

- add: 添加`exit-code`和`success`返回头
- change: 删除了 `proc.close()` 这个不知道是否有用的代码

# v0.0.3

- add: `start` 命令后面可以接一个端口参数了, 如: `start 8081`

# v0.0.2

- finish: 现在会将接收到的参数设置为环境变量了
