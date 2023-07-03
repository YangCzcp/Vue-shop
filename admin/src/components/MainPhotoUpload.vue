<template>
  <div>
    <el-upload class="avatar-uploader" :action="action" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <div v-if="url" class="cover" @click.stop="handleRemove">
        <i class="el-icon-delete avatar-uploader-icon"></i>
      </div>
      <img v-if="url" :src="url" class="avatar" />

      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { Upload } from '@/api/index'
export default {
  name: 'MainPhotoUpload',
  // 接收父组件传递的值
  props: {
    action: {
      type: String,
      require: true
    },
    url: {
      type: String
    },
    imgLg: {
      type: String
    },
    imgMd: {
      type: String
    }
  },
  data() {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
  },
  methods: {
    // 文件上传成功执行的方法
    handleAvatarSuccess(res, file) {
      this.$message.success('上传成功')
      let { status, msg, lgImg, mdImg } = res

      this.$emit('success', res)
      this.$emit('update:url', mdImg)
      this.$emit('update:imgLg', lgImg)
    },
    // 文件上传之前做什么事情
    beforeAvatarUpload() {},
    // 删除
    async handleRemove() {
      let { status: statusLg } = await Upload.remove({ src: this.url })
      let { status: statusMd } = await Upload.remove({ src: this.imgLg })

      if (statusLg && statusMd) {
        this.$message.success('删除成功')
        this.$emit('update:url', '')
        this.$emit('update:imgLg', '')
      }
    }
  }
}
</script>

<style  lang="less" scoped>
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
.cover {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: all 0.5s;

  .el-icon-delete {
    font-size: 18px;
    color: white;
  }
}

&:hover .cover {
  opacity: 1;
}
</style>