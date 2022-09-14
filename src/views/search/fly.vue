<template>
  <div class="container">
    <Header></Header>
    <div class="main">
      <div class="search-box">
        <el-input v-model="data.text"
                  :clearable="true"
                  size="large"
                  @keydown.enter="getData"
                  placeholder="请输入飞花令的关键字">
          <template #append>
            <el-button class="btn-search"

                       @click="getData">
              <el-icon class="el-icon--left">
                <i-ep-position/>
              </el-icon>
              生成飞花令
            </el-button>
          </template>
        </el-input>
      </div>
      <el-card class="fly-content" v-show="data.list.length>0">
        <div v-for="(e,index) of data.list" class="">
          <div class="fly-line">
            <div v-html="e.content"></div>
            <el-divider content-position="right"><a @click="toDetail(e._id)" class="fly-title">{{ e.author }} -
              《{{ e.title }}》</a></el-divider>
          </div>
        </div>
      </el-card>

      <div class="content-page">
        <el-pagination
            @current-change="handleCurrentChange"
            :hide-on-single-page="true"
            :current-page="data.page.pageNum"
            :pager-count="11"
            layout="prev,pager, next"
            :total="data.page.total"
        />
      </div>

    </div>
  </div>


</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from 'vue';
import Header from "@/components/Header.vue";
import {getFlyFlower} from "@/api/module/search";
import {useRouter} from "vue-router";

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
  if (data.text) {
    getFlyFlower(data.text, data.page.pageNum).then((res: any) => {
      if (res.code == 200 && res.data) {
        data.list = res.data.records;
        data.took = res.data.took;
        // 最多显示10000条就行
        data.page.total = Math.min(res.data.total, 10000);
      }
    })
  }
}

// 跳转分页
const handleCurrentChange = (pageNum: any) => {
  data.page.pageNum = pageNum;
  // 深拷贝
  getData();
}

const router = useRouter();
// 去详情页
const toDetail = (id: string) => {
  router.push({
    name: "detail", query: {
      id: id
    }
  });
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

    .search-box {
      margin: 50px 0;
    }

    .fly-content {
      min-height: 700px;
      padding: 25px;

      .fly-title {
        cursor: pointer;

        &:hover {
          color: #409eff;
        }
      }
    }

  }

}

</style>
