# 简介

通过 http 在服务器上调用加密后的命令返回执行结果

# 运行环境

- `Deno v1.8.2`

# 安装为 systemd 服务

```sh
# 软链接 deno 到全局变量文件里
ln -s $(which deno) /usr/local/bin/deno

# 创建工作目录
mkdir /usr/local/share/deno-http-call

# 下载程序文件到 /usr/local/share/deno-http-call/http-call.js
wget https://github.com/shynome/deno-http-call/releases/download/v0.0.3/http-call.js /usr/local/share/deno-http-call/http-call.js

# 下载 deno-http-call.service 文件到 /lib/systemd/system/deno-http-call.service, 你可以根据需要修改该文件
wget https://raw.githubusercontent.com/shynome/deno-http-call/main/systemd/deno-http-call.service /lib/systemd/system/deno-http-call.service

# 完成
systemctl start deno-http-call
```

# 使用

下载 <https://github.com/shynome/deno-http-call/releases> 中的 `http-call.js` 文件

```sh
# 加密命令, 会输出一串base64如: PXMzLLY0TT8pT52Oy2KKDt-77QP4F2xHqtZq7faoFY8JtTVOhpn5dXasWC55Y0GaEtdXoYozDqtW0UjRdf3n7EPfKBwwlWIK45d40qArw0YK0x9LwhsADkmD9VO5Sws6
deno run -A http-call.js encode $PWD 'pwd'
# 启动服务
deno run -A http-call.js start
# 调用命令, 会返回对应命令的结果
curl http://127.0.0.1:8080/PXMzLLY0TT8pT52Oy2KKDt-77QP4F2xHqtZq7faoFY8JtTVOhpn5dXasWC55Y0GaEtdXoYozDqtW0UjRdf3n7EPfKBwwlWIK45d40qArw0YK0x9LwhsADkmD9VO5Sws6
```

# 高级使用

加密的 key 读取顺序是: 先读环境变量`CALL_KEY`, 没有再读`.call-key`文件, 再没有就自己生成一个随机 key 写入`.call-key`文件
