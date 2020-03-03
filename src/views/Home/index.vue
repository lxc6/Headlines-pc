<template>
  <div class="home">

      <el-container style="height:100vh;">
        <!-- 左 -->
        <el-aside style="width:250px;overflow: hidden;">
          <side-bar></side-bar>
        </el-aside>
        <!-- 右 -->
        <el-container>
          <el-header>
            <h1>这里是顶栏容器</h1>
          </el-header>
          <el-main>
            <h1>这里是主要区域容器</h1>
            <!-- 二级路由 -->
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

</style>
