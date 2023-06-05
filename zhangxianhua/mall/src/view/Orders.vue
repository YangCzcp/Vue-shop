<template>
  <div class="orders">
    <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active">
      <van-tab title="全部订单" name="all">
        <div class="order-item" v-for="(item, index) in list" :key="item.id">
          <div class="box" @click="detail(item.id)">
            <van-cell value="内容">
              <template #title>
                <div>
                  <span>订单号：</span>
                  <span>{{ item.id }}</span>
                </div>
              </template>
              <template #default>
                <div>
                  <span class="status">{{ item.status }}</span>
                </div>
              </template>
            </van-cell>
            <van-card v-for="(goods, index2) in item.goodsList" :num="goods.goods_num" :price="goods.goods_price" :title="goods.name" :thumb="goods.img_md" :key="goods.id" />
            <div class="footer">
              <span>{{ item.create_time }}</span>
              <div class="price-box">
                <span class="price-title">总价:</span>
                <span class="price">{{ item.payment }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待付款" name="0">
        <div class="order-item" v-for="(item, index) in list" :key="item.id">
          <div class="box" @click="detail(item.id)">
            <van-cell value="内容">
              <template #title>
                <div>
                  <span>订单号：</span>
                  <span>{{ item.id }}</span>
                </div>
              </template>
              <template #default>
                <div>
                  <span class="status">{{ item.status }}</span>
                </div>
              </template>
            </van-cell>
            <van-card v-for="(goods, index2) in item.goodsList" :num="goods.goods_num" :price="goods.goods_price" :title="goods.name" :thumb="goods.img_md" :key="goods.id" />
            <div class="footer">
              <span>{{ item.create_time }}</span>
              <div class="price-box">
                <span class="price-title">总价:</span>
                <span class="price">{{ item.payment }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待发货" name="3">
        <div class="order-item" v-for="(item, index) in list" :key="item.id">
          <div class="box" @click="detail(item.id)">
            <van-cell value="内容">
              <template #title>
                <div>
                  <span>订单号：</span>
                  <span>{{ item.id }}</span>
                </div>
              </template>
              <template #default>
                <div>
                  <span class="status">{{ item.status }}</span>
                </div>
              </template>
            </van-cell>
            <van-card v-for="(goods, index2) in item.goodsList" :num="goods.goods_num" :price="goods.goods_price" :title="goods.name" :thumb="goods.img_md" :key="goods.id" />
            <div class="footer">
              <span>{{ item.create_time }}</span>
              <div class="price-box">
                <span class="price-title">总价:</span>
                <span class="price">{{ item.payment }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待收货" name="4">
        <div class="order-item" v-for="(item, index) in list" :key="item.id">
          <div class="box" @click="detail(item.id)">
            <van-cell value="内容">
              <template #title>
                <div>
                  <span>订单号：</span>
                  <span>{{ item.id }}</span>
                </div>
              </template>
              <template #default>
                <div>
                  <span class="status">{{ item.status }}</span>
                </div>
              </template>
            </van-cell>
            <van-card v-for="(goods, index2) in item.goodsList" :num="goods.goods_num" :price="goods.goods_price" :title="goods.name" :thumb="goods.img_md" :key="goods.id" />
            <div class="footer">
              <span>{{ item.create_time }}</span>
              <div class="price-box">
                <span class="price-title">总价:</span>
                <span class="price">{{ item.payment }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="退换货" name="5">
        <div class="order-item" v-for="(item, index) in list" :key="item.id">
          <div class="box" @click="detail(item.id)">
            <van-cell value="内容">
              <template #title>
                <div>
                  <span>订单号：</span>
                  <span>{{ item.id }}</span>
                </div>
              </template>
              <template #default>
                <div>
                  <span class="status">{{ item.status }}</span>
                </div>
              </template>
            </van-cell>
            <van-card v-for="(goods, index2) in item.goodsList" :num="goods.goods_num" :price="goods.goods_price" :title="goods.name" :thumb="goods.img_md" :key="goods.id" />
            <div class="footer">
              <span>{{ item.create_time }}</span>
              <div class="price-box">
                <span class="price-title">总价:</span>
                <span class="price">{{ item.payment }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { Orders } from '@/api/index'
export default {
  name: 'Orders',
  props: ['status'],
  data() {
    return {
      active: this.status,
      pageIndex: 1,
      list: [],
      total: 0
    }
  },
  watch: {
    active(value) {
      this.getOrderList()
    }
  },
  created() {
    this.getOrderList()
  },

  methods: {
    onClickLeft() {
      this.$router.push('/mine')
    },
    async getOrderList() {
      let { status, data, total, msg } = await Orders.list({ status: this.active, pageSize: 10, pageIndex: this.pageIndex })
      if (!status) {
        Toast.fail(msg)
        return false
      }
      this.list = data
      this.total = total
    },
    // 跳转到订单详情
    detail(orderId) {
      this.$router.push({
        path: '/order-detail/' + orderId
      })
    }
  }
}
</script>

<style lang="less" scoped>
.orders {
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
    padding: 10px;
  }
  /deep/.price-box {
    font-size: 15px;
    .price {
      font-size: 18px;
      color: #ff4142;
    }
  }
}
</style>