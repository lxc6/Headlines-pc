<template>
  <div class="nav">
      <el-row type="flex" align="middle" style="height:60px;padding:0 20px">
        <el-col :span="12">
            <i class='el-icon-s-fold' style=""></i>
            <span>
                江苏传智播客教育科技股份有限公司
            </span>
        </el-col>
        <el-col :span="12">
            <el-row type="flex" align="middle" justify="end" style="">
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search"
                    style="width:30%;margin-right:30px"
                ></el-input>
                <span>消息</span>
                <img :src="userMsg.photo" alt="">
            <!-- 下拉菜单 -->
            <el-dropdown trigger='click' @command="clickM">
               <!-- 显示的内容 -->
               <span style="color: #fff">{{userMsg.name}} <i class="el-icon-arrow-down el-icon--right"></i></span>

                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item command="user">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="out">退出</el-dropdown-item>
                </el-dropdown-menu>
           </el-dropdown>

            </el-row>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userMsg: {}
    }
  },
  // 实例化完成就调用
  created () {
    const token = localStorage.getItem('user-token')// 获取令牌
    this.$axios({
      // method: 'get', 默认为get
      url: '/user/profile', // 请求地址
      headers: {
        Authorization: `Bearer ${token}`// 将令牌放入请求头,固定格式Bearer + token
      }
    }).then(res => {
      this.userMsg = res.data.data
    })
  },
  methods: {
    clickM (command) { // elementui提供command事件
      if (command === 'user') {
        alert('还没讲到该页面制作 -_-!')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/lxc6'
      } else {
        // 退出 清除token 并返回login
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav{
    position: relative;
    width: 100%;
    height: 65px;
    color: #fff;
    background: url('../../assets/006.jpg') center;
    background-size: cover;
    &:before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    }
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0 10px;
    }
    .el-icon-s-fold{
      // 公司图标对齐
      font-size:22px;
      transform:translate(0,2px)
    }
    .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
}
</style>
