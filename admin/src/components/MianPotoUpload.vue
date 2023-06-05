<template>
  <div>
    <el-upload class="avatar-uploader" :action="action" :headers="headers" :auto-upload="true" :data="data" :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
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
  name: 'MianPotoUpload',
  props: {
    // 上传接口地址
    action: {
      type: String,
      require: true
    },
    // 上传成功后的图片地址：小图
    url: {
      type: String
    },
    // 上传图片的时候而外参数
    data: {
      type: Object
    },
    // 小图
    mdImg: {
      type: String
    },
    // 大图
    lgImg: {
      type: String
    }
  },
  data() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      let { status, msg, lgImg, mdImg } = res
      this.$message.success('文件上传成功')
      this.$emit('success', res)
      this.$emit('update:url', mdImg)
      this.$emit('update:lgImg', lgImg)
    },
    beforeAvatarUpload(file) {},
    // 删除图片
    async handleRemove() {
      let { status: statusMd } = await Upload.remove({ src: this.url })
      let { status: statusLg } = await Upload.remove({ src: this.lgImg })
      if (statusMd && statusLg) {
        this.$message.success('删除成功!')
        this.$emit('update:url', '')
        this.$emit('update:lgImg', '')
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