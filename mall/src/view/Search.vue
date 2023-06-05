<template>
  <div class="search">
    <van-search v-model="keywords" shape="round" background="#4fc08d" placeholder="请输入搜索关键词" />
    <!-- 商品列表 -->
    <div class="goods-list">
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
    </div>
    <div style="height: 5rem"></div>
    <tabBar />
  </div>
</template>

<script>
import tabBar from '@/components/tabBar.vue'
import { Goods } from '@/api/index'
export default {
  name: 'Search',
  data() {
    return {
      goodsList: [], // 商品数据
      total: 0, // 总条数
      keywords: '', // 搜索关键字
      pageSize: 10, // 每页显示条数
      currentPage: 1 // 当前页码
    }
  },
  components: {
    tabBar
  },
  watch: {
    keywords(val) {
      //   this.getGoodsList()
      if (val.trim()) {
        this.getGoodsList()
      }
    }
  },
  methods: {
    // 调用商品列表接口
    async getGoodsList() {
      let { status, data, total } = await Goods.list({ pageSize: this.pageSize, pageIndex: this.currentPage, keyword: this.keywords })
      if (!status) {
        Toast.fail('商品列表获取失败')
        return false
      }

      this.goodsList = data
      this.total = total
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  background-color: #f6f6f6;
}

.goods-list {
  margin-top: 0.625rem;
  /deep/.goods-name {
    font-size: 0.75rem;
    height: 2.125rem;
    line-height: 1.0625rem;
    font-family: -apple-system, Helvetica, sans-serif;
    color: #434343;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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