### Shopping Cart

> 使用`dva`框架的一个购物车练习
>
> 前端： `React` + `dvaJS`状态管理      后端：`node`



#### 项目运行：

+ `git clone`

+ 安装依赖

  `yarn`   

+ 项目使用`concurrently`同时启动前后端，所以只需：

  `yarn run dev `

+ 也可以分别执行：

  `yarn run start`

  `yarn run server`

+ 在`localhost:8000`下本地访问

### 特别注意
state 中使用浅拷贝的BUG
src\models\products.js
原来的
```
    addToCart(state, { payload: { data } }) {
      //...
      window.localStorage.setItem(STORAGE_NAME, JSON.stringify(cart));
      return { ...state, cart, counts: state.counts + 1 };
    },
```
更改后
```
    addToCart(state, { payload: { data } }) {
      //...
      window.localStorage.setItem(STORAGE_NAME, JSON.stringify(cart));
      return { ...state, cart:JSON.parse(JSON.stringify(cart)), counts: state.counts + 1 };
    },
```
