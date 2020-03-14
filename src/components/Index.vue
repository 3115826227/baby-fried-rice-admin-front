<template>
    <el-container class="index-container">
        <el-header id='header'>
            宝宝煎米果 · 校园管理系统
        </el-header>
        <el-container>
            <el-aside width="200px">
               <asideBar></asideBar>
            </el-aside>
            <el-main>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item v-for="item in levelList" :key="item.path">
                    {{item.name}}
                  </el-breadcrumb-item>
                </el-breadcrumb>
                <Content></Content>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import headerBar from '../components/Bar/headerBar'
import asideBar from '../components/Bar/asideBar'
import Content from '../components/Main/Content'

export default {
  name: 'index',
  components: {
    headerBar,
    asideBar,
    Content
  },
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      this.levelList = matched
    }
  },
  created () {
    this.getBreadcrumb()
  }
}
</script>

<style scoped>
#header {
    margin-bottom: 10px;
    padding: 0;
    background-color: #545c64;
    color: white;
    font-size: 20px;
    text-align: left;
    padding: 15px 0 0 30px;
}
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}
.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}
body > .el-container {
    margin-bottom: 40px;
}
.index-container {
    height: 100%;
}

</style>
