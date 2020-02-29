<template>
      <div class="login-bg">
          <el-card class="login-card">
            <div class="title">
                <img src="../../assets/logo_index.png" alt="">
            </div>
            <el-form style="margin-top:20px">
                <!-- 手机号 -->
              <el-form-item >
                <el-input v-model="input" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item>
              <el-input v-model="input" placeholder="请输入验证码" style="width:65%;"></el-input>
              <el-button style="float:right" plain>发送验证码</el-button>
              </el-form-item>
              <!-- 隐私条款 -->
              <el-form-item>
                <el-checkbox v-model="checked" >我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <!-- 提交 -->
              <el-form-item>
                <el-button type="primary" style="width:100%">登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      checked: false
    }
  }
}
</script>

<style lang="less" scoped>
// 写less需要lang属性定义
// scoped范围属性 生成 data-v-xxx的唯一属性 该组件单独使用
.login-bg{
  height: 100vh;
  background-image: url('../../assets/back-01.jpg');
  background-size: cover;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  .login-card{
    width: 440px;
    height: 340px;
    background-color: rgba(255, 255, 255, .8);
    margin: 0 auto;
    box-sizing: border-box;
    .title{
      text-align: center;
        img{
        height: 45px;
      }
    }
  }
}

</style>
