<template>
  <router-view #default="{route,Component}">
    <transition :enter-active-class="`animate__animated  ${route.meta.transition}`">
      <component :is="Component"></component>
    </transition>
    <el-backtop :right="100" :bottom="100"/>
  </router-view>
</template>

<script setup lang="ts">
import 'animate.css';
import {onMounted, reactive} from 'vue';

const data = reactive({
  params: null,
});
onMounted(() => {
  console.log("Hello Word")
})
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100vh;
  overflow: auto;
}

/*高亮*/
#app[data-theme='light'] {
  background: #fff;
}

/*黑暗*/
#app[data-theme='dark'] {
  /*导航菜单背景颜色*/
  $bgColor: #191919;


  background: #292a2d;
  $darkBgColor: #292a2d;
  $darkColor: #FFF;

  header {
    /*首页导航背景颜色*/
    background-color: $bgColor;

    .header-inner, .el-menu-item, .flex-grow, .el-sub-menu {
      background-color: $bgColor !important;
      --el-menu-text-color: #fff;
    }
  }

  .main-header {
    //background-image: linear-gradient(to top, #6a85b6 0%, #bac8e0 100%);
    background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
  }

  .content {

    /*首页列表卡片*/
    .poetry-card {
      --el-card-bg-color: #292a2d;
      --el-card-border-color: #333;
      --el-text-color-primary: #fff;

      .poetry-card-footer {
        background: $darkBgColor;

        .el-divider__text {
          background: $darkBgColor;
        }
      }
    }

    /*首页右侧块*/
    .el-collapse {
      --el-collapse-header-bg-color: $darkBgColor;
      --el-collapse-border-color: #333;

      .collapse-title {
        color: $darkColor;
      }

      .el-collapse-item__content {
        background-color: $darkBgColor;

        .el-checkbox__inner {
          background-color: $darkBgColor;
          border-color: #666;
        }
      }
    }
  }

  /*加载*/
  .loading-skeleton {
    --el-skeleton-color: #333;
    --el-skeleton-to-color: #666;
  }

  /*分页*/
  .el-pagination {
    --el-fill-color-blank: $darkBgColor;
    --el-text-color-primary: #fff;
  }


  .detail-content, .fly-content {
    background-color: $darkBgColor;
    --el-border-color-light: #333;
    color: #fff;

    .el-divider {
      --el-border-color: #666;

      .el-divider__text {
        background: $darkBgColor;
      }
      .fly-title {
        color: #666;
        &:hover {
          color: #409eff;
        }
      }
    }


  }
}
</style>
