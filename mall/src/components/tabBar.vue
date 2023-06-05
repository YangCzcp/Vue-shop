<template>
  <div>
    <van-tabbar route v-model="active" active-color="#c82519">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item :to="{ path: '/goods', query: { id: 0 } }" icon="shop-o">商品</van-tabbar-item>
      <van-tabbar-item to="/car" icon="shopping-cart-o" :badge="this.$store.state.Cart.cartNums">购物车</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Cart } from '@/api/index'
export default {
  name: 'tabBar',
  data() {
    return {
      active: 0
    }
  },
  watch: {
    'this.$store.state.Cart.cartNums': {
      handler(val) {},
      immediate: true // 立即监听
    }
  },
  created() {
    if (this.$store.state.User.userInfo.id) {
      this.getCartList()
    }
  },
  methods: {
    async getCartList() {
      let { status, total } = await Cart.list()
      if (!status) {
        Toast.fail(msg)
        return false
      }
      this.$store.commit('Cart/setCartNums', total)
      // this.total = total
    }
  }
}
</script>

<style>
</style>