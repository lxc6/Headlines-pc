<template>
  <el-card class="card">
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>
        <div class="box">
            <el-form ref="accountForm"  label-width="100px" :model="myForm" :rules="rules" class="form">
            <!-- 用户名 -->
            <el-form-item label="用户名:" prop="name">
                <el-input v-model="myForm.name" style="width:80%"></el-input>
            </el-form-item >
            <!-- 简介 -->
            <el-form-item label="简介:" >
                <el-input v-model="myForm.intro" style="width:80%"></el-input>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item label="邮箱:" prop="email">
                <el-input v-model="myForm.email" style="width:80%"></el-input>
            </el-form-item>
            <!-- 手机号 -->
            <el-form-item label="手机号:">
                <el-input  v-model="myForm.mobile" style="width:80%;" :disabled="true"></el-input>
            </el-form-item>
            <!-- 保存 -->
            <el-form-item>
                <el-button @click="saveUser" class="btn" type="success">保存</el-button>
            </el-form-item>
        </el-form>
         <!-- 头像 -->
          <div class="port">

             <el-upload action=""
               :show-file-list="false"
               :http-request="userImage">
               <img :src="myForm.photo?myForm.photo:defaultImg" alt="" class="img">
               <span><i class="el-icon-edit"></i>  更换头像</span>
               </el-upload>

          </div>
        </div>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/1.png'),
      myForm: {
        id: '',
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 7, message: '长度为一到七位字符', trigger: 'blur' }
        ],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    //   上传头像 自定义
    userImage (params) {
      const data = new FormData()
      data.append('photo', params.file)// params.file就是选择的文件
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data
      }).then(res => {
        this.myForm.photo = res.data.photo
        this.$message.success('修改成功')
      }).catch(() => {
        this.$message.error('修改失败')
      })
    },
    //  保存时 手动效验
    saveUser () {
      this.$refs.accountForm.validate().then(() => {
        // 编辑
        this.$axios({
          method: 'patch',
          url: '/user/profile',
          data: this.myForm
        }).then(() => {
          this.getAccount()
          this.$message.success('修改成功')
        }).catch(() => {
          this.$message.error('修改失败')
        })
      })
    },

    // 获取信息
    getAccount () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.myForm = res.data
      }).catch(() => {
        this.$message.error('获取信息失败')
      })
    }
  },
  created () {
    this.getAccount()
  }
}
</script>

<style lang="less" scoped>
.card{
   background-color: rgba(255, 255, 255, .4);
  .box{
    display: flex;
    justify-content:space-around;
    .form{
        width: 500px;
        padding: 20px;
        .btn{
          margin-top: 30px;
        }
    }
    .port{
          position: relative;
          width: 260px;
          height: 260px;
          margin-right: 8%;
          text-align: center;
       .img{
            width: 260px;
            height: 260px;
            border-radius: 30px;
        }
        span{
          position: absolute;
          width: 140px;
          border-radius: 20px;
          font-size: 20px;
          color: skyblue;
          left: 0;
          bottom: 15px;
          background-color: rgba(0, 0, 0, .6);
        }

    }
}
}

</style>
