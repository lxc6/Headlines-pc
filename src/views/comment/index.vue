<template>
<!-- el-card v-loading实现加载状态-->
  <el-card v-loading="loading" style="height:100%;overflow:auto;">
      <!-- 放置面包屑组件    插槽header为一条分割线   -->
      <bread-crumb slot="header">
      <!-- 具名插槽 slot="title" 给bread-->
        <template slot="title">评论管理</template>
      </bread-crumb>
      <!-- 表格组件 -->
      <el-table :data="list" style="">
        <!-- prop表示字段 label标示表头 -->
          <el-table-column width="650" prop="title" label="标题"></el-table-column>
          <!-- 给该列 formatter属性转换布尔值 -->
          <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
          <el-table-column  label="操作">
            <!-- 可继续放组件 子组件使用作用域插槽的属性 element内部定义的插槽属性-->
            <template slot-scope="obj">
              <el-button size="small"  type="text">修改</el-button>
              <!-- 根据状态显示与隐藏 obj.row该行的数据-->
              <el-button @click="openOrClose(obj.row)"
               size="small" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
            </template>
          </el-table-column>
      </el-table>
        <!-- 分页 -->
          <el-row type="flex" style="height:80px" align="middle" justify="center">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page="page.currentPage"
              :page-size="page.Pagesize"
              :total="page.total"
              @current-change="changePage"
              ></el-pagination>
          </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      page: {
        total: 0, // 总条数
        currentPage: 1, // 当前页码
        pageSize: 10// 每页多少条
      },
      list: []
    }
  },
  methods: {
    getComment () {
      this.loading = true// 请求显示之前打开遮罩
      this.$axios({
        url: '/articles',
        // 传参
        params: {
          response_type: 'comment', // 看接口文档传入参数获取对应数据
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false // 请求完成关闭遮罩
      })
    },
    // 格式化布尔值el-table不能显示布尔值
    formatterBool (row, column, cellValue, index) {
      // row当前行数据，column当前列数据,cellValue当前单元格数据,index当前索引
      return cellValue ? '正常' : '关闭'
    },
    openOrClose (row) {
      const msg = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否确定${msg}评论`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          // query传参
          // params: { article_id: row.id}, // 文章id
          params: { article_id: row.id.toString() }, // 将数字类型转化为字符串解决大数字问题
          // body传参
          data: {
            allow_comment: !row.comment_status// 状态要与当前状态相反
          }
        }).then(() => {
          // 弹消息 重新拉取数据
          this.$message.success(`${msg}评论成功`)
          this.getComment()
        }).catch(() => {
          this.$message.error(`${msg}评论失败`)
        })
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style lang='less' scoped>
</style>
