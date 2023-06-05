<template>
  <div class="headers">
    <!-- 头部 -->
    <van-nav-bar left-arrow>
      <template #left> <van-icon name="wap-nav" /> </template>
      <template #title>
        <div class="searchBox">
          <div class="title">JD</div>
          <i class="line">|</i>
          <van-search @click="$router.push('/search')" disabled left-icon="search" placeholder="移动硬盘"> </van-search>
        </div>
      </template>

      <template #right>
        <van-icon name="manager-o" @click="$router.push('/mine')" v-if="isLogin" />
        <!-- <div class="login" v-else>登录</div> -->
        <span v-else class="login" @click="toLogin">登录</span>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import tabBar from '@/components/tabBar.vue'
import { Goods } from '@/api/index'
export default {
  name: 'Header',
  data() {
    return {}
  },
  computed: {
    isLogin() {
      return Object.keys(this.$store.state.User.userInfo).length
    }
  },

  methods: {
    toLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.headers {
  background-color: #f6f6f6;
}
.login {
  color: #fff;
}
.van-nav-bar {
  background-color: #c82519;
  .van-icon {
    color: #fff;
    font-size: 24px;
  }
  /deep/.van-nav-bar__text {
    color: #fff;
    font-size: 16px;
  }
  .searchBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: #fff;
    padding-right: 10px;
    height: 30px;
    .title {
      text-align: center;
      font-weight: bold;
      color: #c82519;
      width: 38px;
      padding-left: auto 5px;
    }
    .line {
      color: #ccc;
      margin-right: 10px;
    }
    .van-search {
      height: 30px;
      padding: 10px 0;
      /deep/.van-search__content {
        background-color: #fff;
        padding-left: 0;
      }
      .van-cell {
        height: 0.9rem;
        /deep/.van-icon-search {
          color: #ccc;
          font-size: 18px;
        }
      }
      /deep/.van-field__control {
        font-size: 16px;
      }
    }
  }
}
</style>