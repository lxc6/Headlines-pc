<template>
  <el-tabs v-model="activeName">
      <!-- 素材库 -->
    <el-tab-pane label="素材库" name="material">
        <!-- 素材查询 -->
        <div class="box">
            <el-card v-for="item in list" :key="item.id" class="img-card" :body-style="{ padding: '0' }">
                <img @click="clickImg(item.url)" :src="item.url" alt="">
            </el-card>
        </div>
        <!-- 分页 -->
        <el-row style="height:60px" type="flex" justify="center" align="middle">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="page.total"
              :current-page="page.currentPage"
              :page-size="page.pageSize"
              @current-change="changePage"
              >
            </el-pagination>
        </el-row>
    </el-tab-pane>
    <!-- 上传 -->
    <el-tab-pane label="上传素材" name="upload">
        <!-- 上传组件  http-request自定义上传-->
        <el-upload action="" :show-file-list="false" class="upload" :http-request="uploadImage">
            <i class="el-icon-plus"></i>
        </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 当前激活的变量
      list: [],
      page: {
        total: 1,
        currentPage: 1,
        pageSize: 8
      }

    }
  },
  methods: {
    //   自定义上传
    uploadImage (params) {
      // params为自定义上传参数对象{} params.file为请求参数
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        // 上传成功后将url向父传递
        this.$emit('selectImage', res.data.url)
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    },
    //   子向父传值
    clickImg (url) {
      this.$emit('selectImage', url)
    },
    //   页数变化
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    //   获取
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        // debugger
        this.list = res.data.results
        this.page.total = res.data.total_count
      }).catch(() => {
        this.$message.error('获取素材失败')
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card{
        display: flex;
        width: 180px;
        height: 150px;
        border-radius: 20px;
        margin: 10px;
    img{
        width: 100%;
        height:100%;
        border-radius: 20px;
        cursor: pointer;
        }
}
.upload{
    display: flex;
    justify-content: center;
    .el-icon-plus{
        width: 150px;
        height: 150px;
        line-height: 150px;
        border: 2px dashed #ccc;
        border-radius: 10px;
        font-size: 30px;
        user-select: none;
        cursor: pointer;
    }
}
}
</style>
