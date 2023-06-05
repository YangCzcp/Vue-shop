<template>
  <div>
    <el-container class="container">
      <!-- 顶部 -->
      <el-header><Header /></el-header>
      <el-container>
        <!-- 左侧 -->
        <el-aside width="200px"><left-menu /></el-aside>
        <!-- 内容部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './Header.vue'
import LeftMenu from './LeftMenu.vue'
export default {
  name: 'Layout',
  components: {
    Header,
    LeftMenu
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  background-color: #334e66;

  .el-header {
    line-height: 60px;
    background-color: #31404e;
  }
  .el-main {
    background: #fff;
    color: #31404e;
  }
}
</style>