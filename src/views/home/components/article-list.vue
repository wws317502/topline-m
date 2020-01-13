<template>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
       <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <van-cell
              v-for="(article, index) in list"
              :key="index"
              :title="article.title"
            />
          </van-list>
    </van-pull-refresh>

</template>

<script>
import { getArticles } from '../../../api/articles'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    // 频道对象，父组件提供
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      timestamp: null
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    async onRefresh () {
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1
      })

      // 2. 如果有最新数据，则把数据放到列表的顶部
      const { results } = data.data
      this.list.unshift(...results)

      // 3. 关闭下拉刷新的 loading 状态
      this.isLoading = false

      // 提示更新成功
      this.$toast(`更新了${results.length}条数据`)
    },
    async onLoad () {
    // 1. 请求获取数据
      let { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      console.log(data)

      // 异步更新数据
      let results = data.data.results
      this.list.push(...results)

      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped></style>
