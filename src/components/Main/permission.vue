<template>
    <div id='permission'>
        <div id="permissionNav">
          <el-table ref="multipleTable" :data="permissions"
          border default-expand-all
           max-height="900"  @selection-change="handleSelectionChange"
           :row-class-name="tableRowClassName">
          <el-table-column width="150px" label="访问权限">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column width="400px" label="操作权限">
            <template slot-scope="scope">
              <el-checkbox-group v-model="visit" @change="getVisitValue()">
                <el-checkbox  v-for="item in scope.row.children" :key="item.id" :label="item.id" :disabled="item.disabled" :checked="item.checked">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="55"></el-table-column>
          </el-table>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div id="role">
          <el-table :data="roles"  @current-change="handleCurrentRoleChange">
            <el-table-column width="300px" label="角色" prop="name"></el-table-column>
          </el-table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'permission',
  data () {
    return {
      permissions: [],
      roles: [],
      permission_select: [],
      role_select: {},
      visit: []
    }
  },
  created () {
    this.getPermission()
    this.getRole()
  },
  methods: {
    getPermission () {
      var that = this
      this.$axios.get('/user/admin/permission')
        .then(function (response) {
          that.permissions = response.data.data
          for (var i = 0; i < that.permissions.length; i++) {
            for (var j = 0; j < that.permissions[i].children.length; j++) {
              that.permissions[i].children[j].checked = false
              that.permissions[i].children[j].disabled = true
            }
          }
          console.log(that.permissions)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getRole () {
      var that = this
      this.$axios.get('/account/admin/role', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          that.roles = response.data.data
          console.log(that.roles)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    tableRowClassName (row) {
      row.row.rowIndex = row.rowIndex
    },
    handleSelectionChange (val) {
      this.permission_select = val
      var mp = new Map()
      var i
      // console.log(this.permission_select)
      for (i = 0; i < this.permissions.length; i++) {
        mp.set(this.permissions[i].id, false)
      }
      for (i = 0; i < this.permission_select.length; i++) {
        if (mp.get(this.permission_select[i].id) === false) {
          mp.set(this.permission_select[i].id, true)
        }
      }
      for (i = 0; i < this.permissions.length; i++) {
        var j
        if (mp.get(this.permissions[i].id) === true) {
          for (j = 0; j < this.permissions[i].children.length; j++) {
            this.permissions[i].children[j].disabled = false
          }
        } else {
          for (j = 0; j < this.permissions[i].children.length; j++) {
            this.permissions[i].children[j].disabled = true
            this.permissions[i].children[j].checked = false
          }
        }
      }
      // console.log(this.permission_select)
    },
    handleCurrentRoleChange (val) {
      this.role_select = val
      var that = this
      if (that.role_select.name === '管理员') {
        for (var i = 0; i < that.permissions.length; i++) {
          for (var j = 0; j < that.permissions[i].children.length; j++) {
            that.permissions[i].children[j].checked = true
            that.permissions[i].children[j].disabled = true
          }
        }
        that.toggleSelection()
        that.toggleSelection(that.permissions)
        return null
      }
      var data = {
        role_id: that.role_select.id
      }
      this.$axios.get('/account/admin/permission', {
        params: data,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          var p = []
          for (var i = 0; i < that.permissions.length; i++) {
            for (var j = 0; j < response.data.data.length; j++) {
              if (that.permissions[i].id === response.data.data[j].id) {
                p.push(that.permissions[i])
              }
            }
          }
          that.toggleSelection()
          that.toggleSelection(p)
          that.handleSelectionChange(p)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getVisitValue () {
      var mp = new Map()
      var i
      for (i = 0; i < this.permissions.length; i++) {
        var j
        if (this.permissions[i].disabled) {
          for (j = 0; j < this.permissions[i].children.length; j++) {
            mp[this.permissions[i].children[j].id] = false
          }
        } else {
          for (j = 0; j < this.permissions[i].children.length; j++) {
            mp[this.permissions[i].children[j].id] = true
          }
        }
      }
      var list = []
      for (i = 0; i < this.visit.length; i++) {
        console.log(mp[this.visit[i]])
        if (mp[this.visit[i]]) {
          list.push(this.visit[i])
        }
      }
      this.visit = list
      console.log(this.visit)
    }
  }
}
</script>

<style scoped>
#permission {
  margin-top: 20px;
  float: left;
  width: 100%;
}
#permissionNav {
  float: left;
  width: 605px;
  margin-right: 20px;
}
#role {
  float: left;
  margin-left: 20px;
}
.el-divider {
  float: left;
  height: 750px;
  margin-top: 5px;
  background-color: black;
  margin-right: 15px;
}
</style>
