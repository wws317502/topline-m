<template>
  <div class="home">
    <van-nav-bar title="首页" fixed />
    <!-- 频道列表 -->
     <van-tabs v-model="active">
      <van-icon slot="nav-right"
       class="wap-nav"
       name="wap-nav"
       @click="isChannelEditShow=true"
        />
      <van-tab :title="channels.name" v-for="channels in userChannels" :key='channels.id'>
        <article-list :channel="channels" />
      </van-tab>
    </van-tabs>
    <!-- 频道列表 -->
    <!-- 频道编辑 -->
      <van-popup
        v-model="isChannelEditShow"
        position="bottom"
        closeable
        close-icon-position="top-left"
        :style="{ height: '100%' }"
      />
    <!-- 频道编辑 -->
  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
import ArticleList from './components/article-list'
export default {
  data () {
    return {
      active: 0,
      userChannels: [],
      isChannelEditShow: false// 频道列表的显示状态
    }
  },
  components: {
    ArticleList
  },
  methods: {
    async loadUserChannels () {
      let { data } = await getUserChannels()
      console.log(data)
      this.userChannels = data.data.channels
    }

  },
  created () {
    this.loadUserChannels()
  }

}
</script>

<style lang="less" scoped>
.wap-nav{
position: fixed;
right: 0;
line-height: 46px;
z-index: 3;
}
/deep/ .van-tabs__wrap{
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 2;
}

</style>
