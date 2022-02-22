<template>
  <div>
    <h1>App 根组件</h1>
    <button @click="getBooks">获取图书列表的数据</button>

    <hr />

    <div class="box">
      <Left></Left>
      <Right></Right>
    </div>
  </div>
</template>

<script>
import Left from '@/components/Left'
import Right from '@/components/Right'

export default {
  methods: {
    async getBooks() {
      const { data: res } = await this.$http.get('/api/getbooks')
      console.log(res)
    }
  },
  components: {
    Left,
    Right
  }
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
}
</style>
