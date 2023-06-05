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
        <el-button>取消</el-button>
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
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('@/assets/images/loginbg.png') no-repeat;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.el-form {
  width: 40%;
  height: 40%;
  padding: 20px;
  padding-right: 40px;
  padding-top: 40px;
  border: 2px solid #ccc;
}
/deep/ .el-form-item__label {
  color: #fff;
}

/deep/.el-input__inner {
  background-color: #ccc;
}
</style>