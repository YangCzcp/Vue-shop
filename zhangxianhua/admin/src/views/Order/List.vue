<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单列表</span>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"> </el-table-column>
        <el-table-column label="订单商品">
          <template slot-scope="scope">
            <el-table :data="scope.row.goodsList">
              <el-table-column prop="name" label="商品名称"> </el-table-column>
              <el-table-column label="图片">
                <template slot-scope="scope">
                  <img :src="scope.row.img_md" class="img_md" alt="" />
                </template>
              </el-table-column>
              <el-table-column prop="goods_price" label="商品价格"> </el-table-column>
              <el-table-column prop="goods_num" label="数量"> </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="payment" label="订单金额" width="180"> </el-table-column>
        <el-table-column label="订单状态" width="180">
          <template slot-scope="scope">
            <el-button type="warning" v-if="scope.row.status == '买家付款成功'" @click="updateStatus(4, scope.row.id)">发货</el-button>
            <div v-else>{{ scope.row.status }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="下单时间" width="180"> </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[4, 8, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { Order } from '@/api/index'
export default {
  name: 'OrderList',
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 8, // 每页显示条数
      total: 0 // 总数
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    // 调用接口获取商品列表
    async getOrderList() {
      let { status, total, data } = await Order.list({ pageSize: this.pageSize, pageIndex: this.currentPage })
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
      this.getOrderList()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getOrderList()
    },
    // 发货
    async updateStatus(state, orderId) {
      let { status, msg } = await Order.update({ status: state, orderId: orderId })
      if (!status) {
        this.$message.error(msg)
        return false
      }
      this.$message.success(msg)
      this.getOrderList()
    }
  }
}
</script>

<style scoped>
.img_md {
  width: 120px;
  height: 120px;
}
</style>