<template>
  <div class="box">
      <!-- 封面 -->
      <div @click="openDialog(index)" class="image-item" v-for="(item,index) in list" :key="index">
          <span>点击添加图片</span>
          <img :src="item?item:defaultImg" alt="">
      </div>
      <!-- 弹层 -->
      <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
          <!-- 监听谁的自定义事件 就在谁的标签上写v-on @ -->
          <select-image @selectImage="receiveSelect"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收传递的参数
  data () {
    return {
      defaultImg: require('../../assets/pic_bg.png'), // 转译之后地址不固定需转换为变量
      dialogVisible: false,
      selectIndex: -1// 记录当前点击的索引
    }
  },
  methods: {
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index// 记录当前点击了哪张图片
    },
    // 接收select传递的url参数
    receiveSelect (url) {
      // url要传给item ，item来自list ，list来自prop
      // prop为只读，所以要将url再向上级传递 二次传递
      // 传递时还要添加此时点击的 图片的索引信息
      this.$emit('coverImage', url, this.selectIndex)
      //   二次传递后关闭弹层
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
    .box{
        display: flex;
        justify-self: start;
        .image-item{
        width: 240px;
        height: 240px;
        padding: 10px;
        text-align: center;
        border: 1px dashed #ccc;
        border-radius: 10px;
        margin: 5px;
        cursor: pointer;
             img{
            width: 90%;
            height:80%;
            border-radius: 10px;

        }
        }

    }
</style>
