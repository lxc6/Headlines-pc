<template>
<div>
  <el-card class="screen">
      <bread-crumb slot="header">
      <template slot="title">内容列表</template>
      </bread-crumb>
      <el-form style="padding-left:50px">
          <!-- 文章状态 -->
          <el-form-item  label="文章状态: ">
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
              <el-select  v-model="myForm.channel_id" placeholder="请选择频道">
                  <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name">

                  </el-option>
              </el-select>
          </el-form-item>
          <!-- 时间选择 -->
          <el-form-item label="时间选择: ">
              <el-date-picker v-model="myForm.dateRange" range-separator="至"
              type="daterange" start-placeholder="开始日期"
               end-placeholder="结束日期">
              </el-date-picker>
          </el-form-item>
      </el-form>
  </el-card>
  <!-- 筛选内容 -->
  <el-card class="screen">
      <el-row class="top">共找到<span style="color:orange">{{count}}</span>条符合条件的内容</el-row>
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
              <span><i class="el-icon-edit"></i> 编辑</span>
              <span><i class="el-icon-delete"></i> 删除</span>
          </el-col>
      </el-row>
  </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      count: '',
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
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 获取文章列表数据
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(res => {
        this.count = res.data.total_count// 文章总数
        this.list = res.data.results
      })
    }

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
