<template>
<!-- 面包屑 -->
  <el-breadcrumb separator='>>'>
      <!-- 选项相当于router-link -->
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <!-- 动态选项传值props 和 slot -->
      <el-breadcrumb-item>
          <slot name="title"></slot>
      </el-breadcrumb-item>

  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
