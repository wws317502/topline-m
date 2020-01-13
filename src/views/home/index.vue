<template>
  <div class="home">
    <van-nav-bar title="首页" />
    <van-tabs v-model="active">
      <van-tab :title="channels.name" v-for="channels in userChannels" :key='channels.id'>
        <article-list :channel="channels" />
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
import ArticleList from './components/article-list'
export default {
  data () {
    return {
      active: 0,
      userChannels: []
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

<style>

</style>
