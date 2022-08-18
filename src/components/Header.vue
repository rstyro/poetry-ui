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
                <el-menu-item index="/">古文检索</el-menu-item>
                <div class="flex-grow"></div>
                <el-menu-item index="/index">首页</el-menu-item>
                <el-menu-item index="/flyFlower">飞花令</el-menu-item>
                <el-menu-item index="/about">关于</el-menu-item>
                <el-sub-menu index="/user">
                    <template #title>我的</template>
                    <el-menu-item index="/edit">编辑</el-menu-item>
                    <el-menu-item index="/logout">退出</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
    </header>


</template>

<script setup lang="ts">
    import {Ref, ref} from 'vue';

    const activeIndex: Ref<string> = ref("/index");
    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

</script>

<style scoped lang="scss">

  header {
    /*首页导航背景颜色*/
    $bgColor: #f5f5f5;
    $headerH: 90px;

    height: $headerH;
    width: 100%;
    background-color: $bgColor;
    color: #555;

    .header-inner {
      background: rgba(43, 72, 101, 0.6);
      max-width: 1100px;
      margin: 0px auto;

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
