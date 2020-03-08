<template>
<div>
  <el-card class="screen">
      <bread-crumb slot="header">
      <template slot="title">内容列表</template>
      </bread-crumb>
      <el-form style="padding-left:50px">
          <!-- 文章状态 -->
          <el-form-item  label="文章状态: ">
             <!-- 统一用watch监听不用change  @change="connect"-->
              <el-radio-group v-model="myForm.status">
                <el-radio :label="5" >全部</el-radio>
                <el-radio :label="0" >草稿</el-radio>
                <el-radio :label="1" >待审核</el-radio>
                <el-radio :label="2" >审核通过</el-radio>
                <el-radio :label="3" >审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 频道列表 -->
          <el-form-item label="频道列表: ">
             <!-- 统一用watch监听不用change  @change="connect"-->
              <el-select v-model="myForm.channel_id" placeholder="请选择频道">
                  <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name">

                  </el-option>
              </el-select>
          </el-form-item>
          <!-- 时间选择 -->
          <el-form-item label="时间选择: ">
            <!-- connect返回的时间格式有问题需要用value-format改变格式 -->
            <!-- 统一用watch监听不用change  @change="connect"-->
              <el-date-picker  value-format="yyyy-MM-dd"  v-model="myForm.dateRange" range-separator="至"
              type="daterange" start-placeholder="开始日期"
               end-placeholder="结束日期">
              </el-date-picker>
          </el-form-item>
      </el-form>
  </el-card>
  <!-- 筛选内容 -->
  <el-card class="screen">
      <el-row class="top">共找到<span style="color:orange">{{count}}</span>条符合条件的内容</el-row>
      <!-- 文章 -->
      <el-row v-for="item in list" :key="item.id.toString()"
       class="row" type="flex" justify="space-between" align="middle" >
      <!-- 左 -->
          <el-col :span="12">
              <!-- 左左 -->
              <el-col :span="8">
                  <img style="width:200px;height:120px"
                  :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt="">
              </el-col>
              <!-- 左右 -->
              <el-col :span="16" class="text">
                  <h3>{{item.title}}</h3>
                  <el-button size="small" style=""
                   :type="item.status|filterType" plain>
                      {{item.status|filterStatus}}
                      </el-button>
                  <p>{{item.pubdate}}</p>
              </el-col>
          </el-col>
          <!-- 右 -->
          <el-col :span="12" style="text-align:right" class="right">
              <span @click="editArticles(item.id.toString())"><i class="el-icon-edit"></i> 编辑</span>
              <span @click="delArticles(item.id.toString())"><i class="el-icon-delete"></i> 删除</span>
          </el-col>
      </el-row>
      <!-- 分页 -->
      <el-row type="flex" justify="center" style='height:80px' align="middle">
        <!-- @current-change="changePage"监听当前页面变化 -->
           <el-pagination
           :current-page="page.currentPage"
           :page-size="page.pageSize"
           :total="page.total"
           @current-change="changePage"
           background  layout='prev,pager,next'>
           </el-pagination>
      </el-row>
  </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      count: '',
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 接口要求每页 10-50条之间
        total: 0 // 总数
      },
      myForm: {
        status: 5,
        channel_id: null, // 传接口时id为null表示全部频道
        dateRange: []// 时间范围数据
      },
      channels: [], // 频道数据
      list: [], // 文章数据
      defaultImg: require('../../assets/0014.gif')// 将默认图片地址转换为变量
    }
  },
  watch: {
    myForm: {
      deep: true, // 深度检测数据变化
      handler () { // 数据变化就会触发
      // 统一调用改变条件的方法
        this.page.currentPage = 1 // 只要筛选条件变化 就变成第一页
        this.connect()// 渲染总放在最后 条件满足后
      }
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'// 草稿
        case 1:
          return 'info'// 待审核
        case 2:
          return 'success'// 已发表
        case 3:
          return 'danger'// 失败
      }
    }

  },
  methods: {
    // 分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.connect()
    },
    // 数据与筛选连接
    connect () {
      const params = {
        // 分页参数
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        // 筛选参数
        status: this.myForm.status === 5 ? null : this.myForm.status, // 判断频道为null和其他
        channel_id: this.myForm.channel_id,
        // 先判空再判断长度
        begin_pubdate: this.myForm.dateRange ? this.myForm.dateRange[0] : null,
        end_pubdate: this.myForm.dateRange && this.myForm.dateRange.length > 1 ? this.myForm.dateRange[1] : null
      }
      this.getArticles(params)
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 获取文章列表数据
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params// 根据传不传参来实现筛选显示
      }).then(res => {
        this.count = res.data.total_count// 文章总数
        this.page.total = res.data.total_count
        this.list = res.data.results
      })
    },
    delArticles (id) {
      this.$confirm('你确定要删除该文章吗？', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id}`
        }).then(() => {
          // this.getArticles() 筛选条件会被刷新
          // 应该带着条件和页码去加载
          this.connect()
          this.$message.success('删除成功')
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    editArticles (id) {}

  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
.screen{
    padding: 0;
    margin-top:10px;
    background: rgba(255, 255, 255, .3);
    .top{
        height: 60px;
        font-size: 18px;
        line-height: 60px;
        border-bottom:1px dashed #ccc;
    }
    .row{
        height:150px;
        padding:10px;
        border-bottom:1px solid #ccc;
        .text{
            h3{
            padding: 10px 0;
            }
            p{
            padding: 15px 0;
            font-size: 12px;
            }
        }
        .right{
            height: 100%;
            padding-top: 20px;
            vertical-align: top;
            span{
                padding-left: 20px;
                font-size: 12px;
                cursor: pointer;
                user-select: none;
            }
        }
    }

}

</style>
