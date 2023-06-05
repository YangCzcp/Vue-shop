<template>
  <div class="detail">
    <div class="top">
      <van-icon name="arrow-left" @click="onClickLeft" />
      <van-icon name="ellipsis" @click="showShare = true" />
    </div>
    <div class="swiper-box">
      <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false" @change="pageChange">
        <van-swipe-item v-for="(item, index) in info.slider" :key="index">
          <img :src="item" alt="" />
        </van-swipe-item>
      </van-swipe>
      <span class="swiprer-num">{{ index }}/{{ slider_length }}</span>
    </div>
    <!-- 轮播 -->

    <!-- 商品信息 -->
    <div class="info">
      <div class="price-wrap">
        <div class="price">
          ￥<span class="price-num">{{ info.price }}</span>
        </div>
      </div>
      <h3 class="goods-name">{{ info.name }}</h3>
    </div>
    <!-- 商品详情与售后服务 -->
    <van-tabs v-model="active">
      <van-tab title="商品介绍">
        <div v-html="info.detail"></div>
      </van-tab>
      <van-tab title="售后保障">售后保障</van-tab>
    </van-tabs>

    <!-- 底部导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" @click="$router.push('/car')" text="购物车" :badge="this.$store.state.Cart.cartNums" />
      <van-goods-action-icon icon="star" v-if="info.isCollected" text="已收藏" color="#ff5000" @click="cancleCollected(info.id)" />
      <van-goods-action-icon icon="star" v-else="info.isCollected" text="未收藏" color="#ecec" @click="collected(info.id)" />
      <van-goods-action-button type="warning" @click="addCart(info.id)" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" />
  </div>
</template>

<script>
import { Toast } from 'vant'
import { Goods, Collected, Cart } from '@/api/index'
export default {
  name: 'Details',
  data() {
    return {
      info: {}, // 保存商品信息
      active: 0,
      index: 1, // 当前轮播
      slider_length: 0,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  props: ['id'], // 接收参数
  created() {
    this.getDetails()
  },
  watch: {
    'this.$store.state.Cart.cartNums': {
      handler(val) {
        console.log(1111111111)
      }
    }
  },
  methods: {
    // 获取商品详情
    async getDetails() {
      let { status, msg, data } = await Goods.details(this.id)
      if (!status) {
        Toast.fail(msg)
        this.$router.pus('/')
      }

      this.info = data[0]
      this.info.slider = this.info.slider.split(',') // 将轮播图构造成数组
      this.slider_length = this.info.slider.length
    },
    // 轮播切换
    pageChange(index) {
      this.index = index + 1
    },
    // 收藏
    async collected(id) {
      let { status, msg } = await Collected.collected({ id: id })
      if (!status) {
        Toast.fail('收藏失败')
        return false
      } else {
        Toast.success(msg)
        this.getDetails()
      }
    },
    // 取消收藏
    async cancleCollected(id) {
      let { status, msg } = await Collected.disCollected(id)
      if (!status) {
        Toast.fail('取消失败')
        return false
      } else {
        Toast.success(msg)
        this.getDetails()
      }
    },
    onClickLeft() {
      this.$router.push('/')
    },
    // 加入购物车
    async addCart(id) {
      let { status, msg } = await Cart.add({ gid: id, num: 1 })
      if (!status) {
        Toast.fail(msg)
        return false
      } else {
        Toast.success(msg)
        this.getNums()
      }
    },
    // 获取购物车数量
    async getNums() {
      if (localStorage.getItem('VUEX-PERSISTEDSTATE')) {
        let { msg, status, total } = await Cart.list()
        if (!status) {
          Toast.fail(msg)
          return false
        }
        this.$store.state.Cart.cartNums = total
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  background-color: #f2f2f2;
  position: relative;
  .top {
    position: absolute;
    top: 0;
    height: 48px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    // line-height: 48px;
    align-items: center;
    background-color: rgba(12, 12, 12, 0.6);
    z-index: 999;
    /deep/.van-icon-arrow-left {
      color: #fff;
      font-size: 24px;
    }
    /deep/.van-icon-ellipsis {
      font-size: 24px;
      color: #fff;
    }
  }
  .swiper-box {
    position: relative;
    .swiprer-num {
      display: inline-block;
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 30px;
      height: 25px;
      background-color: #42404a;
      text-align: center;
      line-height: 25px;
      font-size: 16px;
      padding: 5px;
      border-radius: 5px;
      color: #fff;
    }
  }

  .my-swipe {
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      // line-height: 375px;
      height: 375px;
      text-align: center;
      background-color: #fff;
      img {
        height: 100%;
      }
    }
  }
  .info {
    background-color: #fff;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 10px 15px;
    .price-wrap {
      display: flex;
      justify-content: space-between;
      .price {
        color: #f2270c;
        font-size: 16px;
        font-weight: bold;
        .price-num {
          font-size: 24px;
        }
      }
      .collected1 {
        color: #948d8d;
      }
      .collected2 {
        color: #ffc70d;
      }
    }
    .goods-name {
      font-size: 18px;
      color: #262626;
    }
  }
}
</style>