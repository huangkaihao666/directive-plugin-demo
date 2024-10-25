## 前言

在 Vue.js 的世界里，开发者可以通过多种方式扩展框架的功能，以满足不同的业务需求。其中，自定义指令和插件是两种常用的扩展机制。自定义指令主要用于对 DOM 元素进行底层操作，而插件则用于全局扩展 Vue 应用的功能。虽然它们都是为了增强 Vue 的能力，但它们的用途、实现方式和使用场景却有着显著的区别。本文将深入探讨这两种扩展机制的异同，并通过具体的示例帮助大家更好地理解它们。

接下来小编将依次讲解自定义指令和插件的相关内容，并且有一定的示例支撑

<p align=center><img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/13c5a96aa84c4aeeaeb1ed3bc9d03f8f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oC75piv552h5LiN5aSf:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjU3MTEzMTIzMTE1MDQ4MCJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1729966688&x-orig-sign=ZQAq0MrefucHAQFuPelS%2Frgdkiw%3D" alt="u=3035496478,1685684969&fm=253&fmt=auto&app=138&f=JPEG.webp" width="30%" /></p>

## 自定义指令

自定义指令是 Vue.js 提供的一种扩展机制，用于对 DOM 元素进行底层操作。通过自定义指令，开发者可以在特定的 DOM 元素上绑定一些行为，如事件监听、样式修改、属性设置等。自定义指令的主要用途包括：

-   `操作 DOM 元素`：例如，自动聚焦输入框、图片懒加载等。
-   `处理特定交互行为`：例如，拖拽、滚动加载等。
-   `封装重复的 DOM 操作`：将一些常用的 DOM 操作封装成指令，提高代码复用性。

**实现示例：图片懒加载指令**

下面我们通过使用 Vue3 实现一个具体的示例——图片懒加载指令，来展示如何实现和使用自定义指令。

**定义自定义指令**

```js
// lazy-load.ts
import type { DirectiveBinding } from 'vue'

interface LazyLoadDirectiveElement extends HTMLElement {
  src?: string
  observer?: IntersectionObserver
}

export default {
  mounted(el: LazyLoadDirectiveElement, binding: DirectiveBinding) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.src = binding.value
          observer.unobserve(el)
        }
      })
    })
    observer.observe(el)

    // 保存 observer 实例以便在 beforeUnmount 中使用
    el.observer = observer
  },
  beforeUnmount(el: LazyLoadDirectiveElement) {
    if (el.observer) {
      el.observer.unobserve(el)
    }
  }
}
```

**注册自定义指令**

在 `main.ts` 中注册自定义指令：

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import lazyLoadDirective from '@/directive/lazy-load/lazy-load'

const app = createApp(App)
app.directive('lazy', lazyLoadDirective)
app.use(router)

app.mount('#app')

```

**在组件中使用自定义指令**

```js
// imgsLazyLoad.vue

<template>
  <div class="container">
    <div class="img-container">
      <img v-for="(item, index) in imgList" v-lazy="item" :key="index" alt="Lazy Loaded Image 1" class="img-container__lazy-image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const imgList = ref(['https://b0.bdstatic.com/54d1f56ae7abf755c25d8819779ba41f.jpg@h_1280','https://img1.baidu.com/it/u=2091873991,87441382&fm=253&fmt=auto?w=811&h=800','https://img1.baidu.com/it/u=267817771,216362047&fm=253&fmt=auto?w=800&h=800','https://img0.baidu.com/it/u=4154833386,1880487480&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1730048400&t=c95c955ce1a96959311034b6376caab6','https://img0.baidu.com/it/u=2814757327,4083075448&fm=253&fmt=auto?w=800&h=897','https://img0.baidu.com/it/u=3495663660,1321769646&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1730048400&t=f51dfcb5e2d6f261e32b28447745e553','https://img0.baidu.com/it/u=4080930903,315137735&fm=253&fmt=auto?w=800&h=800','https://img1.baidu.com/it/u=3147079541,1272457186&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800','https://img2.baidu.com/it/u=904237943,2358268709&fm=253&fmt=auto&app=138&f=JPEG?w=558&h=500','https://img2.baidu.com/it/u=2042191632,3844046845&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'])
</script>

<style lang="scss" scoped>
.img-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__lazy-image {
    width: 300px;
    height: 200px;
    margin-bottom: 20px;
    object-fit: cover;
  }
}
</style>

// HomeView.vue
<template>
  <div>
    <imgsLazyLoad />
  </div>
</template>


