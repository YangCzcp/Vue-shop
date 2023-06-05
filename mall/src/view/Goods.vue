<template>
  <div class="list">
    <Header></Header>
    <GoodsList :cate_id="cate_id"></GoodsList>
    <div style="height: 5rem"></div>
    <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from '@/components/tabBar.vue'
import Header from '@/components/Header.vue'
import GoodsList from '@/components/GoodsList.vue'
export default {
  name: 'Goods',
  components: {
    tabBar,
    Header,
    GoodsList
  },
  data() {
    return {
      id: this.$route.query.id
    }
  },

  computed: {
    cate_id() {
      if (this.id == 0) {
        return ''
      } else {
        return this.id
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  background-color: #f6f6f6;
}
</style>