<template>
  <div class="main">
      <div class="all">
          <section class="small">
               <div v-for="item in icon" :key="item.id" :class=" `box ${item.name}`"></div>
          </section>
          <section ref="outBox"  v-for="item in num" :key="item.id" :class="`big ${item.name}`">
               <div v-for="item in icon" :key="item.id" :class=" `scale ${item.name}`"></div>
          </section>
     </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      curIcon: '',
      curid: '',
      icon: [
        { id: 1, name: 'el-icon-sunny' },
        { id: 2, name: 'el-icon-moon-night' },
        { id: 3, name: 'el-icon-heavy-rain' },
        { id: 4, name: 'el-icon-lightning' },
        { id: 5, name: 'el-icon-cloudy' },
        { id: 6, name: 'el-icon-moon-night' }
      ],
      num: [
        { id: 1, name: 'big_0' },
        { id: 2, name: 'big_1' },
        { id: 3, name: 'big_2' },
        { id: 4, name: 'big_3' },
        { id: 5, name: 'big_4' },
        { id: 6, name: 'big_5' }
      ]
    }
  },
  methods: {
    icons () {
    //   console.log(this.$refs.outBox)
    //   return this.icon.filter(item => item.id === this.$refs.attr('key'))
    }
  }
}
</script>

<style lang='less' scoped>
.main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, .2)
  }
  @keyframes all {
      from {
          transform: rotate(0deg);
      }

      to {
          transform: rotate(360deg);
      }
  }

  @keyframes small {
      from {
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
      }

      to {
          transform: rotateX(-360deg) rotateY(-360deg) rotateZ(360deg);
      }
  }

  @keyframes big {
      from {
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateZ(200px);

      }

      to {
          transform: rotateX(-360deg) rotateY(-360deg) rotateZ(360deg) translateZ(450px);

      }
  }

  @keyframes big_1 {
      from {
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateZ(-200px);

      }

      to {
          transform: rotateX(-360deg) rotateY(-360deg) rotateZ(360deg) translateZ(-450px);

      }
  }

  @keyframes big_2 {
      from {
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(200px);

      }

      to {
          transform: rotateX(-360deg) rotateY(-360deg) rotateZ(360deg) translateX(450px);

      }
  }

  @keyframes big_3 {
      from {
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(-200px);

      }

      to {
          transform: rotateX(-360deg) rotateY(-360deg) rotateZ(360deg) translateX(-450px);

      }
  }

  @keyframes big_4 {
      from {
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(200px);

      }

      to {
          transform: rotateX(-360deg) rotateY(-360deg) rotateZ(360deg) translateY(450px);

      }
  }

  @keyframes big_5 {
      from {
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(-200px);

      }

      to {
          transform: rotateX(-360deg) rotateY(-360deg) rotateZ(360deg) translateY(-450px);

      }
  }

  .all {
      width: 600px;
      height: 600px;
      margin: 30px auto;
      position: relative;
      transform-style: preserve-3d;
      animation: all alternate 20s linear infinite;

      section {
          width: 500px;
          height: 500px;
          margin: 30px auto;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          transform-style: preserve-3d;
      }

      .small {

          animation: small alternate 10s infinite linear;

          .box {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              width: 100px;
              height: 100px;
              font-size: 50px;
              text-align: center;
              border-radius: 50%;
              line-height: 100px;
              font-weight: 700;
              transform-style: preserve-3d;
              opacity: .8;

          }

          .box:nth-child(1) {
              background: linear-gradient(45deg, pink, red);
              transform: rotateY(90deg) translateZ(-50px);
          }

          .box:nth-child(2) {
              background: linear-gradient(45deg, pink, orange);
              transform: rotateY(90deg) translateZ(50px);
          }

          .box:nth-child(3) {
              background: linear-gradient(45deg, pink, yellow);
              transform: rotateX(90deg) translateZ(50px);
          }

          .box:nth-child(4) {
              background: linear-gradient(45deg, pink, green);
              transform: rotateX(90deg) translateZ(-50px);
          }

          .box:nth-child(5) {
              background: linear-gradient(45deg, pink, skyblue);
              transform: translateZ(50px);
          }

          .box:nth-child(6) {
              background: linear-gradient(45deg, pink, purple);
              transform: translateZ(-50px);
          }

      }

      .big {
          animation: big alternate 15s infinite linear;
          .scale {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              width: 200px;
              height: 200px;
              font-size: 100px;
              text-align: center;
              line-height: 200px;
              font-weight: 700;
              color: burlywood;
              border-radius: 20%;
              opacity: .6;
          }
          .scale:nth-child(1) {
              background: linear-gradient(45deg, orange, red);
              transform: rotateY(90deg) translateZ(-100px);
          }

          .scale:nth-child(2) {
              background: linear-gradient(45deg, yellow, orange);
              transform: rotateY(90deg) translateZ(100px);
          }

          .scale:nth-child(3) {
              background: linear-gradient(45deg, green, yellow);
              transform: rotateX(90deg) translateZ(100px);
          }

          .scale:nth-child(4) {
              background: linear-gradient(45deg, skyblue, green);
              transform: rotateX(90deg) translateZ(-100px);
          }

          .scale:nth-child(5) {
              background: linear-gradient(45deg, purple, skyblue);
              transform: translateZ(100px);
          }

          .scale:nth-child(6) {
              background: linear-gradient(45deg, red, purple);
              transform: translateZ(-100px);
          }

      }

      .big_1 {
          animation: big_1 alternate 15s infinite linear;
      }

      .big_2 {
          animation: big_2 alternate 15s infinite linear;
      }

      .big_3 {
          animation: big_3 alternate 15s infinite linear;
      }

      .big_4 {
          animation: big_4 alternate 15s infinite linear;
      }

      .big_5 {
          animation: big_5 alternate 15s infinite linear;
      }

  }
</style>
