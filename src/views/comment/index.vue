<template>
<!-- el-card -->
  <el-card style="height:100%;overflow:auto;">
      <!-- 放置面包屑组件 slot="header"给card  -->
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
              <el-button size="small" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
            </template>
          </el-table-column>

      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        // 传参
        params: {
          response_type: 'comment'// 看接口文档传入参数获取对应数据
        }
      }).then(res => {
        this.list = res.data.results
      })
    },
    // 格式化布尔值el-table不能显示布尔值
    formatterBool (row, column, cellValue, index) {
      // row当前行数据，column当前列数据,cellValue当前单元格数据,index当前索引
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style lang='less' scoped>
</style>
