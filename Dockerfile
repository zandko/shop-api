FROM node:lts

# LABEL maintainer = "gaozan <push_over@163.com>"

# 创建app目录
RUN mkdir /app
 
# 设置工作目录
WORKDIR /app

# 拷贝package.json文件到工作目录
# !!重要：package.json需要单独添加。
# Docker在构建镜像的时候，是一层一层构建的，仅当这一层有变化时，重新构建对应的层。
# 如果package.json和源代码一起添加到镜像，则每次修改源码都需要重新安装npm模块，这样木有必要。
# 所以，正确的顺序是: 添加package.json；安装npm模块；添加源代码。
COPY package.json /app/package.json

# 安装npm依赖(使用淘宝的镜像源)
# 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
# RUN npm set registry https://registry.npm.taobao.org/
# RUN npm install --production && npm install egg-scripts --save
RUN npm install --registry=https://registry.npm.taobao.org && npm install egg-scripts --save


# 指定时区
# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 拷贝所有源代码到工作目录
COPY . /app

# 暴露容器端口
EXPOSE 8083