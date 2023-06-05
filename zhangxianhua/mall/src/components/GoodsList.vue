<template>
  <div>
    <!-- 商品列表 -->
    <div class="goods-list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-grid column-num="2" gutter="8">
          <van-grid-item v-for="(item, index) in goodsList" :key="item.id">
            <router-link :to="'/details/' + item.id">
              <van-image :src="item.img_md" />
              <p class="goods-name">{{ item.name }}</p>
              <p class="price">
                ￥<em class="goods-price">{{ item.price }}</em>
              </p>
            </router-link>
          </van-grid-item>
        </van-grid>
      </van-list>
    </div>
  </div>
</template>

<script>
import { Goods } from '@/api/index'
export default {
  name: 'GoodsList',
  props: ['cate_id'],
  data() {
    return {
      goodsList: [], // 商品数据
      total: 0, // 总条数
      keywords: '', // 搜索关键字
      pageSize: 10, // 每页显示条数
      currentPage: 1, // 当前页码
      loading: false,
      finished: false
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 调用商品列表接口
    async getGoodsList() {
      let { status, data, total } = await Goods.list({ pageSize: this.pageSize, pageIndex: this.currentPage, cate_id: this.cate_id })
      if (!status) {
        Toast.fail('商品列表获取失败')
        return false
      }
      this.loading = false
      if (data.length == 0) {
        this.finished = true
        return false
      }

      this.goodsList = this.goodsList.concat(data)
      this.total = total
    },
    // 加载数据
    onLoad() {
      setTimeout(() => {
        // 页码++
        this.currentPage++
        this.getGoodsList()
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  margin-top: 0.625rem;
  /deep/.goods-name {
    font-size: 0.37rem;
    height: 1rem;
    line-height: 0.5rem;
    font-family: -apple-system, Helvetica, sans-serif;
    color: #434343;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
  /deep/.price {
    color: #ff4142;
    line-height: 24px;
    font-size: 10px;
    font-family: JDZH-Regular, sans-serif;
  }
  /deep/.goods-price {
    font-style: normal;
    font-size: 18px;
  }
}
</style>