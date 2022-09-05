<template>
    <div class="container">
        <Header></Header>
        <div class="main">
            <div class="content">
              {{data}}
            </div>


        </div>
    </div>


</template>

<script setup lang="ts">
    import {onMounted, reactive, ref, watch} from 'vue';
    import Header from "@/components/Header.vue";
    import {getDetail} from "@/api/module/search";
    import {useRouter, useRoute} from "vue-router";
    import gaps from 'gsap';

    components:{
        Header
    }

    // data数据对象
    interface Data {
        id: string,
        activeIndex: string,
        keyword: string,
        total: number,
        totalNum: number,
        took: number,
        poetryList: any[],
        tags: any[],
        dynastyList: any[],
        authorList: any[],
        typeList: any[]
    }

    const router = useRouter();
    const route = useRoute();

    // 数据初始化
    let data: Data = reactive<Data>({
        id: "",
        activeIndex: "/index",
        keyword: "",
        total: 0,
        totalNum: 0,
        took: 100,
        poetryList: [],
        tags: [],
        dynastyList: [],
        authorList: [],
        typeList: []
    });

    const getDetailInfo = (id:string)=>{
      getDetail(id).then((res)=>{
        console.log(res);
        if(res.status == 200){
          data=res.data;
        }
      });
    }


    onMounted(() => {
        // 得到地址栏q参数
        data.id = <string>route.query?.id;
      getDetailInfo(data.id);
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

    .result {
      color: #999;
      font-size: 13px;
      line-height: 39px;
      max-width: $mainWidth;
      margin: 0px auto;
    }

    .content {
      display: flex;
      justify-content: space-around;
      min-height: 700px;
      max-width: $mainWidth;
      margin: 30px auto;
      overflow: auto;

      .left {
        flex-grow: 1;

        .poetry-card {
          margin-bottom: 20px;


          :deep(.el-card__header) {
            //padding-bottom: 0px;
            border: 0px;
          }

          :deep(.el-card__body) {
            padding-top: 0px;
          }

          .poetry-title {
            font-size: 26px;

          }

          .poetry-content {
            letter-spacing: 5px;
            padding: 20px 0px;

            p {
              font-size: 16px;
              padding-bottom: 10px;
            }
          }

          .poetry-tags {
            color: #999;
            font-size: 12px;

            .tag:nth-child(n+2) {
              margin-left: 20px;
            }
          }
        }

      }

      .right {
        min-width: 350px;
        margin-left: 50px;

        .aside {
          padding: 20px;
          //border: 1px solid #999999;
          background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);

          &:nth-child(n+2) {
            margin-top: 20px;
          }

          .aside-title {
            font-size: 26px;
            //background: #fbc2eb;
          }

          .aside-content {
            margin-top: 20px;
          }
        }
      }

    }
  }


</style>
