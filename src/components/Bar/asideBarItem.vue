<template>
    <div id="asideBarItem">
        <el-submenu :index="router.path" v-if="router.hasOwnProperty('children')">
            <span slot="title">{{router.name}}</span>
            <asideBarItem v-for="child in router.children" :key="child.path" :router="child">
            </asideBarItem>
        </el-submenu>
        <el-menu-item v-else :index="router.path" :key="router.path">
            {{router.name}}
        </el-menu-item>
    </div>
</template>
<script>
export default {
  name: 'asideBarItem',
  props: {
    router: {
      type: Object
    }
  }
}
</script>
<style scoped>
</style>
