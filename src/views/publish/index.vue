<template>
  <el-card>
      <!-- 面包屑 -->
      <bread-crumb slot="header">
      <template slot="title">发布文章</template>
      </bread-crumb>
      <!-- 表单 -->
      <el-form ref="publishForm" label-width="80px" :model="myForm" :rules="rules">
        <!-- 标题 -->
        <el-form-item label="标题:" prop="title">
          <el-input style="width:300px" v-model="myForm.title" placeholder="文章名称" type="text"></el-input>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item label="内容:" prop="content">
          <!-- 富文本组件 -->
          <quill-editor style="height:300px" v-model="myForm.content" ></quill-editor>
          <!-- <el-input  style="width:80%" v-model="myForm.content" placeholder="文章名称" type="textarea"></el-input> -->
        </el-form-item>
        <!-- 封面 -->
        <el-form-item label="封面:" prop="cover" style="margin-top:80px">
          <!-- 单选框 -->
          <el-radio-group v-model="myForm.cover.type">
           <el-radio :label="1">单图</el-radio>
           <el-radio :label="3">三图</el-radio>
           <el-radio :label="0">无图</el-radio>
           <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 上传图片 -->
          <el-upload action="#" v-model="myForm.cover.images" list-type="picture-card" style="" multiple >
              <!-- <span>点击图标选择图片</span> -->
            <i class="el-icon-picture-outline"></i>
          </el-upload>
        </el-form-item>
         <!-- 频道 -->
        <el-form-item label="频道:" prop="channel_id">
          <el-select v-model="myForm.channel_id" placeholder="请选择" style="width:300px">
            <el-option
            v-for="item in channels"
            :key="item.id"
            :value="item.id"
            :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 发布 -->
        <el-divider></el-divider>
        <el-form-item label="发布:">
          <el-button @click="publish(false)" type="primary">发布文章</el-button>
          <el-button @click="publish(true)" type="warning">存入草稿</el-button>
        </el-form-item>
      </el-form>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      myForm: {
        title: '',
        content: '',
        cover: {
          type: 0, // type对应images  type为0 -- images为空
          images: []
        },
        channel_id: null
      },
      channels: [],
      rules: {
        // trigger: 'blur' 离开焦点再效验
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
          { min: 5, max: 30, message: '标题应为5-30个字符' }
        ],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        // cover: [{ required: true, message: '' }],//cover一直存在不为空
        channel_id: [{ required: true, message: '频道不能为空', trigger: 'blur' }]
      }

    }
  },
  methods: {
    // 获取文章
    getArticles (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(res => {
        this.myForm = res.data
      })
    },
    // 效验 发布 修改
    publish (draft) {
      // 手动效验完毕后
      this.$refs.publishForm.validate().then(() => {
        // 添加发布文章
        const { articleId } = this.$route.params
        this.$axios({
          method: articleId ? 'put' : 'post', // 根据场景判断请求方式
          url: articleId ? `/articles/${articleId}` : '/articles', // 动态路由传值
          params: { draft }, // es6不能去除大括号
          data: this.myForm
        }).then(() => {
          this.$message.success('操作成功')
          // 发布成功跳转页面
          this.$router.push('/home/articles')// 跳转到文章列表
        }).catch(() => {
          this.$message.error('操作失败')
        })
      })// 手动效验
    },
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
    const { articleId } = this.$route.params// 获取id的对象 解构赋值 获取i
    articleId && this.getArticles(articleId)// 判断id存在时执行获取文章数据
  }
}
</script>

<style lang='less' scoped>

</style>
