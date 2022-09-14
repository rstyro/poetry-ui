<template>
  <div class="container">
    <Header></Header>
    <div class="main">
      <el-card class="detail-content">

        <div class="detail-header">
          <h1 class="detail-title" v-text="data.item.title"></h1>
          <div class="detail-meta">
                <span class="detail-meta-item">
                  <el-icon class="meta-icon"><i-ep-calendar/></el-icon>
                 <span>更新与 <time>2022-09-01</time></span>
                </span>
            <el-divider direction="vertical"/>
                <span class="detail-meta-item">
                 <el-icon class="meta-icon"><i-ep-view/></el-icon>
                  <span>10k</span>
                </span>
            <el-divider direction="vertical"/>
            <span class="detail-meta-item">
                 <el-icon class="meta-icon"><i-ep-user/></el-icon>
                  <span v-text="`作者： ${data.item.author}`"></span>
                </span>

            <el-divider direction="vertical"/>
            <span class="detail-meta-item">
                 <el-icon class="meta-icon"><i-ep-folder/></el-icon>
                  <span v-text="`分类： ${data.item.type}`"></span>
                </span>
            <el-divider direction="vertical" v-if="data.item.section"/>
            <span class="detail-meta-item"  v-if="data.item.section">
                  <el-icon class="meta-icon"><i-ep-collection/></el-icon>
                  <span v-text="`合集：${data.item.section}`"></span>
                </span>
            <el-divider direction="vertical" v-if="data.item.dynasty"/>
            <span class="detail-meta-item"  v-if="data.item.dynasty">
                  <el-icon class="meta-icon"><i-ep-location/></el-icon>
                  <span v-text="`${data.item.dynasty}`"></span>
                </span>
          </div>
        </div>

        <div class="detail-body">
          <div v-for="(e,index) of data.item.content" v-text="e" class="detail-body-item"></div>
        </div>

        <div class="detail-footer">
          <el-tag v-for="(item,index) in data.item.tags" :key="index" effect="light" class="footer-tag">
            <el-icon class="el-icon--left"><i-ep-price-tag/></el-icon> {{ item }}
          </el-tag>
        </div>


        <div class="detail-remark" v-if="data.item.translations">
          <el-collapse>
            <el-collapse-item title="译文或注释">
              <template #title>
                <el-icon class="el-icon--left"><i-ep-info-filled/></el-icon> <b>译文或注释</b>
              </template>
              <div v-for="(e,index) of data.item.translations" v-text="e" class="detail-body-item"></div>
            </el-collapse-item>
          </el-collapse>
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

const router = useRouter();
const route = useRoute();

// 数据初始化
const data = reactive<any>({
  id: "",
  item: {
    _id: "abc",
    section: "卷四百四十",
    chapter: null,
    author: "白居易",
    title: "李白墓",
    content: [
      "采石江边李白坟，绕田无限草连云。可怜荒垄穷泉骨，"
    ],
    tags: [],
    dynasty: [
      "唐朝"
    ],
    type: [
      "七言诗",
    ],
    translations: [],
  }
});

const getDetailInfo = (id: string) => {
  getDetail(id).then((res) => {
    if (res.code == 200) {
      data.item = res.data;
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

    .detail-content {
      min-height: 700px;
      max-width: 900px;
      margin: 100px auto;
      overflow: auto;
      padding: 25px;

      .detail-header {
        opacity: 1;
        display: block;

        .detail-title {
          text-align: center;
          font-size: 26px;
          font-weight: 400;
        }

        .detail-meta {
          margin-bottom: 80px;
          margin-top: 20px;
          font-size: 12px;
          text-align: center;

          .detail-meta-item{
            margin-right: 10px;
          }

          .meta-icon{
            vertical-align: middle;
          }

          span {
            font-size: 14px;
            color: #999;
            vertical-align: middle;
            margin-left: 3px;
          }


        }
      }
      .detail-body {
        text-align: center;
        //font-size: 18px;

        .detail-body-item{
          margin-bottom: 10px;
          letter-spacing: 3px;

        }
      }

      .detail-footer{
        margin-top: 100px;
        margin-bottom: 30px;

        .footer-tag{
          margin-right: 10px;
        }
      }


      .detail-remark{

      }

    }
  }

}

</style>
