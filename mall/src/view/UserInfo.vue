<template>
  <div class="info">
    <van-nav-bar title="个人信息" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="avater">
      <!-- <van-image round width="8rem" height="8rem" :src="info.avatar" /> -->
      <van-uploader v-model="fileList" :max-size="300 * 1024" @oversize="onOversize" :max-count="1" :after-read="updateAvatar" />
    </div>

    <van-form validate-first @submit="onSubmit">
      <!-- 通过 pattern 进行正则校验 -->

      <van-field v-model="info.username" name="pattern" placeholder="用户名" disabled :rules="[{ validator: userValidator, message: '请输入正确内容' }]" />

      <van-field v-model="info.password" type="password" name="validator" placeholder="密码" :rules="[{ validator: pwdValidator, message: '请输入正确内容' }]" />
      <van-field v-model="info.nickname" name="validator" placeholder="昵称" :rules="[{ validator: nickValidator, message: '请输入正确内容' }]" />
      <van-field name="radio">
        <template #input>
          <van-radio-group v-model="info.sex" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="info.tel" name="validator" placeholder="电话" :rules="[{ validator: telValidator, message: '请输入正确内容' }]" />

      <div style="margin-top: 30px">
        <van-button round block type="info" ref="btn" native-type="submit">保存</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { User } from '@/api/index'
import { Toast } from 'vant'
export default {
  name: 'UserInfo',
  data() {
    return {
      info: this.$store.state.User.userInfo,
      fileList: [{ url: this.$store.state.User.userInfo.avatar, isImage: true }],
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
  },
  methods: {
    onClickLeft() {
      this.$router.push('/mine')
    },
    // 修改用户信息
    async onSubmit() {
      let { status, msg } = await User.update(this.info)
      if (!status) {
        Toast.fail(msg)
      }
      Toast.success(msg)
      this.$store.state.User.userInfo = {}
      this.$store.state.Cart.cartNums = 0
      localStorage.clear()
      this.$router.push('/login')
    },
    // 更新头像
    updateAvatar(file) {
      this.info.avatar = file.content
      // console.log(file)
    },
    onOversize(file) {
      Toast('文件大小不能超过 300kb')
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .avater {
    display: flex;
    justify-content: center;
    padding: 10px;
  }
}
</style>