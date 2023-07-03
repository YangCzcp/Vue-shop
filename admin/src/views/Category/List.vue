<template>
  <div>
    <div class="custom-tree-container">
      <!-- 列表 -->
      <div class="block">
        <el-tree :data="list" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.name }}</span>
            <span>
              <el-button type="text" size="mini" @click="show(data.id)"> 添加 </el-button>
              <el-button type="text" size="mini" @click="drop(data.id)"> 删除 </el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <!-- 添加 -->
      <el-dialog title="添加分类" :close-on-click-modal="false" :center="true" :visible.sync="centerDialogVisible" width="30%" center>
        <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分类名" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="主图" prop="img_md">
            <MainPhotoUpload action="/upload/goods" :url.sync="formData.img_md" :img-lg.sync="formData.img_lg"></MainPhotoUpload>
          </el-form-item>
          <el-form-item>
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCate">确 定</el-button>
          </el-form-item>
          <!-- <span slot="footer" class="dialog-footer"> </span> -->
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import MainPhotoUpload from '@/components/MainPhotoUpload.vue'
import { Category } from '@/api/index'
export default {
  name: 'CategoryList',
  data() {
    return {
      list: [],
      formData: {
        name: '',
        pId: '',
        img_md: ''
      }, // 父级id
      centerDialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  components: {
    MainPhotoUpload
  },
  methods: {
    // 分类列表
    async getList() {
      let { status, data, msg } = await Category.all({ type: 'tree' })

      if (!status) {
        this.$message.error('获取分类失败')
        return false
      }
      this.list = data
      this.$message.success(msg)
    },
    // 删除
    async drop(id) {
      let { status, msg } = await Category.del(id)
      if (!status) {
        this.$message.error(msg)
        return false
      }
      this.$message.success(msg)
      this.getList()
    },
    // 显示添加窗口
    show(pId) {
      this.centerDialogVisible = true
      this.formData.pId = pId
    },
    // 添加逻辑
    async addCate() {
      // console.log(this.formData)
      let { status, msg } = await Category.add({ name: this.formData.name, pId: this.formData.pId, img: this.formData.img_md })
      if (!status) {
        this.$message.error(msg)
        return false
      }
      this.$message.success(msg)
      this.centerDialogVisible = false
      this.getList()
    }
  }
}
</script>

<style>
</style>