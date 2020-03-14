<template>
    <div id='headerBar'>
        <el-menu default-active="" class="el-menu-demo"
            mode="horizontal">
            <el-menu-item index="1">
                    宝宝煎米果
            </el-menu-item>
            <el-menu-item index="2">
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
  name: 'headerBar',
  data () {
    return {
      activeIndex: 1,
      isCollapse: true
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
#headerBar {
    background-color: #545c64;
}
</style>
