<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login('form')">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { User } from '@/api/index'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login(form) {
      // 表单验证
      this.$refs[form].validate(async (valid) => {
        if (!valid) {
          return false
        }
        // 发起请求调用登录接口
        let { status, msg, data } = await User.login({ ...this.form })
        if (!status) {
          // 登录失败
          // 1.提示信息
          this.$message.error(msg)
          return false
        } else {
          // 将信息保存本地
          localStorage.setItem('uid', data.id)
          localStorage.setItem('role', data.role)
          localStorage.setItem('token', data.token)
          // 给成功提示
          this.$message({
            message: msg,
            type: 'success'
          })
          // 跳转
          this.$router.push('/goods')
        }
      })
    },
    resetForm() {
      this.$refs["form"].resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column; /* 添加新属性，纵向排列子元素 */
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('@/assets/images/loginbg.jpg') ;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.el-form {
  width: 30%;
  height: 30%;
  padding: 20px;
  padding-right: 40px;
  padding-top: 40px;
  border: 2px solid #ccc;
  text-align: center; /* 新添加样式，居中子元素 */
}
.el-form-item {
  margin-bottom: 20px;
}

.el-form-item button:first-of-type {
  margin-right: 30px;
}

.el-form-item button:last-of-type {
  margin-left: 20px;
  // 右按钮
}
/deep/ .el-form-item__label {
  // 字体
  color: #fff;
}

/deep/.el-input__inner {
  background-color: #f4e8e8;
  // 文本框
}
</style>