<template>
    <div id="book">
        <div id="search">
          <el-form :model="search_data" ref="search_data" label-width="90px" :inline="true">
            <el-form-item label="馆藏校区：">
             <el-select v-model="search_data.campus" placeholder="请选择校区">
                <el-option label="所有" value="所有"></el-option>
                <el-option label="七里坪校区" value="七里坪校区"></el-option>
                <el-option label="李子园校区" value="李子园校区"></el-option>
                <el-option label="梅子井校区" value="梅子井校区"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="馆藏地址：">
             <el-select v-model="search_data.site" placeholder="请选择地址">
                <el-option label="所有" value="所有"></el-option>
                <el-option label="逸夫图书馆" value="逸夫图书馆"></el-option>
              </el-select>
            </el-form-item>
            <br>
            <el-form-item label="编号查找：">
              <el-input v-model="search_data.id" placeholder="请输入isbn"></el-input>
            </el-form-item>
            <el-form-item label="书名查找：">
              <el-input v-model="search_data.name" placeholder="请输入书名"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div id="content">
          <el-table :data="book_data" style="width: 100%" stripe border>
            <el-table-column type="expand">
              <template slot-scope="scope">
                  <el-form label-position="left" class="book-table-expand">
                    <el-form-item label="出版社：">
                      <span>{{scope.row.public}}</span>
                    </el-form-item>
                    <el-form-item label="图片：">
                      <span><img :src='scope.row.img_url' width="50"></span>
                    </el-form-item>
                    <el-form-item label="馆藏：">
                      <span>{{scope.row.site}}</span>
                    </el-form-item>
                    <el-form-item label="isbn编号">
                      <span>{{scope.row.isbn}}</span>
                    </el-form-item>
                  </el-form>
              </template>
            </el-table-column>
            <el-table-column width="100" label="馆藏编号" prop="id"></el-table-column>
            <el-table-column width="150"  label="馆藏校区" prop="campus"></el-table-column>
            <el-table-column width="150"  label="馆藏地址" prop="labrary"></el-table-column>
            <el-table-column width="200"  label="书名" prop="name"></el-table-column>
            <el-table-column width="120"  label="作者" prop="author"></el-table-column>
            <el-table-column width="100"  label="价格" prop="price"></el-table-column>
            <el-table-column width="80" label="借出" prop="borrow"></el-table-column>
            <el-table-column width="80" label="馆藏" prop="num"></el-table-column>
            <el-table-column width="100" label="操作">
                <template slot-scope="scope">
                  <el-button type="info" size="mini" icon="el-icon-edit" circle @click="addEditDialog(scope.row)"></el-button>
                  <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deleteNode(scope.row)"></el-button>
                </template>
              </el-table-column>
          </el-table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'book',
  data () {
    return {
      search_data: {
        campus: '所有'
      },
      book_data: [{
        id: 'I234242',
        isbn: '9787121302954',
        name: '计算机网络（第7版）',
        author: '谢希仁',
        price: 49.00,
        public: '电子工业出版社',
        img_url: require('../../assets/img1.jpg'),
        campus: '七里坪校区',
        labrary: '逸夫图书馆',
        site: '七楼文学馆',
        num: 5,
        borrow: 2
      }, {
        id: '1',
        isbn: '9787121302954',
        name: '计算机网络（第7版）',
        author: '谢希仁',
        price: 49.00,
        public: '电子工业出版社',
        img_url: require('../../assets/img1.jpg'),
        campus: '七里坪校区',
        labrary: '逸夫图书馆',
        site: '七楼文学馆',
        num: 5,
        borrow: 2
      }, {
        id: '1',
        isbn: '9787121302954',
        name: '计算机网络（第7版）',
        author: '谢希仁',
        price: 49.00,
        public: '电子工业出版社',
        img_url: require('../../assets/img1.jpg'),
        campus: '七里坪校区',
        labrary: '逸夫图书馆',
        site: '七楼文学馆',
        consolenum: 5,
        borrow: 2
      }]
    }
  },
  methods: {
    find () {
      console.log(this.search_data)
    },
    addEditDialog (data) {

    },
    deleteNode (data) {

    }
  }
}
</script>

<style scoped>
#search {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
