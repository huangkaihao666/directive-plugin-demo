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