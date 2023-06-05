<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会员列表</span>
        <el-input v-model="keyword" placeholder="请输入内容" size="small" style="width: 200px"></el-input>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="nickname" label="昵称"> </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img class="avatar" v-if="scope.row.avatar" :src="scope.row.avatar" alt="" />
            <img class="avatar" v-else src="https://img1.baidu.com/it/u=2080797795,1087878570&fm=253&fmt=auto&app=138&f=JPEG?w=268&h=269" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="注册时间"> </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 8, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { User } from '@/api/index'
export default {
  name: 'UserList',
  created() {
    this.getUserList()
  },
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 1, // 每页显示条数
      total: 0, // 总数
      keyword: '' // 搜索关键字
    }
  },
  watch: {
    keyword(newValue, oldValue) {
      this.getUserList()
    }
  },
  methods: {
    async getUserList() {
      let { status, data, total } = await User.list({ pageSize: this.pageSize, pageIndex: this.currentPage, keyword: this.keyword })
      if (!status) {
        this.$message.error('获取用户信息失败')
        return false
      }
      this.tableData = data
      this.total = total
    },
    // 每页显示条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserList()
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 120px;
  height: 120px;
}
</style>