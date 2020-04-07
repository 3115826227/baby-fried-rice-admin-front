<template>
    <div id='student'>
        <div id="org">
          <el-table :data="org_list" row-key="id" class="el-table_header"
          border default-expand-all  highlight-current-row
           max-height="900" @current-change="handleCurrentChange"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column prop="label" label="院系"></el-table-column>
          </el-table>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div id="student-content">
          <div id="studnet-search">
            <el-form :inline="true" :model="search_data" class="search-form-line">
            <el-form-item label="姓名：">
              <el-input v-model="search_data.label" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model="search_data.status" placeholder="使用状态">
                <el-option label="所有" value="all"></el-option>
                <el-option label="已认证" value="true"></el-option>
                <el-option label="未认证" value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button type="primary" @click="addNewDialog">添加</el-button>
            </el-form-item>
            </el-form>
          </div>
          <div id="student-table">
            <el-table :data="student" row-key="number" class="el-table_hader" stripe border>
              <el-table-column width="120" label="学号" prop="number"></el-table-column>
              <el-table-column width="80" label="姓名" prop="name"></el-table-column>
              <el-table-column width="100" label="状态" prop="verify"></el-table-column>
              <el-table-column width="180" label="身份证号" prop="identify"></el-table-column>
              <el-table-column width="120" label="手机号" prop="phone"></el-table-column>
              <el-table-column width="180" label="更新时间" prop="update_time"></el-table-column>
              <el-table-column width="100" label="操作">
                <template slot-scope="scope">
                  <el-button type="info" size="mini" icon="el-icon-edit" circle @click="addEditDialog(scope.row)"></el-button>
                  <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deleteNode(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <el-dialog
          title="新增学生"
          :visible.sync="newDialogVisible"
          width="50%" height="50%">
          <template class="dialog-form">
            <el-form :model="new_form" label-width="20%" label-position="right">
              <el-form-item label="院系名称：">
                <el-input v-model="new_form.label" disabled></el-input>
              </el-form-item>
              <el-form-item label="学号">
                <el-input v-model="new_form.number"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="new_form.name"></el-input>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-input v-model="new_form.identify"></el-input>
              </el-form-item>
            </el-form>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button @click="newDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'student',
  data () {
    return {
      search_data: {
        label: '',
        status: 'all'
      },
      org_list: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      current_org: null,
      student: [],
      new_form: {},
      newDialogVisible: false
    }
  },
  created () {
    this.getOrg()
  },
  methods: {
    getOrg () {
      var that = this
      this.$axios.get('/account/admin/school/organize', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          that.org_list = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    handleCurrentChange (val) {
      this.current_org = val
      this.getStudent()
    },
    search () {
      this.getStudent()
    },
    getStudent () {
      var that = this
      this.$axios.get('/account/admin/school/student?id=' + that.current_org.id + '&label=' + that.search_data.label + '&status=' + that.search_data.status, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          that.student = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    addNewDialog () {
      console.log(this.current_org)
      if (this.current_org === null) {
        this.$message.error('请先选择一个院系')
      } else {
        this.new_form.label = this.current_org.label
        this.newDialogVisible = true
      }
    },
    add () {
      console.log(this.new_form)
      var that = this
      var obj = {
        organize: that.current_org.id,
        name: that.new_form.name,
        identify: that.new_form.identify,
        number: that.new_form.number,
        verify: that.new_form.verify
      }
      this.$axios.post('/account/admin/school/student', obj, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          if (response.data.code === 0) {
            that.getStudent()
            that.$message.success('添加成功')
          } else {
            that.$message.error('添加失败')
          }
          that.addNewDialog = false
        })
        .catch(function (error) {
          that.$message.error('添加失败')
          console.log(error)
          that.addNewDialog = false
        })
    }
  }
}
</script>

<style scoped>
#student {
  float: left;
  margin-top:20px;
}
#org {
  float: left;
  width: 20%;
  margin-right: 10px;
}
#student-content {
  float: left;
}
#org .el-table {
  border-radius: 8px;
  width: 400px;
}
.el-divider {
  float: left;
  height: 750px;
  margin-top: 5px;
  background-color: black;
  margin-right: 15px;
}
.search-form-line {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
.search-form-line .el-form-item {
  padding-right: 20px;
}
#student-table .el-table {
  border-radius: 8px;
}
</style>
