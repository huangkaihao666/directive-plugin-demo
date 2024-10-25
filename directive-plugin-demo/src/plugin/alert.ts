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