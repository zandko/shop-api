# 设置基础镜像,如果本地没有该镜像，会从Docker.io服务器pull镜像
FROM node:alpine
MAINTAINER gaozan <push_over@163.com>
ENV TZ = Asia/Shanghai

# 创建app目录
RUN mkdir -p /shop_interface
 
# 设置工作目录
WORKDIR /shop_interface

# 拷贝package.json文件到工作目录
# !!重要：package.json需要单独添加。
# Docker在构建镜像的时候，是一层一层构建的，仅当这一层有变化时，重新构建对应的层。
# 如果package.json和源代码一起添加到镜像，则每次修改源码都需要重新安装npm模块，这样木有必要。
# 所以，正确的顺序是: 添加package.json；安装npm模块；添加源代码。
# COPY package.json /shop_interface/package.json

# 安装npm依赖(使用淘宝的镜像源)
# 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
RUN npm i --registry=https://registry.npm.taobao.org

RUN npm install pm2 -g

#指定时区
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 拷贝所有源代码到工作目录
COPY . /shop_interface

# 暴露容器端口
EXPOSE 7001

# 启动node应用
CMD [ "pm2-runtime", "npm", "--", "start" ]
# CMD npm start




# docker stop shop_interface || true \
#  && docker rm shop_interface || true \
#  && cd /home/jenkins_home/workspace/shop_interface  \
#  && docker build --rm --no-cache=true  -t shop_interface  - < Dockerfile \
#  && docker run -d --privileged=true --name shop_interface -p 7001:7001 -v /home/jenkins_home/workspace/shop_interface:/home/shop_interface

# docker stop shop_interface || true \
#  && docker rm shop_interface || true \
#  && cd /home/jenkins_home/workspace/shop_interface  \
#  && docker build --rm --no-cache=true  -t node:10.16.0-alpine  - < Dockerfile \
#  && docker run -d --privileged=true --name shop_interface -p 7001:7001 -v /home/jenkins_home/workspace/shop_interface:/home/shop_interface node:10.16.0-alpine
