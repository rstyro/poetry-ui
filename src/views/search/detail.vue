<template>
    <div class="container">
        <Header></Header>
        <div class="main">
          <el-card class="content">

            <div class="detail-header">
              <h1 class="detail-title">明月几时有</h1>
              <div class="detail-meta">
                <span>
                  <span>数据更新于</span>
                  <span>2022-09-01</span>
                </span>
                <el-divider direction="vertical" />
                <span>
                  <span>浏览数</span>
                  <span>10k</span>
                </span>
                <el-divider direction="vertical" />
              </div>
              <div class="detail-body">
                  <div>五言一遍最殷勤，调少情多似有因。</div>
                  <div>不会当时翻曲意，此声肠断为何人。</div>
              </div>
            </div>

          </el-card>
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

    .main {

      .content {
        min-height: 700px;
        max-width: 900px;
        margin: 100px auto;
        overflow: auto;
        padding: 25px;

        .detail-header{
          opacity: 1;
          display: block;

          .detail-title{
            text-align: center;
            font-size: 26px;
            font-weight: 400;
          }
          .detail-meta{
            margin-bottom: 60px;
            margin-top: 5px;
            font-size: 12px;
            text-align: center;
          }
        }

      }
    }

  }

</style>
