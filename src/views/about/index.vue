<template>
  <div class="container">
    <Header></Header>
    <div class="main">
      <div class="user-info">
        <el-avatar :size="120" :src="avatar" @error="errorHandler">
          <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
        <h1>胖不了小陆</h1>
        <div class="divider">
          <el-divider />
        </div>
        <div class="line">专心赚钱</div>
        <div class="line">你已经是个大人了，专心赚钱就行，不要因为爱情，平添烦恼。</div>
        <div class="divider">
          <el-divider/>
        </div>
        <div class="line">欢迎来到我的介绍页</div>

        <!-- 动态打字效果 -->
        <h1 align="center">
          <a href="http://rstyro.gitee.io/blog/">
            <img src="https://readme-typing-svg.herokuapp.com?color=F74D18&lines=别把你的小朋友弄丢了，别人捡到是不会还的。;年轻的时候，梦想在远方。在远方的时候，梦想在家乡&center=true&size=23&width=1000">
          </a>
        </h1>

        <!-- 贪吃蛇代码贡献图  https://cdn.githubjs.cf/-->
        <div align="center"><img src="https://cdn.githubjs.cf/rstyro/rstyro/blob/master/assets/github-contribution-grid-snake.svg" /></div>

      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from 'vue';
import Header from "@/components/Header.vue";
import avatar from '@/assets/images/avatar.jpg';

components:{
  Header
}

// 数据初始化
const data = reactive<any>({
  text: "",
  list: [],
  page: {
    pageNum: 1,
    total: 0
  }

});

const getData = () => {

}

onMounted(() => {
  getData();
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;

  .main {
    max-width: 900px;
    margin: 0px auto;
    overflow: auto;

    .user-info{
      text-align: center;
      margin-top: 50px;

      .line{
        margin-top: 10px;
      }
      .divider{
        width: 30%;margin: 0px auto;
      }
    }

  }

}

</style>
