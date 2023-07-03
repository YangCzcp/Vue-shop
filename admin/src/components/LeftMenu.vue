<template>
  <div>
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-submenu :index="index + ''" v-for="(item, index) in sideMenu" :key="item.id">
        <template slot="title">
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group v-if="item.children.length">
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="1-1" v-for="(child, index2) in item.children" :key="child.id">
            <router-link :to="child.path"
              ><span class="cate_name">{{ child.name }}</span></router-link
            >
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LeftMenu',
  created() {
    this.getMenus()
  },
  // 计算属性
  computed: {
    ...mapGetters({
      sideMenu: 'Menu/sideMenu'
    })
  },
  methods: {
    getMenus() {
      this.$store.dispatch('Menu/loadMenu')
    }
  }
}
</script>

<style lang="less" scoped>
a {
  color: #000;
  text-decoration: none;
}
.cate_name {
  display: block;
}
</style>