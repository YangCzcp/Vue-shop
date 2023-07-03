<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品列表</span>
        <el-input v-model="keyword" placeholder="请输入内容" size="small" style="width: 200px"></el-input>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"> </el-table-column>
        <el-table-column prop="name" label="商品名称" width="180"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img class="product_img" :src="scope.row.img_md" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link :to="'/goods/edit/' + scope.row.id">
              <el-button type="primary" icon="el-icon-edit" size="mini" circle></el-button>
            </router-link>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row.id)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[4, 8, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { Goods } from '@/api/index'
export default {
  name: 'GoodsList',
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 8, // 每页显示条数
      total: 0, // 总数
      keyword: '' // 搜索关键字
    }
  },
  created() {
    this.getGoodsList()
  },
  watch: {
    keyword(newValue, oldValue) {
      this.getGoodsList()
    }
  },
  methods: {
    // 调用接口获取商品列表
    async getGoodsList() {
      let { status, total, data } = await Goods.list({ pageSize: this.pageSize, pageIndex: this.currentPage, keyword: this.keyword })
      if (!status) {
        this.$message.error('获取商品失败')
        return false
      }
      this.tableData = data
      this.total = total
    },
    // 每页显示条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getGoodsList()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getGoodsList()
    },
    // 删除商品
    async del(id) {
      if (!id) {
        return false
      }
      let { status, msg } = await Goods.remove(id)
      if (!status) {
        this.$message.error('删除失败')
        return false
      }
      this.$message.success(msg)
      this.getGoodsList()
    }
  }
}
</script>

<style scoped>
.product_img {
  width: 150px;
}
.clearfix {
  display: flex;
  justify-content: space-between;
}
</style>