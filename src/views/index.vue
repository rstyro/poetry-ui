<template>
    <div class="container">
        <Header></Header>

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
    import Header from "@/components/Header.vue";

    components:{
        Header
    }

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



  .main{

    .main-inner{
      margin: 100px auto 0px;
      max-width: 800px;
      padding: 0px 20px;

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
