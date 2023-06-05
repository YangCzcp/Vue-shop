<template>
  <div class="cart">
    <van-nav-bar title="购物车" left-arrow @click-left="onClickLeft" />
    <div class="box">
      <van-checkbox-group v-model="result">
        <van-swipe-cell v-for="(item, index) in list" :key="item.id">
          <div class="item-box">
            <van-checkbox :name="item" checked-color="#ee0a24"></van-checkbox>
            <van-card :price="item.price" :title="item.name" :thumb="item.img">
              <template #footer>
                <van-stepper v-model="item.goods_num" async-change @plus="plus(item.id, item.goods_id)" @minus="minus(item.id, item.goods_id)" />
              </template>
            </van-card>
          </div>

          <template #right>
            <van-button square type="danger" text="删除" class="delete-btn" @click="delCart(item.id)" />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <!-- 选择地址 -->
    <van-popup v-model="show" :style="{ height: '90%', width: '90%' }">
      <van-address-list v-model="addressId" :list="addressList" add-button-text="确定" @add="show = false" />
    </van-popup>
    <div style="height: 50px"></div>
    <van-submit-bar :price="sumPrice" :disabled="disabled" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" checked-color="#ee0a24" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { Cart, Address, Orders } from '@/api/index'
export default {
  name: 'Car',
  data() {
    return {
      checked: false, // 是否全选
      list: [], // 购物车商品数据
      total: 0, // 商品数量
      totalPrice: 0, // 总价
      result: [], // 购物车商品选中
      addressList: [], // 收件地址列表
      verify: false, // 是否有选择地址
      addressId: null, // 用户选择的收件地址ID
      show: false,
      disabled: true
    }
  },
  async created() {
    await this.getCartList()
  },
  computed: {
    // 用于显示合计
    sumPrice() {
      // return this.totalPrice * 100
      let sum = 0
      this.list.forEach((item) => {
        this.result.forEach((item2) => {
          if (item.id == item2.id) {
            sum += item.goods_num * item.price
          }
        })
      })
      return sum * 100
    },
    payment() {
      return this.sumPrice / 100
    }
  },
  watch: {
    // result(val) {
    //   if (val.length === this.list.length) {
    //     this.checked = true
    //   } else {
    //     this.checked = false
    //   }

    // }
    result: {
      handler(val) {
        if (val.length === this.list.length) {
          this.checked = true
        } else {
          this.checked = false
        }

        if (val.length > 0) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      }
    }
  },
  methods: {
    // 获取购物车列表
    async getCartList() {
      let { status, data, msg, total, totalPrice } = await Cart.list()
      if (!status) {
        Toast.fail(msg)
        return false
      }
      this.list = data
      this.totalPrice = totalPrice
      this.total = total
    },
    // 全选or取消全选
    checkAll() {
      this.result = []
      if (this.checked) {
        this.list.forEach((item) => {
          // this.result.push(item.id) // 把购物车中的id全部写入result中就是全选
          this.result.push(item)
        })
      } else {
        this.list.forEach((item) => {
          this.result = []
        })
      }
    },
    // 删除购物车中指定的商品
    async delCart(id) {
      let { status, msg } = await Cart.del(id)
      if (!status) {
        Toast.fail(msg)
        return false
      } else {
        Toast.success(msg)
        this.getCartList()
      }
    },
    // 按钮添加
    async plus(id, gid) {
      let { status, msg } = await Cart.plus(id, { gid: gid })
      if (!status) {
        Toast.fail(msg)
        this.getCartList()
        return false
      } else {
        Toast.success(msg)
        this.getCartList()
      }
    },
    async minus(id, gid) {
      let { status, msg } = await Cart.plus(id, { gid: gid, num: -1 })
      if (!status) {
        Toast.fail(msg)
        this.getCartList()
        return false
      } else {
        Toast.success(msg)
        this.getCartList()
      }
    },
    onClickLeft() {
      this.$router.push('/')
    },

    // 选择地址
    async onSubmit() {
      if (this.addressId == null) {
        let status = await this.getAddressList()
        this.show = true
      } else {
        this.orderSubmit()
      }
    },
    // 生成订单
    async orderSubmit() {
      // 商品id  数量
      let goodsIdArr = []
      this.result.forEach((item) => {
        let obj = { id: item.goods_id, num: item.goods_num }
        goodsIdArr.push(obj)
      })
      // this.sumPrice  总金额

      // 封装接口需要的数据
      let apiData = { payment: this.payment, addressId: this.addressId, goodsList: goodsIdArr }
      let { status, data, msg } = await Orders.createOrder(apiData)
      if (!status) {
        Toast.fail(msg)
        return false
      }
      // order-detail/24
      this.$router.push('order-detail/' + data.order_id)
    },

    // 返回地址列表
    async getAddressList() {
      let { status, msg, data } = await Address.list()
      if (!status) {
        Toast.fail(msg)
        return false
      }
      this.addressList = data
      this.addressList.forEach((item) => {
        item.address = item.province + item.city + item.county + item.street
      })
      return status
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  /deep/.van-nav-bar__arrow {
    color: #000;
  }
  .box {
    padding: 0 15px;
  }
  .item-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .van-card {
    background: #fff;
    border-bottom: 1px solid #ecec;
    margin-top: 10px;
    flex: 1;
  }
  .delete-btn {
    height: 100%;
  }
}
</style>