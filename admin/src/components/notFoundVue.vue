<template>
  <div class="box">
    <img src="../assets/images/404.jpg" alt="" />
    <div class="info">
      <div>页面丢失了！！！</div>
      <a href="#" @click.prevent="$router.go(-1)">返回</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notFoundVue'
}
</script>

<style scoped>
.box {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>