<template>
  <div>
    <el-upload class="upload-demo" :action="action" :on-success="handelSuccess" :before-remove="handleRemove" :headers="headers" :on-preview="handlePreview" :file-list="fileList" list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="100%" :before-close="handleClose">
      <img :src="imgUrl" />
    </el-dialog>
  </div>
</template>

<script>
import { Upload } from '@/api/index'
export default {
  name: 'SliderUpload',
  props: {
    action: {
      type: String
    },
    fileList: {
      type: Array
    },
    // value 指的就是
    value: {
      type: String
    }
  },
  data() {
    return {
      // fileList: [],
      imgUrl: '', // 预览图片地址
      dialogVisible: false, // 是否预览
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
  },
  methods: {
    async handleRemove(file, fileList) {
      // 接口中删除图片
      let src = file.response.src
      //   console.log(file)
      let { status, msg } = await Upload.remove({ src: src })
      if (!status) {
        this.$message.error(msg)
        return false
      }

      let index = fileList.findIndex((item) => item.response.src == src)
      console.log(index)
      let copy = [...fileList]

      copy.splice(index, 1)
      // 将删除后的结果转换成字符串
      let data = this.convertFileList(copy)
      // 提交给父组件
      this.$emit('input', data)
      console.log(fileList)
    },
    // 预览图片
    handlePreview(file) {
      console.log(file)
      this.imgUrl = file.response.src
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    // 文件上传时候的钩子函数
    handelSuccess(response, file, fileList) {
      console.log('@@@')
      console.log(fileList)
      if (response.status) {
        let data = this.convertFileList(fileList)
        console.log(data)
        this.$emit('input', data)
      }
    },
    // 将上传后返回的图片地址转换成字符串
    convertFileList(fileList) {
      let res = []
      fileList.forEach((element) => {
        res.push(element.response.src)
      })
      return res.toString()
    }
  }
}
</script>

<style>
</style>