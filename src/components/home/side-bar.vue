<template>
  <div class="side">
      <div class="title">
        <img :src="fold?'':coverImg" alt="" style="height:80px;">
      </div>
      <!-- router开启路由模式  :collapse="collapse"-->
      <el-menu :collapse="fold" router background-color="rgba(225, 225, 225,.2)"
      text-color="#222" style="border:none;">
        <!-- 首页 -->
        <!-- index实现路由跳转 -->
        <el-menu-item index='/home'>
         <i class="el-icon-s-home" style="color:#FFD700"></i><span style="color:#FFD700">首页</span>
        </el-menu-item>
        <!-- 内容管理 -->
        <el-submenu index='2'>
            <template slot="title"><i class="el-icon-document"></i><span>内容管理</span></template>
             <el-menu-item index='/home/publish'>发布文章</el-menu-item>
             <el-menu-item index='/home/articles'>内容列表</el-menu-item>
             <el-menu-item index='/home/comment'>评论列表</el-menu-item>
             <el-menu-item index='/home/material'>素材管理</el-menu-item>
        </el-submenu>
        <!-- 粉丝管理 -->
        <el-submenu index='3'>
            <template slot="title"><i class="el-icon-sugar"></i><span>粉丝管理</span></template>
             <el-menu-item index='/home/picture'>图文数据</el-menu-item>
             <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
             <el-menu-item index='/home/fansphoto'>粉丝画像</el-menu-item>
             <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
        </el-submenu>
        <!-- 应用管理 -->
        <el-submenu index='4'>
            <template slot="title"><i class="el-icon-menu"></i><span>应用管理</span></template>
            <el-menu-item index='/home/app'>app</el-menu-item>
        </el-submenu>
        <!-- 账号信息 -->
        <el-menu-item index='/home/account'>
             <i class="el-icon-user-solid"></i>
             <span>账户信息</span>
         </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
// import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      coverImg: require('../../assets/cat01.png') // 转换变量
      // smallImg: require('../../assets/toutiao.png')
    }
  },
  // 父传子 接收父组件传过来的变量
  props: ['fold']
  // props: ['collapse']
  // data () {
  //   return {
  //     collapse: false
  //   }
  // },
  // created () {
  //   // 监听公共事件
  //   eventBus.$on('Collapse', () => {
  //     // 数据对应
  //     this.collapse = !this.collapse
  //   })
  // }
}
</script>

<style lang="less" scoped>
.side{
  position: relative;
  height: 100vh;
  &:before{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0,.4);
  }
  i{
    color: #222;
    font-size: 25px;
    // padding:0 10px;
  }
  span {
  font-size: 18px;
  font-weight: bold;
}
  .title{
    position: relative;
    width: 100%;
    height: 100px;
    padding: 10px 0 20px 0;
    // background: url('../../assets/cat01.png') center 10px no-repeat;
    // background-size: contain;
    background-color: rgba(0, 0, 0,.3);
    &:before{
      content: '';
      position: absolute;
      width: 100%;
      height: 100px;
      left: 0;
      transform: translate(0,35px);
      background: url('../../assets/font.png') center no-repeat;
      background-size: contain;
    }
  }
}
</style>