<script setup lang="ts">
import imgsLazyLoad from './imgsLazyLoad.vue'
</script>
```

**项目目录**

<p align=center><img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/4ca6ee58a66144efa055ffb988074c92~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oC75piv552h5LiN5aSf:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjU3MTEzMTIzMTE1MDQ4MCJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1729963321&x-orig-sign=QGd8e226HjlIxBDLoQfdR60djnQ%3D" alt="微信图片_20241026012118.png" width="90%" /></p>

**效果：一开始时只加载了可视区域内的5张，然后下滑发现后续进入可视区域的图片会被加载出来**

<p align=center><img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f0c561e3cca14abc96821e6b0792d99c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oC75piv552h5LiN5aSf:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjU3MTEzMTIzMTE1MDQ4MCJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1729963461&x-orig-sign=m6brH9jW6B8QMzbTEp8RL78hCow%3D" alt="微信图片_20241026012324.png" width="90%" /></p>


<p align=center><img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1dd4855226ee4442a2bb3ecd11db636d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oC75piv552h5LiN5aSf:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjU3MTEzMTIzMTE1MDQ4MCJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1729963479&x-orig-sign=7BjJNecD%2BCH7mwLSWyi9lv1ddOQ%3D" alt="微信图片_20241026012328.png" width="90%" /></p>

**生命周期钩子**

在自定义指令中，我们使用了 `mounted` 和 `beforeUnmount` 生命周期钩子。以下是这些钩子的详细说明：

1.  **`mounted`**：

    -   **作用**：在指令绑定到元素并且元素已插入到父节点时调用。
    -   **使用场景**：执行一些 DOM 操作，如事件监听、属性设置等。

1.  **`beforeUnmount`**：

    -   **作用**：在指令与元素解绑之前调用。
    -   **使用场景**：清理一些资源，如移除事件监听器。


**对于自定义指令的说明先到此为止，接下来是对于插件的介绍**

<p align=center><img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/157572a57f5a401eb34615180d414e22~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oC75piv552h5LiN5aSf:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjU3MTEzMTIzMTE1MDQ4MCJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1729963869&x-orig-sign=3gqKEPm8l1FMcZ5M2ot2%2FG3ASK4%3D" alt="src=http___c-ssl.duitang.com_uploads_item_201607_05_20160705001900_rmFaC.thumb.400_0.jpeg&refer=http___c-ssl.duitang.webp" width="30%" /></p>

## 插件

插件是 Vue.js 提供的一种扩展机制，用于全局扩展 Vue 应用的功能。插件可以注册全局组件、指令、过滤器，或者添加全局属性、方法等。插件的主要用途包括：

-   **添加全局方法或属性**：例如，添加一个全局的 `$alert` 方法，用于在应用的任何地方显示警告框。
-   **添加全局资源**：例如，注册全局组件、指令、过滤器等。
-   **通过全局混入（mixin）添加一些组件选项**：例如，在所有组件中添加一些通用的生命周期钩子或数据。
-   **添加 Vue 实例方法**：通过将其添加到 `Vue.prototype（对于 Vue 2.x）`，对于 Vue3 ,是添加到`app.config.globalProperties`, 使得在应用的任何地方都可以访问这些方法。

**实现示例：全局 `$alert` 方法**

下面我们通过一个具体的示例——全局 `$alert` 方法(实现一个全局的弹框组件)，来展示如何实现和使用插件。

**定义插件**

```js
// alert.ts
import { createVNode, render } from 'vue'
import type { VNode } from 'vue'
import AlertComponent from './AlertComponent.vue'

interface AlertOptions {
  title: string
  message: string
  confirmButtonText: string
}

const myAlert = function (options: AlertOptions) {
  const container = document.createElement('div')
  const vm: VNode = createVNode(AlertComponent, {
    // 传递 props
    ...options,
    onClose: () => {
      document.body.removeChild(container)
    }
  })
  render(vm, container)
  document.body.appendChild(container)
}

const alertPlugin = {
  install(app: any) {
    app.config.globalProperties.$alert = myAlert
  }
}

export default alertPlugin
```

**定义弹框组件的结构显示**

```js
// AlertComponent.vue

<template>
  <div class="alert-container">
    <div class="alert-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <button @click="closeAlert">{{ confirmButtonText }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  title: string
  message: string
  confirmButtonText: string
}>()

const emit = defineEmits(['close'])

const closeAlert = () => {
  emit('close')
}
</script>

<style scoped>
.alert-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
</style>
```

**注册插件**

在 `main.ts` 中注册插件：


```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import lazyLoadDirective from '@/directive/lazy-load/lazy-load'
import alertPlugin  from '@/plugin/alert'

const app = createApp(App)
app.directive('lazy', lazyLoadDirective)
app.use(router)
app.use(alertPlugin)

app.mount('#app')

```



**在组件中使用插件**


```js
// HomeView.vue

<template>
  <div>
    <button @click="showAlert">Show Alert</button>
  </div>
  <div>
    <imgsLazyLoad />
  </div>
</template>


<script setup lang="ts">
import imgsLazyLoad from './imgsLazyLoad.vue'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const showAlert = () => {
  if (instance && instance.appContext.config.globalProperties.$alert) {
    instance.appContext.config.globalProperties.$alert({
      title: '提示',
      message: '这是一个警告框',
      confirmButtonText: '确定'
    })
  }
}
</script>

