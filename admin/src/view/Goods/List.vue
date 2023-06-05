<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品列表</span>
        <el-input v-model.lazy="keyword" placeholder="请输入内容" style="width: 200px"></el-input>
      </div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="商品图片" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.img_md" alt="" class="img_md" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称"> </el-table-column>
        <el-table-column prop="price" label="售价"> </el-table-column>
        <el-table-column prop="brand" label="品牌"> </el-table-column>
        <el-table-column prop="create_time" label="上架时间"> </el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[8, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { Goods } from '@/api/index.js'
export default {
  name: 'GoodList',
  created() {
    this.getGoodsList()
  },
  data() {
    return {
      tableData: [],
      keyword: '',
      currentPage: 1, // 当前页码
      pageSize: 8, // 每页显示条数
      total: 0 // 总的条数
    }
  },
  watch: {
    keyword(val) {
      this.getGoodsList()
    }
  },
  methods: {
    // 发起请求获取商品列表
    async getGoodsList() {
      let { status, data, total } = await Goods.list({ pageSize: this.pageSize, pageIndex: this.currentPage, keyword: this.keyword })
      if (!status) {
        this.$message({
          message: '获取商品列表失败',
          type: 'warning'
        })
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
    handleCurrentChange(val) {
      ;(this.currentPage = val), this.getGoodsList()
    }
  }
}
</script>

<style scoped>
.img_md {
  width: 120px;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>