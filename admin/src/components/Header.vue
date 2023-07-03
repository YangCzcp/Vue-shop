<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="" />
    </div>
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-submenu index="1">
          <template slot="title">{{ profile }}</template>
          <el-menu-item index="1-1" @click="logOut">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    ...mapGetters({
      profile: 'User/profile'
    })
  },
  created() {
    this.getUsers()
  },
  methods: {
    logOut() {
      localStorage.clear()
      this.$router.push('/')
    },
    getUsers() {
      // 调用 store/user/actions/loadInfo

      this.$store.dispatch('User/loadInfo', { id: localStorage.getItem('uid') })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.logo img {
  width: 100px;
}
.el-menu {
  background: #000;
}
</style>