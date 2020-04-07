<template>
    <div id='organize'>
        <div id="search">
          <el-form :inline="true" :model="search_data" class="demo-form-inline">
            <el-form-item label="院系：">
              <el-input v-model="search_data.label" placeholder="院系"></el-input>
            </el-form-item>
            <el-form-item label="使用状态：">
              <el-select v-model="search_data.status" placeholder="使用状态">
                <el-option label="所有" value="all"></el-option>
                <el-option label="正常" value="true"></el-option>
                <el-option label="停用" value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div id='orgTree'>
          <el-table :data="data" row-key="id" class="el-table_header"
          border default-expand-all stripe
           max-height="540"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column width="280" prop="label" label="院系"></el-table-column>
            <el-table-column width="150" prop="count" label="学生人数"></el-table-column>
            <el-table-column width="220" prop="status" label="使用状态">
              <template slot-scope="scope">
                <el-switch
                  style="display: block"
                  v-model="scope.row.status"
                  @change="handleUpdate(scope.$index, scope.row)"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="正常"
                  inactive-text="停用">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column width="200" prop="update_time" label="更新时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" round @click="addNewDialog(scope.row)">新增</el-button>
                <el-button type="info" size="mini" icon="el-icon-edit" circle @click="addEditDialog(scope.row)"></el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deleteNode(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog
          title="新增院系"
          :visible.sync="newDialogVisible"
          width="50%" height="50%">
          <template class="dialog-form">
            <el-form :model="new_form" label-width="20%" label-position="right">
              <el-form-item label="上级院系：">
                <el-input v-model="new_form.parent_label" disabled></el-input>
              </el-form-item>
              <el-form-item label="院系名称：">
                <el-input v-model="new_form.label"></el-input>
              </el-form-item>
              <el-form-item label="使用状态：" style="text-align:left">
                <el-radio-group v-model="new_form.status">
                  <el-radio label="true">正常</el-radio>
                  <el-radio label="false">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button @click="newDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addNode">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="修改院系"
          :visible.sync="editDialogVisible"
          width="50%" height="50%">
          <template class="dialog-form">
            <el-form :model="edit_form" label-width="20%" label-position="right">
              <el-form-item label="上级院系：">
                <el-input v-model="edit_form.parent_label" disabled></el-input>
              </el-form-item>
              <el-form-item label="院系名称：">
                <el-input v-model="edit_form.label"></el-input>
              </el-form-item>
            </el-form>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editNode">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'oranize',
  data () {
    return {
      search_data: {
        label: '',
        status: 'all'
      },
      newDialogVisible: false,
      editDialogVisible: false,
      new_form: {},
      parent_node: {},
      edit_form: {},
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
          that.data = response.data.data
          console.log(that.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    handleNodeClick (data) {
      console.log(data)
    },
    addNewDialog (node) {
      this.newDialogVisible = true
      this.new_form.school_id = node.school_id
      this.new_form.parent_id = node.id
      this.new_form.parent_label = node.label
      this.new_form.status = 'true'
    },
    addEditDialog (node) {
      this.editDialogVisible = true
      this.edit_form = node
      this.edit_form.parent_id = node.parent_id
      this.findNode(node.parent_id, this.data)
      this.edit_form.parent_label = this.parent_node.label
      this.parent_node = {}
    },
    addStopDialog (node) {
      this.stopDialogVisible = true
    },
    addNode () {
      var that = this
      var obj = {
        school_id: that.new_form.school_id,
        label: that.new_form.label,
        parent_id: that.new_form.parent_id,
        status: that.new_form.status
      }
      console.log(obj)
      this.$axios.post('/account/admin/school/organize', obj, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          if (response.data.code === 0) {
            that.getOrg()
            that.newDialogVisible = false
            that.$message.success('添加成功')
          } else {
            that.newDialogVisible = false
            that.$message.error('添加失败')
          }
        })
        .catch(function (error) {
          that.newDialogVisible = false
          that.$message.error('添加失败')
          console.log(error)
        })
    },
    editNode () {
      var that = this
      console.log(that.edit_form)
      var obj = {
        id: that.edit_form.id,
        label: that.edit_form.label
      }
      this.$axios.put('/account/admin/school/organize', obj, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          if (response.data.code === 0) {
            that.getOrg()
            that.editDialogVisible = false
            that.$message.success('修改成功')
          } else {
            that.editDialogVisible = false
            that.$message.error('修改失败')
          }
        })
        .catch(function (error) {
          that.editDialogVisible = false
          that.$message.error('修改失败')
          console.log(error)
        })
    },
    deleteNode (node) {
      var that = this
      this.$confirm('是否确认此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/account/admin/school/organize?id=' + node.id, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(function (response) {
            if (response.data.code === 0) {
              that.getOrg()
              that.$message.success('删除成功！')
            } else {
              that.$message.error('删除失败！')
            }
          })
          .catch(function (error) {
            that.$message.error('删除失败！')
            console.log(error)
          })
      }).catch(() => {
        that.$message.info('取消操作！')
      })
    },
    stopNode () {
      this.stopDialogVisible = false
    },
    findNode (id, data) {
      for (var i = 0; i < data.length; i++) {
        if (String(data[i].id) === id) {
          this.parent_node = data[i]
        }
        if (data[i].children != null) {
          this.findNode(id, data[i].children)
        }
      }
    },
    search () {
      var that = this
      this.$axios.get('/account/admin/school/organize?label=' + that.search_data.label + '&status=' + that.search_data.status, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          if (response.data.code === 0) {
            that.data = response.data.data
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    handleUpdate (index, node) {
      var that = this
      let msg = ''
      let flag
      if (node.status === false) {
        msg = '停用'
        flag = 'false'
      } else {
        msg = '开启'
        flag = 'true'
      }
      console.log(flag)
      this.$confirm('是否确认此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {
          id: node.id,
          status: flag
        }
        that.$axios.put('/account/admin/school/organize/status', obj, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(function (response) {
            if (response.data.code === 0) {
              that.getOrg()
              that.$message.success(msg + '成功')
            } else {
              this.$message.error(msg + '失败！')
            }
          })
          .catch(function (error) {
            this.$message.error(msg + '失败！')
            console.log(error)
          })
      }).catch(() => {
        this.$message.info('取消操作！')
      })
    }
  }
}
</script>

<style scoped>
#organize {
  padding: 20px 30px 5px 20px;
}
#search {
  text-align: left;
  padding-top: 20px;
  height: 100px;
}
.el-form-item {
  margin-right: 40px;
}
.dialog-form {
  text-align: left;
}
</style>