```

**页面结构**

<p align=center><img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/eb3ebb286b80477199d753c080139d2a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oC75piv552h5LiN5aSf:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjU3MTEzMTIzMTE1MDQ4MCJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1729966018&x-orig-sign=P7Kh%2FHcuVLcJ9NZZDfQMZjGwnoc%3D" alt="微信图片_20241026020648.png" width="90%" /></p>

**效果展示：点击按钮触发该插件**

<p align=center><img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/72d21ee2b047420aa235c2b0b73c92e7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oC75piv552h5LiN5aSf:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjU3MTEzMTIzMTE1MDQ4MCJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1729966094&x-orig-sign=1Bvr5TIr60l56uBGzlcb7gdQWmg%3D" alt="微信图片_20241026020748.png" width="90%" /></p>

### 解释

1.  **`getCurrentInstance`**：

    -   `getCurrentInstance` 是 Vue 3 提供的一个函数，用于获取当前组件实例。
    -   通过 `getCurrentInstance`，我们可以访问当前组件的上下文，包括全局属性、方法等。

1.  **访问全局属性**：

    -   在 `setup` 函数中，我们通过 `getCurrentInstance` 获取当前组件实例 `instance`。
    -   然后，我们通过 `instance.appContext.config.globalProperties` 访问全局属性 `$alert`。

1.  **调用 `$alert` 方法**：

    -   在 `showAlert` 函数中，我们检查 `instance` 和 `$alert` 是否存在，如果存在则调用 `$alert` 方法。

## 区别与对比

**用途对比**

自定义指令和插件在用途上有显著的区别，主要体现在它们的功能和应用场景上。

**自定义指令**

自定义指令主要用于对 DOM 元素进行底层操作，处理特定的 DOM 行为。其主要用途包括：

- `操作 DOM 元素`：例如，自动聚焦输入框、图片懒加载等。
- `处理特定交互行为`：例如，拖拽、滚动加载等。
- `封装重复的 DOM 操作`：将一些常用的 DOM 操作封装成指令，提高代码复用性。

**插件**

插件主要用于全局扩展 Vue 应用的功能，注册全局组件、指令、过滤器，或者添加全局属性、方法等。其主要用途包括：

- `添加全局方法或属性`：例如，添加一个全局的 `$alert` 方法，用于在应用的任何地方显示警告框。
- `添加全局资源`：例如，注册全局组件、指令、过滤器等。
- `通过全局混入（mixin）添加一些组件选项`：例如，在所有组件中添加一些通用的生命周期钩子或数据。
- `添加 Vue 实例方法`：通过将其添加到 `Vue.prototype（对于 Vue 2.x）`，对于 Vue3 ,是添加到`app.config.globalProperties`, 使得在应用的任何地方都可以访问这些方法。

**实现方式对比**

自定义指令和插件在实现方式上也有显著的区别，主要体现在它们的注册和使用方式上。

**自定义指令**

自定义指令通过 `app.directive` 方法注册，并在指令的生命周期钩子中处理 DOM 操作。其主要实现步骤包括：

1. `定义指令`：
   - 使用 `app.directive` 方法定义自定义指令，并在指令的生命周期钩子中处理 DOM 操作。

2. `注册指令`：
   - 在 Vue 应用实例中使用 `app.directive` 方法注册自定义指令。

3. `使用指令`：
   - 在模板中使用自定义指令，绑定到特定的 DOM 元素上。

**插件**

插件通过 `app.use` 方法注册，并在 `install` 方法中配置 Vue 应用实例。其主要实现步骤包括：

1. `定义插件`：
   - 定义一个包含 `install` 方法的对象，在 `install` 方法中配置 Vue 应用实例。

2. `注册插件`：
   - 在 Vue 应用实例中使用 `app.use` 方法注册插件。

3. `使用插件`：
   - 在应用的任何地方使用插件提供的全局属性、方法、组件等。


### 总结

自定义指令和插件是 Vue.js 中两种不同的扩展机制，它们各自有不同的用途和实现方式。自定义指令主要用于对 DOM 元素进行底层操作，处理特定的 DOM 行为；而插件主要用于全局扩展 Vue 应用的功能，注册全局组件、指令、过滤器，或者添加全局属性、方法等。在不同的使用场景下，可以根据需求选择合适的扩展机制。

<p align=center><img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/5591942fbce9432498f224536d69b6c1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oC75piv552h5LiN5aSf:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjU3MTEzMTIzMTE1MDQ4MCJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1729966597&x-orig-sign=yoHinZ8hZ2hReh4VEv0EntAK%2FnA%3D" alt="u=963691757,3806156433&fm=253&fmt=auto&app=138&f=PNG.webp" width="30%" /></p>
