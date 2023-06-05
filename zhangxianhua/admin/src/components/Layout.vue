<template>
  <div>
    <el-container>
      <el-header> <Header /> </el-header>
      <el-container>
        <el-aside width="200px">
          <left-menu />
        </el-aside>
        <el-main><router-view /></el-main>
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
.el-container {
  width: 100%;
  height: 100vh;
}
.el-header {
  background-color: #252526;
  color: #fff;
}
.el-aside {
  background-color: #252526;
  color: #fff;
}
</style>