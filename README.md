### 因为本项目用的是mongodb 首先要确保已安装mongodb 如果你安装mongodb时没有设置密码 那么你可以直接npm install/ npm run dev  如果你有设置密码 请先到config目录的config_default.js 

```js
// 配置mongodb
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/shop',
      options: {}  // 配置密码等信息
    }
  }
```

### npm install

### npm run dev