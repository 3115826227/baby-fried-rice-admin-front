<template>
    <div id="login">
        <div class="name">
          宝宝煎米果 · 校园管理系统
        </div>
        <el-form :model="form" :ref="form" label-width="70px">
          <el-form-item label="用户名">
              <el-input type="text" v-model="form.login_name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="密码">
              <el-input type="password" v-model="form.password" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="学校">
            <el-select @change="selectSchoolId($event)" v-model="form.school_id" placeholder="使用状态">
              <el-option v-for="item in school" :value="item.id" :label="item.name" :key="item.id"></el-option>
            </el-select>
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
      form: {},
      school: []
    }
  },
  created () {
    this.getSchools()
  },
  methods: {
    login () {
      var that = this
      this.$axios.post('/admin/login', {
        login_name: this.form.login_name,
        password: this.form.password,
        school_id: this.form.school_id
      })
        .then(function (response) {
          if (response.data.code === 0) {
            window.localStorage.setItem('token', response.data.data.token)
            window.localStorage.setItem('super', response.data.data.user_info.is_super)
            that.$router.push({path: '/index'})
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    selectSchoolId (data) {
      console.log(data)
    },
    getSchools () {
      var that = this
      this.$axios.get('/user/school')
        .then(function (response) {
          that.school = response.data.data
          console.log(that.school)
        })
        .catch(function (error) {
          console.log(error)
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
  background-color: #E9EEF3;
}
.name {
  text-align: center;
  font-size: 20px;
  margin: 10px;
  font-weight: inherit;
  margin-bottom: 50px;
}
#submit {
  text-align: center;
}
</style>
