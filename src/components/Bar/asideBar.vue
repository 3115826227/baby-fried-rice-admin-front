<template>
    <div class='asideBar'>
            <el-row class="tac">
              <el-col :span="24">
                  <el-menu router :default-active="$route.path"  class="el-menu-vertical-demo"
                  @open="handleOpen" @close="handleClose"
                  text-color="#fff" background-color="#1a1b20 !important" active-text-color="#1c84c6">
                  <asideBarItem v-for="router in routers" :router="router" :key="router.path">
                  </asideBarItem>
                  </el-menu>
              </el-col>
            </el-row>
    </div>
</template>

<script>
import asideBarItem from './asideBarItem'

export default {
  name: 'asideBar',
  components: {
    asideBarItem
  },
  data () {
    return {
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // 点击打开时当前的路径
      // console.log(key, keyPath, 'handleOpen');
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath, 'handleClose');
    }
  },
  computed: {
    routers () {
      return this.$router.options.routes[0].children
    }
  }
}
</script>

<style scoped>
.asideBar {
    height: 100%;
}
.el-menu-vertical-demo {
    flex: 1;
    height: 745px;
}
</style>
