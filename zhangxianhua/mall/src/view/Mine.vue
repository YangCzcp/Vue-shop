<template>
  <div class="mine">
    <div class="top-box">
      <img v-if="userInfo.avatar" class="avater-bg" :src="userInfo.avatar" alt="" />
      <img v-else src="https://img11.weikeimg.com/data/uploads/2016/12/17/21262206125855078c7f493.jpg" class="avater-bg" alt="" />
    </div>

    <van-cell>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title"><van-icon name="shop-o" />我的订单</span>
      </template>
      <template #right-icon>
        <router-link :to="'/orders/' + 'all'"> 查看全部订单<van-icon name="arrow" /> </router-link>
        <!-- <div>查看全部订单<van-icon name="arrow" /></div> -->
      </template>
    </van-cell>
    <van-grid square :border="false">
      <van-grid-item icon="pending-payment" text="待付款" @click="detail(0)" />

      <van-grid-item icon="point-gift-o" text="待发货" @click="detail(3)" />

      <van-grid-item icon="gift-o" text="待收货" @click="detail(4)" />

      <van-grid-item icon="replay" text="退换货" @click="detail(5)" />
    </van-grid>

    <van-cell title="我的收藏" is-link icon="star-o" @click="$router.push('/collection')" />
    <van-cell title="地址管理" is-link icon="location-o" @click="$router.push('/address')" />
    <van-cell title="个人信息" is-link icon="user-circle-o" @click="$router.push('/userInfo')" />
    <van-cell title="退出" is-link icon="user-circle-o" @click="logOut" />

    <!-- <van-button type="primary" @click="logOut">退出登录</van-button> -->
    <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from '@/components/tabBar.vue'
export default {
  name: 'Mine',
  components: {
    tabBar
  },
  data() {
    return {
      // avatar:this.$store.state.User.userInfo.
      userInfo: this.$store.state.User.userInfo,
      activeName: '1'
    }
  },
  created() {},
  methods: {
    // 退出功能
    logOut() {
      this.$store.state.User.userInfo = {}
      this.$store.state.Cart.cartNums = 0
      localStorage.clear()
      this.$router.push('/')
    },
    detail(status) {
      this.$router.push({
        path: '/orders/' + status
      })
    }
  }
}
</script>

<style lang="less" scoped >
.mine {
  a {
    color: #323233;
  }
  /deep/.avater-bg {
    height: 250px;
    width: 100%;
    object-fit: cover;
  }
  .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }

  .search-icon {
    font-size: 16px;
    line-height: inherit;
  }
}
</style>