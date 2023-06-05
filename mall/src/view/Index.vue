<template>
  <div class="index">
    <Header></Header>
    <!-- 轮播 -->
    <div class="swiper">
      <van-swipe :autoplay="3000" height="4.3rem" indicator-color="#c82519">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" class="lunbo_img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <div class="cate">
        <van-swipe>
          <van-swipe-item v-for="(item, index) in cate_list" :key="index">
            <div class="item-box">
              <div class="item" v-for="(item2, index2) in item" @click="$router.push({ path: '/goods/', query: { id: item2.id } })" :key="item2.id">
                <img :src="item2.img" class="cate-img" />
                <div class="cate-name">{{ item2.name }}</div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <GoodsList></GoodsList>
    <div style="height: 5rem"></div>

    <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from '@/components/tabBar.vue'
import Header from '@/components/Header.vue'
import GoodsList from '@/components/GoodsList.vue'
import { Category } from '@/api/index'
import { Toast } from 'vant'
export default {
  name: 'Index',
  data() {
    return {
      images: ['https://img01.yzcdn.cn/vant/apple-1.jpg', 'https://img01.yzcdn.cn/vant/apple-2.jpg'],
      cate_list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      let { status, data, msg } = await Category.list({ pId: 1 })

      if (!status) {
        Toast.fail(msg)
        return false
      }
      // this.cate_list = data
      for (let i = 0; i < data.length; ) {
        this.cate_list.push(data.slice(i, (i += 10)))
      }
    }
  },
  components: {
    tabBar,
    Header,
    GoodsList
  },
  computed: {
    isLogin() {
      return Object.keys(this.$store.state.User.userInfo).length
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  background-color: #f6f6f6;
}

.swiper {
  height: 4.3rem;
  padding: 0.3rem;

  /deep/.lunbo_img {
    width: 100%;
    height: 4.3rem;
  }
}
/deep/.cate {
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-end;
  padding: 10px;
  box-sizing: border-box;
  height: 4rem;
  .item-box {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 70px;
      height: 70px;
      display: flex;
      flex-direction: column;
      // align-content: ap;
      justify-content: space-around;
      // justify-content: ;
      align-items: center;
      .cate-name {
        font-size: 14px;
        // font-weight: bold;
      }
      .cate-img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>