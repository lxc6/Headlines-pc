<template>
  <div class="home">

      <el-container style="height:100vh;">
        <!-- 左 -->
        <el-aside style="width:250px;overflow: hidden;">
          <side-bar></side-bar>
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
export default {

}
</script>

<style lang="less" scoped>
.el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  .el-main{
    position: relative;
    overflow:hidden;
    background: url('../../assets/main-01.jpg') center;
    background-size: cover;
    background-color:#222;
  }
</style>
