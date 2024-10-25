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

