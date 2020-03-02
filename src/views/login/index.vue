<template>
      <div class="login-bg">
          <el-card class="login-card">
            <div class="title" style="user-select:none">
                <img src="../../assets/cat01.png" alt="" style="height:60px">
            </div>
            <el-form style="margin-top:20px" >
              <!-- 手机号 -->
              <el-form-item >
                <el-input  placeholder="请输入手机号">
                  <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
                </el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item >
                <el-input  placeholder="请输入密码">
                  <template slot="prepend"><i class="el-icon-key"></i></template>
                </el-input>
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item>
              <el-input  placeholder="请输入验证码" style="width:65%;"></el-input>
              <el-button style="float:right" plain>发送验证码</el-button>
              </el-form-item>
              <!-- 隐私条款 -->
              <el-form-item>
                <el-checkbox >我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <!-- 提交 -->
              <el-form-item>
                <el-button type="warning" style="width:100%">登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {

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
  &:before{//伪类实现模糊效果
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../../assets/004.jpg') center;
    background-size: cover;
    filter: blur(5px)
  }
  .login-card{
    z-index: 2;
    width: 650px;
    height: 480px;
    margin: 0 auto;
    padding: 0 100px 0 60px;
    border: none;
    box-shadow: none;
    box-sizing: border-box;
    background-color: transparent;
    // background-color: rgba(0, 0, 0, .8);
    .title{
      height: 100px;
      text-align: center;
      background:url('../../assets/font.png') 135px 20px no-repeat;
      background-size: contain;
    }
  }
}

</style>
