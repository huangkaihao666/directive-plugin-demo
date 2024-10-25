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