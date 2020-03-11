<template>
  <div class="home">

      <el-container style="height:100vh;">
        <!-- 左 -->
        <el-aside :style="{width: collapse?'64px':'240px'}">
          <!-- 父传子 传状态collapse 自定义属性fold-->
          <side-bar :fold="collapse"></side-bar>
          <!-- <side-bar :collapse="collapse"></side-bar> -->
        </el-aside>
        <!-- 右 -->
        <el-container>
          <!-- 顶 -->
          <el-header  style="padding:0">
            <nav-header></nav-header>
          </el-header>
          <!-- 主 -->
          <el-main>
            <!-- 二级路由容器 -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    // 监听公共事件
    eventBus.$on('Collapse', () => {
      // 数据对应
      this.collapse = !this.collapse
    })
  }

}
</script>

<style lang="less" scoped>
.el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    transition: all 1.5s;
    color: #333;
    background: url('../../assets/side.jpg') center;
    background-size: cover;
    overflow: hidden;
  }
  .el-main{
    position: relative;
    background: url('../../assets/main-01.jpg') center;
    background-size: cover;
    background-color:#222;
  }
</style>
