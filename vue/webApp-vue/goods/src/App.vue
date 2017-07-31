<template>
  <div id="app">
    <v-header></v-header>
    <ul class="tab">
      <li class="tab-item">商品</li>
      <li class="tab-item">评论</li>
      <li class="tab-item">商家</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  export default {
    components:{
      'v-header':header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
.tab 
  display:flex
  width:100%
  height:40px
  line-height:40px
  .tab-item
    flex:1
    text-align:center

</style>
  