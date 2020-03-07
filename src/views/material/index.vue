<template>
        <el-card v-loading="loading" style="background: rgba(255, 255, 255, .5);">
            <bread-crumb slot="header">
                <template slot="title">素材列表</template>
            </bread-crumb>
            <!-- 添加素材 -->
            <el-row type="flex" justify="end">
                <!-- :show-file-list是否显示已上传文件列表 , :http-request覆盖默认上传实现自定义-->
                <el-upload :show-file-list="false" :http-request="uploadfile" action="">
                    <el-button size="small" type="primary">添加素材</el-button>
                </el-upload>
            </el-row>
            <!-- 标签页 v-model绑定的值就当前选中的-->
            <el-tabs v-model="activeName" @tab-click="changeTab">
                <!-- 全部 -->
                <el-tab-pane label="全部素材" name="all" >
                    <div class="img-list">
                         <!-- 循环生成页面结构 -->
                        <el-card :body-style="{ padding: '0' }"
                         class="img-card" v-for="item in list" :key="item.id">
                            <img :src="item.url" alt="">
                            <el-row class="operate"
                            style="height:35px;border-radius:0 0 15px 15px;" type="flex"
                            justify="space-around" align="middle">
                                <i @click="collectFile(item)" class="el-icon-star-on"></i>
                                <i @click="delFile(item)" class="el-icon-delete-solid"></i>
                            </el-row>
                        </el-card>
                    </div>
                </el-tab-pane>
                <!-- 收藏 -->
                <el-tab-pane label="收藏素材" name="collect">
                    <div class="img-list">
                        <el-card
                          :body-style="{ padding: '5px' }"
                          style="height:150px"
                          class="img-card"
                          v-for="item in list"
                          :key="item.id">
                        <img :src="item.url" alt="" style="height:100%;border-radius:15px;">
                        </el-card>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <!-- 分页 -->
            <el-row style="height:60px" type="flex" justify="space-around" align="middle">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page="page.currentPage"
                    :page-size="page.pageSize"
                    :total="page.total"
                    @current-change="changePage"
                    >
                </el-pagination>
            </el-row>
        </el-card>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'all',
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      list: []
    }
  },
  methods: {
    getMaterial () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect', // 判断true或者false
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }

      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    },
    changeTab () {
      this.getMaterial()
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    uploadfile (params) {
      // params为自定义上传参数对象{} params.file为请求参数
    //   debugger
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getMaterial()
        this.$message.success('上传素材成功')
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    },
    // 收藏
    collectFile (row) {
      this.$axios({}).then(() => {}).catch(() => {})
    },
    // 删除
    delFile (row) {
      this.$axios({}).then(() => {}).catch(() => {})
    }

  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
    .img-list{
            display: flex;
            flex-wrap: wrap;
            .img-card{
                display: flex;
                width: 200px;
                height: 180px;
                border: none;
                border-radius: 20px;
                margin: 20px 30px;
                background: rgba(0, 0, 0, .1);
                box-sizing: border-box;
            img{
                width: 200px;
                height:135px;
                cursor: pointer;
                border-radius: 20px 20px 0 0;
                }
            i{
                font-size: 30px;
                cursor: pointer;
            }
            i:nth-child(2){
                 font-size: 24px;
            }
            }

        }
</style>
