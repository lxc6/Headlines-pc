<template>
     <el-card >
         <bread-crumb slot="header">
      <!-- 具名插槽 slot="title" 给bread-->
        <template slot="title">图文数据</template>
      </bread-crumb>
  <el-row class="box" type="flex" justify="space-around">
      <div ref="myCharts" class="echarts"></div>
      <div ref="myCharts2" class="echarts"></div>
  </el-row >
     </el-card>
</template>

<script>
// 引入Echarts图表模板 本身为canvas实现
import Echarts from 'echarts'
export default {
  mounted () {
    // 想获取dom并显示只能在mounted中调用
    this.myCharts()
    this.myCharts2()
  },
  methods: {
    myCharts () {
    //  实例化图表 得到图表实例化对象
      this.myCharts = Echarts.init(this.$refs.myCharts)
      this.myCharts.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      })
    },
    myCharts2 () {
      this.myCharts2 = Echarts.init(this.$refs.myCharts2)
      var data = []
      for (var i = 0; i <= 360; i++) {
        var t = i / 180 * Math.PI
        var r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
      }
      this.myCharts2.setOption({
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [{
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          showSymbol: false,
          data: data
        }],
        animationDuration: 2000
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
    background: rgba(255, 255, 255, .3);
    // background: rgba(0, 0, 0, .4);
    .echarts{
        // margin: 100px auto;
        width: 600px;
        height: 400px;
        margin: 50px 0;
        border: 1px solid #000;
    }
}

</style>
