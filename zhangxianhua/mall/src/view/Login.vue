<template>
  <div class="login">
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" />
    <van-form validate-first @submit="onSubmit">
      <!-- 通过 pattern 进行正则校验 -->
      <van-field v-model="form.username" name="pattern" placeholder="请输入用户名" :rules="[{ validator, message: '请输入正确内容' }]" right-icon="cross" />
      <div class="pwd-box">
        <van-field v-model="form.password" type="password" name="pattern" placeholder="请输入密码" :rules="[{ validator: validatorpwd, message: '请输入正确内容' }]" right-icon="cross" />
        <div class="rebox">
          <span class="pwd">忘记密码</span>
        </div>
      </div>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
      <!-- 注册 -->
      <div class="register">
        <span>没有账号?</span>
        <router-link to="/register"><span>快速注册</span></router-link>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    validator(val) {
      return /^[a-zA-Z0-9_-]{6,16}$/.test(val)
    },
    validatorpwd(val) {
      return /^\S{6,16}$/.test(val) // 任意字符 6-16位
    },
    onClickLeft() {
      this.$router.push('/')
    },
    // 登录
    onSubmit() {
      this.$store.dispatch('User/login', this.form)
      // if (this.$store.state.User.userInfo.status) {
      //   Toast.success('登录成功')
      //   this.$router.push('/')
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  /deep/.van-icon {
    // 颜色
    color: #4f4f4f;
  }
  /deep/.van-nav-bar__arrow {
    font-size: 22px;
  }
  /deep/.van-hairline--bottom::after {
    border: 0;
  }
  /deep/.vant-cell {
    line-height: 40px;
  }
  .pwd-box {
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid #efefef;
    margin-top: 15px;
    margin-bottom: 30px;
  }
  .rebox {
    height: 40px;
  }
  .pwd {
    display: inline-block;
    font-size: 12px;
    color: #4f4f4f;
    width: 100px;
    border-left: 1px solid #4f4f4f;
    padding-left: 20px;
    margin: 15px 0;
  }
  /deep/ .van-button {
    border: 0;
    background-image: linear-gradient(to right, #fab3b3, #ffc8b9);
  }
  input {
    border: 0;
    flex: 2;
  }
  input::-webkit-input-placeholder {
    color: #4f4f4f;
  }
  .register {
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    color: #555252;
    margin-top: 20px;
  }
}
</style>