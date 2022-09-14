<template>
  <header>
    <div class="header-inner">
      <el-menu
          :default-active="activeIndex"
          class="el-menus"
          mode="horizontal"
          :ellipsis="false"
          :router="true"
          @select="handleSelect"
      >
        <el-menu-item index="index">
          <el-image
              style="height: 100%;"
              :src="logoImg"
              fit="cover"
              class="logo-shiny"
          />
        </el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="search">首页</el-menu-item>
        <el-menu-item index="flyFlower">飞花令</el-menu-item>
        <el-menu-item index="about">关于</el-menu-item>
        <el-sub-menu index="user">
          <template #title>我的</template>
          <el-menu-item index="edit">编辑</el-menu-item>
          <el-menu-item index="logout">退出</el-menu-item>
        </el-sub-menu>
      </el-menu>
      <el-switch
          v-model="data.theme"
          class="theme-switch"
          inline-prompt
          :active-icon="Sunny"
          :inactive-icon="Moon"
      />
    </div>
  </header>


</template>

<script setup lang="ts">
import {Ref, ref, computed, watch, reactive} from 'vue';
import {useRoute} from "vue-router";
import logoImg from '@/assets/images/logo.png';
import { Sunny, Moon } from '@element-plus/icons-vue'

const route = useRoute();
const activeIndex = ref(computed(() => route.name));
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const data = reactive<any>({
  theme : true,
});

// 监听一下主题变化
watch(() => data.theme, (newVal, oldVal) => {
  console.log("val:",newVal,oldVal);
  if(newVal){
    window.document.getElementById("app").setAttribute('data-theme', "light");
  }else {
    window.document.getElementById("app").setAttribute('data-theme', "dark");
  }
});

//

</script>

<style scoped lang="scss">


header {
  /*首页导航背景颜色*/
  //$bgColor: #f5f5f5;
  //$headerH: 90px;

  height: $headerH;
  width: 100%;
  background-color: $bgColor;
  color: #555;

  .header-inner {
    //background: rgba(43, 72, 101, 0.6);
    max-width: $mainWidth;
    margin: 0px auto;
    display: flex;

    .el-menus{
      flex-grow: 1;
    }
    .theme-switch{
      display: inline-block;
      vertical-align: middle;
      height: $headerH;
      line-height: $headerH;
      width: 100px;
      margin-left: 24px
    }

    .logo {
      width: 130px;
      height: 40px;
      color: #fff;
      border-radius: 5px;
      padding: 10px 25px;
      font-family: 'Lato', sans-serif;
      font-weight: 500;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      display: inline-block;
      box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
      7px 7px 20px 0px rgba(0, 0, 0, .1),
      4px 4px 5px 0px rgba(0, 0, 0, .1);
      outline: none;
    }

    /* logo 闪亮特效 */
    .logo-shiny {

      &:before {
        position: absolute;
        content: '';
        display: inline-block;
        top: -180px;
        left: 0;
        width: 30px;
        height: 100%;
        background-color: #fff;
        animation: shiny 2s ease-in-out infinite;

        @-webkit-keyframes shiny {
          0% {
            -webkit-transform: scale(0) rotate(45deg);
            opacity: 0;
          }
          80% {
            -webkit-transform: scale(0) rotate(45deg);
            opacity: 0.5;
          }
          81% {
            -webkit-transform: scale(4) rotate(45deg);
            opacity: 1;
          }
          100% {
            -webkit-transform: scale(50) rotate(45deg);
            opacity: 0;
          }
        }
      }
    }

    .el-menus {
      background: $bgColor;
      border: 0px;
      height: $headerH;
      font-size: 24px;
    }

    .flex-grow {
      flex-grow: 1;
    }

  }
}
</style>
