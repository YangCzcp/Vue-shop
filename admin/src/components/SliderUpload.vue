<template>
  <div>
    <el-upload class="upload-demo" :before-remove="handelSliderRemove" :on-success="handleSliderSuccess" :action="action" :headers="headers" :on-preview="handlePreview" :file-list="fileList" list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="100%" :before-close="handleClose">
      <img :src="imageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { Upload } from '@/api/index'
export default {
  name: 'SilderUpload',
  props: {
    action: {
      type: String,
      require: true
    },
    fileList: {
      type: Array
    }
  },
  data() {
    return {
      imageUrl: '',
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      },
      dialogVisible: false // 控制预览是否显示
    }
  },
  methods: {
    // 预览
    handlePreview(res) {
      //   console.log(res)
      this.imageUrl = res.url
      this.dialogVisible = true
    },
    // 关闭预览
    handleClose() {
      this.dialogVisible = false
    },
    handleSliderSuccess(res, file, fileList) {
      //   console.log(res)
      if (res.status) {
        let data = this.convertFileList(fileList)
        // console.log(fileList)
        this.$emit('input', data)
      }
    },
    convertFileList(fileList) {
      let res = []
      fileList.forEach((element) => {
        res.push(element.response.src)
      })
      return res.toString()
    },
    // 删除图片
    async handelSliderRemove(file, fileList) {
      //   console.log(file)
      // 准备要删除的图片
      let url = file.response.src
      // 调用接口服务器中删除
      let { status, msg } = await Upload.remove({ src: url })
      if (status) {
        // 查找你删除的数据的索引
        let i = fileList.findIndex((item) => item.url == url)
        let copy = [...fileList]
        // 组件中删除
        copy.splice(i, 1)
        // 将删除后的结果转换成字符串
        let data = this.convertFileList(copy)
        // 提交给父组件
        this.$emit('input', data)
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>