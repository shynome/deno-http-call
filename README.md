# 简介

通过 http 在服务器上调用加密后的命令返回执行结果

# 运行环境

- `Deno v1.8.2`

目前`deno`暂无 debian 的安装包, 需要手动安装`deno`放到 `/usr/bin/deno`  
下载地址: https://github.com/denoland/deno/releases  
如果你已安装`deno`但不是该路径, 则需要手动软连接到该路径 `ln -s $(which deno) /usr/bin/deno`, 因为 deb 安装包使用了该路径

# 使用

下载 <https://github.com/shynome/deno-http-call/releases> 中的 `http-call.js` 文件

```sh
# 加密命令, 会输出一串base64如: PXMzLLY0TT8pT52Oy2KKDt-77QP4F2xHqtZq7faoFY8JtTVOhpn5dXasWC55Y0GaEtdXoYozDqtW0UjRdf3n7EPfKBwwlWIK45d40qArw0YK0x9LwhsADkmD9VO5Sws6
deno run -A http-call.js crypt $PWD 'pwd'
# 启动服务
deno run -A http-call.js start
# 调用命令, 会返回对应命令的结果
curl http://127.0.0.1:8080/PXMzLLY0TT8pT52Oy2KKDt-77QP4F2xHqtZq7faoFY8JtTVOhpn5dXasWC55Y0GaEtdXoYozDqtW0UjRdf3n7EPfKBwwlWIK45d40qArw0YK0x9LwhsADkmD9VO5Sws6
# 解密加密命令
deno run -A http-call.js decrypt PXMzLLY0TT8pT52Oy2KKDt-77QP4F2xHqtZq7faoFY8JtTVOhpn5dXasWC55Y0GaEtdXoYozDqtW0UjRdf3n7EPfKBwwlWIK45d40qArw0YK0x9LwhsADkmD9VO5Sws6
```

# 安装 deb

下载 <https://github.com/shynome/deno-http-call/releases> 中的 deb 后缀安装包  
安装命令 `dpkg -i deno-http-call*.deb`, 数据放在`/etc/deno-http-call`目录下

# 高级使用

加密的 key 读取顺序是: 先读环境变量`CALL_KEY`, 没有再读`.call-key`文件, 再没有就自己生成一个随机 key 写入`.call-key`文件

可以通过 `systemctl edit deno-http-call` 通过设置环境变量 `PORT` 使用不同的端口提供服务

```conf
[Service]
Environment="PORT=60001"
```

# 构建

```sh
# 生成 http-call.js
make bundle
# 生成 deb 安装包
make deb
```
