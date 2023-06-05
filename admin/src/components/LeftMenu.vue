<template>
  <div>
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-submenu :index="index + '1'" v-for="(item, index) in sideMenu" :key="item.id">
        <template slot="title">
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group v-if="item.children.length > 0">
          <!-- <template slot="title">分组一</template> -->

          <el-menu-item :index="index + '' + index2" v-for="(child, index2) in item.children" :key="child.id">
            <span slot="title"
              ><router-link :to="child.path"
                ><span class="cate_name">{{ child.name }}</span></router-link
              ></span
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
    this.loadMenu()
  },
  computed: {
    ...mapGetters({
      sideMenu: 'Menu/sideMenu'
    })
  },
  methods: {
    loadMenu() {
      this.$store.dispatch('Menu/LoadMenu')
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  background-color: #334e66;
}
.el-menu-item-group {
  background-color: #334e66;
}
.el-menu-item {
  background-color: #334e66;
}
.el-submenu__title {
  color: #fff;
  background-color: #fff;
}
a {
  display: inline-block;
  text-decoration: none;
  color: #fff;
}
.cate_name {
  display: block;
  width: 100%;
}
</style>