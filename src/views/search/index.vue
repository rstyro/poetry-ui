<template>
    <div class="container">
        <Header></Header>
        <div class="main">
            <div class="main-header">
                <div class="main-header-input">
                    <el-input v-model="data.keyword"
                              size="large"
                              placeholder="请输入搜索的关键字">
                        <template #append>
                            <el-button class="btn-search" @click="search">
                                <el-icon class="el-icon--left">
                                    <i-ep-search/>
                                </el-icon>
                                搜索
                            </el-button>
                        </template>
                    </el-input>
                </div>

            </div>

            <div class="content">
                <div class="left">

                    <el-card class="poetry-card">
                        <template #header>
                            <div class="poetry-title">
                                <span>将进酒</span>
                            </div>
                        </template>

                        <div class="poetry-tags">
                            <el-tag class="tag" type="info">忧愁</el-tag>
                            <el-tag class="tag" type="info">桀骜不驯</el-tag>
                            <el-tag class="tag" type="info">自信</el-tag>
                            <el-tag class="tag" type="info">豪迈</el-tag>
                        </div>

                        <div class="poetry-content">
                            <p>君不见黄河之水天上来，奔流到海不复回</p>
                            <p>君不见高堂明镜悲白发，朝如青丝暮成雪</p>
                        </div>

                    </el-card>

                </div>
                <div class="right">

                </div>
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

    interface Params {
        activeIndex: string,
        keyword: string
    }

    const data: Params = reactive<Params>({
        activeIndex: "/index",
        keyword: ""
    });
    console.log(data)
    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

    const search = () => {
        console.log("keyword:", data.keyword)
    }
    onMounted(() => {

    })
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
  }

  .main {

    .main-header {
      margin: 0px auto;
      width: 100%;
      height: 150px;
      //background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
      background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);

      .main-header-input {
        max-width: $mainWidth;
        padding-top: 50px;
        margin: 0px auto;
      }

    }

    .content {
      display: flex;
      justify-content: space-around;
      min-height: 700px;
      max-width: $mainWidth;
      margin: 30px auto;
      overflow-y: auto;

      .left {
        flex-grow: 1;

        .poetry-card {
          margin-bottom: 20px;


          :deep(.el-card__header){
                //padding-bottom: 0px;
            border: 0px;
          }

          :deep(.el-card__body){
            //padding-top: 10px;
          }

          .poetry-title {
            font-size: 26px;

          }

          .poetry-content {
            letter-spacing: 5px;
            padding: 20px 0px;
          }

          .poetry-tags {

            .tag:nth-child(n+2) {
              margin-left: 20px;
            }
          }
        }

      }

      .right {
        width: 350px;
        margin-left: 50px;
        box-shadow: 0 0 6px rgb(202 203 203 / 50%);
        -webkit-box-shadow: 0 0 6px rgb(202 203 203 / 50%);
        background: #cccccc;
      }

    }
  }
</style>
