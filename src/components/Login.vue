<template>
    <div id="login">
        <div class="name">
          宝宝煎米果 · 校园管理系统
        </div>
        <el-form :model="form" :ref="form">
          <el-form-item label="用户名">
              <el-input type="text" v-model="form.login_name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="密码">
              <el-input type="password" v-model="form.password" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="" id='submit'>
              <el-button type="primary" @click="login">登陆</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      form: {}
    }
  },
  methods: {
    login () {
      var that = this
      this.$axios.post('/admin/login', {
        login_name: this.form.login_name,
        password: this.form.password
      })
        .then(function (response) {
          window.localStorage.setItem('token', response.data.data.token)
          that.$router.push({path: '/index'})
        })
        .catch(function (error) {
          console.log(error)
          that.$router.push({path: '/index'})
        })
    }
  }
}
</script>

<style scoped>
#login {
  margin: 13% 35% 5% 30%;
  padding: 5%;
  border-radius: 10px;
}
.name {
  text-align: center;
  font-size: 20px;
  margin: 10px;
  font-weight: inherit;
}
#submit {
  text-align: center;
}
</style>
