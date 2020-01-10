<template>
   <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <ValidationObserver ref="form">
      <ValidationProvider name="手机号" rules="required|mobile">
          <van-field
            class="form-item"
            v-model="user.mobile"
            clearable
            placeholder="请输入手机号">
            <i class="iconfont icon-shouji" slot="left-icon"></i>
          </van-field>
      </ValidationProvider>
      <ValidationProvider name="验证码" rules="required|code">
            <van-field
              class="form-item"
              v-model="user.code"
              placeholder="请输入验证码">
              <i class="iconfont icon-mima" slot="left-icon"></i>
                <van-count-down
                v-if="isCountDownShow"
                :time="1000 * 60"
                slot="button"
                format="ss s"
                @finish='isCountDownShow=false'/>
                  <van-button
                  @click="onGetSmsCode"
                  slot="button"
                  size="small"
                  type="primary"
                  v-else
                  >发送验证码</van-button>
            </van-field>
      </ValidationProvider>
    </ValidationObserver>

    <div class="btn-wrap">
      <van-button @click="onLogin" type="info">登录</van-button>
    </div>
    <!-- /登录表单 -->
  </div>
</template>

<script>
// import {login } from '@api/user'
import { login, getSmsCode } from '../../api/user'
import { validate } from 'vee-validate'
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
      const success = await this.$refs.form.validate()
      if (!success) {
        // console.log('验证失败')

        // this.$toast(this.$refs.form.errors[0])
        setTimeout(() => {
          let { errors } = this.$refs.form
          let item = Object.values(errors).find(item => item[0])
          this.$toast(item[0])
        }, 100)
        return
      }
      this.$toast.loading({
        duration: 0,
        message: '登陆中...',
        forbidClick: true
      })
      try {
        const res = await login(user)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登陆成功')
      } catch (error) {
        console.log('登陆失败', error)
        this.$toast.fail('登陆失败')
      }
    },
    async onGetSmsCode () {
      let { mobile } = this.user
      let validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      try {
        this.isCountDownShow = true
        await getSmsCode(mobile)
      } catch (error) {
        this.isCountDownShow = false
        console.log(error)
        error.response.status === 429 ? this.$toast('请勿频繁发送') : this.$toast('发送失败')
        // if (error.response.status === 429) {
        //   return this.$toast('请勿频繁发送')
        // } else {
        //   this.$toast('发送失败')
        // }
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
