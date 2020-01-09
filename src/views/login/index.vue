<template>
   <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
      />
      <i class="icon icon-shouji" slot="left-icon"></i>
      <van-field
        v-model="user.code"
        label="验证码"
        placeholder="请输入验证码"
        required
      >
      <i class="icon icon-mima" slot="left-icon"></i>
      <van-count-down
      v-if="isCountDownShow"
      :time="1000 * 60"
      slot="button"
       format="ss S"
       />
        <van-button
        slot="button"
        size="small"
        type="primary"
        v-else
        >发送验证码</van-button>
      </van-field>
    </van-cell-group>

    <div class="btn-wrap">
      <van-button @click="onLogin" type="info">登录</van-button>
    </div>
    <!-- /登录表单 -->
  </div>
</template>

<script>
// import {login } from '@api/user'
import { login } from '../../api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false

    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLogin () {
      const user = this.user
      this.$toast.loading({
        duration: 0,
        message: '登陆中...',
        forbidClick: true
      })
      try {
        const res = await login(user)
        console.log(res)
        this.$toast.success('登陆成功')
      } catch (error) {
        console.log('登陆失败', error)
        this.$toast.fail('登陆失败')
      }
    }
  },
  created () {}

}
</script>

<style scoped lang='less'>
.btn-wrap {
  padding: 27px 16px;
  .van-button {
    width: 100%;
    background: #6db4fb;
  }
}

</style>
