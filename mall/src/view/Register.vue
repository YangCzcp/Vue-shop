<template>
  <div class="register">
    <van-nav-bar title="用户注册" left-arrow @click-left="onClickLeft" />
    <div class="contain">
      <van-form validate-first @submit="register">
        <!-- 通过 pattern 进行正则校验 -->

        <van-field v-model="form.username" name="pattern" placeholder="用户名" :rules="[{ validator: userValidator, message: '请输入正确内容' }]" />

        <van-field v-model="form.password" type="password" name="validator" placeholder="密码" :rules="[{ validator: pwdValidator, message: '请输入正确内容' }]" />
        <van-field v-model="form.nickname" name="validator" placeholder="昵称" :rules="[{ validator: nickValidator, message: '请输入正确内容' }]" />
        <van-field name="radio">
          <template #input>
            <van-radio-group v-model="form.sex" direction="horizontal">
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-model="form.tel" name="validator" placeholder="电话" :rules="[{ validator: telValidator, message: '请输入正确内容' }]" />

        <div style="margin-top: 30px">
          <van-button round block type="info" ref="btn" native-type="submit">快速注册</van-button>
        </div>
        <div class="register">
          <span>已有账号</span>
          <router-link to="/login"><span>登录</span></router-link>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { User } from '@/api/index'
export default {
  name: 'Register',
  data() {
    return {
      form: {
        sex: '男'
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/')
    },
    // 注册
    async register() {
      let { status, data, msg } = await User.register(this.form)
      if (!status) {
        Toast.fail(msg)
        return false
      }
      Toast.success(msg)
      this.$router.push('/login')
    },
    // 验证用户名
    userValidator(val) {
      return /^[a-zA-Z0-9_-]{6,16}$/.test(val)
    },
    // 验证密码
    pwdValidator(val) {
      return /^\S{6,16}$/.test(val) // 任意字符 6-16位
    },
    // 昵称校验规则
    nickValidator(val) {
      return /^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(val)
    },
    // 电话校验规则
    telValidator(val) {
      return /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/.test(val)
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  .contain {
    padding: 0 20px;
  }
  /deep/.van-nav-bar {
    .van-icon {
      color: #222222;
      font-size: 20px;
    }
  }
  /deep/.van-hairline--bottom::after {
    border: 0;
  }
  /deep/.van-cell {
    height: 50px;
  }
  /deep/.pwd-box {
    display: flex;

    .repwd {
      font-size: 12px;
      width: 100px;
      padding: 0 10px;
      line-height: 50px;
      border-bottom: 1px solid #efefef;
    }
    .repwd span {
      border-left: 1px solid #efefef;
      padding-left: 15px;
    }
  }
  /deep/.van-button {
    height: 48px;
    background-image: linear-gradient(#fab3b3, #ffcaba);
    border: 0;
  }
  /deep/.register {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-top: 15px;
    color: #ccc;
  }
  /deep/.register a {
    font-size: 14px;
    color: #ccc;
  }
}
</style>