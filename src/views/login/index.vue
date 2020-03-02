<template>
      <div class="login-bg">
          <video class="v1"  autoplay muted loop src="../../assets/video.mp4">
            <!-- <source src="../../assets/video.mp4"> -->
          </video>
          <el-card class="login-card">
            <div class="title" style="user-select:none">
                <img src="../../assets/cat01.png" alt="" style="height:60px">
            </div>
            <!-- 绑定属性 -->
            <el-form  :model="loginForm" :rules="loginRules" ref="myForm" style="margin-top:20px" >
              <!-- 手机号 -->
              <el-form-item prop="mobile">
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号">
                  <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
                </el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
                  <template slot="prepend"><i class="el-icon-key"></i></template>
                </el-input>
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item prop="code">
              <el-input v-model="loginForm.code"  placeholder="请输入验证码" style="width:65%;"></el-input>
              <el-button style="float:right" plain>发送验证码</el-button>
              </el-form-item>
              <!-- 隐私条款 -->
              <el-form-item prop="checked">
                <el-checkbox v-model="loginForm.checked"><span span style="color:snow">我已阅读并同意用户协议和隐私条款</span></el-checkbox>
              </el-form-item>
              <!-- 提交 -->
              <el-form-item>
                <el-button @click="login" type="warning" style="width:100%">登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        password: '',
        code: '',
        checked: false
      },
      loginRules: {
        // 格式校验 required: true为必填项
        mobile: [{ required: true, message: '您的手机号不能为空' }, {
          pattern: /^1[3-9]\d{9}$/,
          message: '您的手机号格式不正确'
        }],
        password: [{ required: true, message: '您的密码不能为空' }, {
          pattern: /^\d{6}$/,
          message: '您的密码格式不正确'
        }],
        code: [{ required: true, message: '您的手机号不能为空' }, {
          pattern: /^\d{6}$/,
          message: '您的密码格式不正确'
        }],
        checked: [{
          // validator自定义效验，required默认效验(无法验证布尔值)
          validator: function (rule, value, callback) {
            // true  or  false
            value ? callback() : callback(new Error('您必须同意我们的条款才能登陆'))
          }
        }]
      }
    }
  },
  methods: {
    login () {
      // 获取表单组件对象validate整体校验
      this.$refs.myForm.validate().then(() => {
        // 异步操作
        this.$axios({
          url: '/authorizations',
          data: this.loginForm,
          method: 'post'
        }).then(res => {
          // 本地添加token
          window.localStorage.setItem('user-token', res.data.data.token)
          // 添加完毕跳转页面
          this.$router.push('/home')
        }).catch(() => {
          // this.$message({ message: '用户名或密码错误', type: 'error' })
          this.$message.error('用户名或密码错误')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-bg{
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  overflow: hidden;
  .v1{
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 140%;
    z-index: 1;
    // opacity: .9;
  }
  &:before{//伪类实现模糊效果
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../../assets/0013.gif') center;
    background-size: cover;
    filter: blur(2px)
  }
  .login-card{
    z-index: 5;
    width: 500px;
    height: 480px;
    margin: 0 auto;
    transform: translate(-30px);
    padding: 0 20px;
    border: none;
    border-radius: 50px;
    box-shadow: none;
    box-sizing: border-box;
    // background: url('../../assets/0013.gif') center;
    // background-size: cover;
    background-color: transparent;
    // background-color: rgba(0, 0, 0, .1);
    .title{
      height: 100px;
      text-align: center;
      background:url('../../assets/font.png') center 20px no-repeat;
      background-size: contain;
    }
  }
}

</style>
