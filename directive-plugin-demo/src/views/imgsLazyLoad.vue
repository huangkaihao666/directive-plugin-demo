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