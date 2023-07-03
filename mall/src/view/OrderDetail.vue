<template>
  <div class="detail">
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="step">
      <van-steps :active="active">
        <van-step>待付款</van-step>
        <van-step>待发货</van-step>
        <van-step>待收货</van-step>
        <van-step>交易完成</van-step>
      </van-steps>
    </div>
    <div class="concat">
      <div class="person">
        <span class="name">联系人：{{ info.name }}</span>
        <span class="tel">{{ info.tel }}</span>
      </div>
      <div class="address">联系地址：{{ info.province }}{{ info.city }}{{ info.county }}{{ info.street }}</div>
    </div>
    <van-cell-group>
      <van-cell icon="point-gift-o" title="商品信息" />
      <van-cell v-for="(goods, index) in info.goodsList" :key="goods.id">
        <van-card :num="goods.goods_num" :price="goods.goods_price" :title="goods.name" :thumb="goods.img_md" />
      </van-cell>
      <van-cell title="">
        <template #default>
          <div class="info">
            共<span>{{ goods_num }}</span
            >件商品,总价:<span>￥{{ info.payment }}</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="order-info">
      <van-cell icon="point-gift-o" title="订单信息" />
      <van-cell>
        <template #default>
          <div class="order">
            <div class="order-num">
              <span>订单号:</span>
              <span>{{ info.id }}</span>
            </div>
            <div class="order-num">
              <span>下单时间:</span>
              <span>{{ info.create_time }}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="status">
      <van-button v-if="info.order_state == 0" type="warning" size="mini" @click="pay">支付</van-button>
      <van-button v-if="info.order_state == 3" type="warning" size="mini">等待发货</van-button>
      <van-button v-if="info.order_state == 4" type="warning" size="mini" @click="updateStatus(5)">确认收货</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { Orders } from '@/api/index'
export default {
  name: 'OrderDetail',
  props: ['orderId'],
  data() {
    return {
      info: {},
      goods_num: 0
    }
  },
  computed: {
    active() {
      if (this.info.order_state == 0) {
        return this.info.order_state
      }
      if (this.info.order_state == 3) {
        return 1
      }
      if (this.info.order_state == 4) {
        return 2
      }
      if (this.info.order_state == 5) {
        return 3
      }
    }
  },
  created() {
    this.getOrderInfo()
  },
  methods: {
    async getOrderInfo() {
      let { status, msg, data } = await Orders.detail({ orderId: this.orderId })
      if (!status) {
        Toast.fail(msg)
        return false
      }
      this.info = data[0]
      this.goods_num = data[0].goodsList.length
    },
    onClickLeft() {
      this.$router.push('/orders/all')
    },
    // 修改订单状态
    async updateStatus(state) {
      let { status, msg } = await Orders.update({ status: state, orderId: this.info.id })

      if (!status) {
        Toast.fail(msg)
        return false
      }
      Toast.success(msg)
      this.getOrderInfo()
    },
    // 支付
    async pay() {
      let { code, result } = await Orders.pcpay({ orderId: this.info.id })

      if (code != 200) {
        Toast.fail(msg)
        return false
      }
      window.open(result)
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  background: #f6f7f9;
  .concat {
    margin: 15px 0;
    padding: 15px;
    background-color: #fff;
    .person {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .name {
        font-size: 18px;
      }
      .tel {
        font-size: 14px;
        color: #767777;
      }
    }
    .address {
      font-size: 16px;
      color: #767777;
    }
  }
  /deep/.status {
    color: #ff4142;
    font-weight: bold;
  }
  /deep/.footer {
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  /deep/.price-box {
    font-size: 15px;
    .price {
      font-size: 18px;
      color: #ff4142;
    }
  }
  /deep/.van-cell__left-icon {
    font-size: 18px;
    color: #39b8ff;
  }
  /deep/.van-cell__title {
    font-size: 18px;
    color: #000;
  }
  /deep/.van-card {
    background-color: #fff;
  }
  /deep/.info {
    color: #000;
    font-size: 16px;
  }
  /deep/.info span {
    color: #ff4142;
  }
  /deep/.order-info {
    margin-top: 10px;
  }
  /deep/.order {
    display: flex;
    flex-direction: column;
    .order-num {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
  .status {
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px;
    background: #fff;
    margin-top: 10px;
  }
}
</style>