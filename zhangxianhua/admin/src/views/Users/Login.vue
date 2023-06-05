<template>
  <div class="login">
    <div class="form-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { User } from '@/api/index'
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 16, message: '长度不合法', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度不合法', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (!valid) {
          this.$message.error('请填写完整信息')
          return false
        }
        // 发起请求调用接口

        // .....
        let { status, msg, data } = await User.login({ ...this.ruleForm })

        if (!status) {
          this.$message.error(msg)
          return false
        } else {
          // 成功
          //1.将信息保存在本地存储
          localStorage.setItem('uid', data.id)
          localStorage.setItem('role', data.role)
          localStorage.setItem('token', data.token)
          // 用户提示
          this.$message({
            message: msg,
            type: 'success'
          })
          // 路由跳转
          this.$router.push('/goods')
        }
        //......
      })
    }
  }
}
</script>

<style scoped lang="less">
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
}
.form-box {
  border: 2px solid #ccc;
  width: 40%;
  height: 40%;
  padding-top: 50px;
  padding-right: 50px;
}
/deep/.el-form-item__label {
  color: #fff;
}
.el-input__inner {
  background-color: #ccc;
}
</style>