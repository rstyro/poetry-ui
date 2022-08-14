<template>
    <div class="container">
        <header>
            <div class="header-inner">
                <el-menu
                    :default-active="data.activeIndex"
                    class="el-menus"
                    mode="horizontal"
                    :ellipsis="false"
                    :router="true"
                    @select="handleSelect"
                >
                    <el-menu-item index="/index">LOGO</el-menu-item>
                    <div class="flex-grow" >

                    </div>
                    <el-menu-item index="/index">首页</el-menu-item>
                    <el-menu-item index="/about">关于</el-menu-item>
                    <el-sub-menu index="/user">
                        <template #title>我的</template>
                        <el-menu-item index="/edit">编辑</el-menu-item>
                        <el-menu-item index="/logout">退出</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
        </header>
        <div class="main">
            <div class="main-inner">
                <el-input   v-model="data.keyword"
                          size="large"
                          placeholder="请输入搜索的关键字">
                    <template #append>
                        <el-button class="btn-search" @click="search">
                            <el-icon class="el-icon--left"><i-ep-search /></el-icon>搜索
                        </el-button>
                    </template>
                </el-input>
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">
    import {onMounted, reactive} from 'vue';

    interface  Params{
        activeIndex:string,
        keyword:string
    }

    const data:Params = reactive<Params>({
        activeIndex: "/index",
        keyword:""
    });
    console.log(data)
    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

    const search=()=>{
        console.log("keyword:",data.keyword)
    }
    onMounted(() => {

    })
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100vh;
    //background: #1a1a1a;
  }



  header {
    /*首页导航背景颜色*/
    $bgColor: #f5f5f5;
    $headerH:90px;

    height: $headerH;
    width: 100%;
    background-color:  $bgColor;
    color: #555;
    .header-inner{
      background: rgba(43, 72, 101, 0.6);
      max-width: 1100px;
      margin: 0px auto;

      .el-menus{
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

  .main{

    .main-inner{
      margin: 100px auto 0px;
      width: 800px;

      .el-input::v-deep {
        .el-input-group__append {
          border: 0px solid var(--el-border-color);
          border-left: 0;
          background-color: #409eff !important;
          color: #fff;
        }
      }
    }
  }
</style>
