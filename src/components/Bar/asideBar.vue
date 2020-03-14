<template>
    <div class='asideBar'>
            <el-row class="tac">
              <el-col :span="24">
                  <el-menu router :default-active="$route.path"  class="el-menu-vertical-demo"
                  @open="handleOpen" @close="handleClose"
                  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
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
.aside-container {
    height: inherit;
}
</style>
