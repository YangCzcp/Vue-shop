<template>
  <div class="header">
    <div class="left"><img class="logo" src="../assets/images/logo.jpg" alt="" /></div>
    <div class="menu">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-submenu index="2">
          <template slot="title">{{ username }}</template>
          <el-menu-item index="2-1" @click="logOut">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  created() {
    this.loadInfo()
  },
  computed: {
    ...mapGetters({
      username: 'User/profile'
    })
  },
  methods: {
    // 加载管理员信息
    loadInfo() {
      this.$store.dispatch('User/loadInfo', { id: localStorage.getItem('uid') })
    },
    // 退出登录
    logOut() {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;

  .logo {
    height: 50px;
  }
}
</style>