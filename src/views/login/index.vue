<template>
  <div class="login">
      <div class="back">
        <div class="form"></div>
      </div>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

// 写less需要lang属性定义
// scoped范围属性 生成 data-v-xxx的唯一属性 该组件单独使用
.back{
  // width: 100%;
  height: 100vh;
  background-image: url('../../assets/back-03.jpg');
  background-size: cover;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  .form{
    width: 500px;
    height: 300px;
    background-color: rgba(0, 0, 0,.6);
    margin: 0 auto;
  }
}

</style>
