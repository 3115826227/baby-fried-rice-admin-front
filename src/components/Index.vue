<template>
    <el-container class="index-container">
        <el-header id='header'>
            <el-menu class="el-menu-demo" mode="horizontal" background-color="#1a1b20 !important" text-color="#fff">
              <el-menu-item style="font-size:20px;"><router-link to='/index' class="a">宝宝煎米果 · 校园管理系统</router-link></el-menu-item>
              <el-submenu style="float:right;">
                  <template slot="title">{{login_name}}@baby.com</template>
                  <el-menu-item index="2-1" @click="logout">退出</el-menu-item>
              </el-submenu>
            </el-menu>
        </el-header>
        <el-container id="content">
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
      levelList: null,
      login_name: '邵阳学院'
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
    },
    logout () {
      console.log('退出')
    }
  },
  created () {
    this.getBreadcrumb()
  }
}
</script>

<style scoped>
body {
    height: 100%;
}
#header {
    /* margin-bottom: 10px; */
    padding: 0;
    background-color: #545c64;
    color: white;
}
#content {
    flex: 1;
}
.el-aside {
    background-color: #1a1b20 !important;
    /* color: #1a1b20 !important; */
}
.el-main {
    background-color: #E9EEF3;
    color: #1a1b20 !important;
    text-align: center;
}
.el-menu.el-menu–inline {
    overflow: auto;
}
body > .el-container {
    margin-bottom: 40px;
}
.index-container {
    height: 100%;
}
.a {
  text-decoration: none;
}
.el-menu {
  background-color: #1a1b20 !important;
}
.el-submenu{
  background-color: #1a1b20 !important;
}
.el-menu-item{
  background-color: #1a1b20 !important;
}

</style>
