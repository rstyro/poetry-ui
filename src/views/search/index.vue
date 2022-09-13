<template>
  <div class="container">
    <Header></Header>
    <div class="main">
      <div class="main-header">
        <div class="main-header-input">
          <el-input v-model="dto.kw"
                    :clearable="true"
                    size="large"
                    @keydown.enter="toSearch"
                    placeholder="请输入搜索的关键字">
            <template #append>
              <el-button class="btn-search"

                         @click="toSearch">
                <el-icon class="el-icon--left">
                  <i-ep-search/>
                </el-icon>
                搜索
              </el-button>
            </template>
          </el-input>
        </div>
      </div>

      <div class="result">为您找到相关结果约 {{ data.totalNum.toFixed(0) }} 个结果 ，查询耗时 {{ data.took }}毫秒</div>
      <div v-show="data.poetryList.length>0" class="content">
        <div class="left">
          <el-card class="poetry-card" v-for="item of data.poetryList">
            <template #header>
              <div class="poetry-title title-animate">
                <span @click="toDetail(item._id)" v-html="`${item.title.length>27?item.title.slice(0,27)+'....':item.title}`"></span>
              </div>
            </template>

            <div class="poetry-tags">
              <span class="tag" v-for="tag of item.tags">{{ tag }}</span>
            </div>

            <div class="poetry-content">
              <p v-for="(text,index) in item.content.slice(0,3)" v-html="`${index < 2 ? text : '......'}`"></p>
            </div>

            <div style="width: 150px;float: right">
              <el-divider content-position="right"><span v-html="item.author"></span></el-divider>
            </div>
          </el-card>


          <div class="content-page">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="data.page.pageNum"
                :pager-count="11"
                layout="prev, pager, next"
                :total="data.page.total"
            />
          </div>

        </div>

        <div class="right">

          <el-collapse v-model="data.activeNames">
            <el-collapse-item title="标签" name="tags">
              <template #title>
                <h2 class="collapse-title">标签</h2>
              </template>

              <el-checkbox-group v-model="dto.filters.tags"
                                 @change="checkboxChange">
                <p v-for="tag in data.tags">
                  <el-checkbox :label="tag.key">{{ tag.key }} ({{ tag.docCount }})</el-checkbox>
                </p>
              </el-checkbox-group>
            </el-collapse-item>

            <el-collapse-item title="年代" name="dynastyList">
              <template #title>
                <h2 class="collapse-title">年代</h2>
              </template>
              <el-checkbox-group v-model="dto.filters.dynastyList"
                                 @change="checkboxChange">
                <p v-for="tag in data.dynastyList">
                  <el-checkbox :label="tag.key">{{ tag.key }} ({{ tag.docCount }})</el-checkbox>
                </p>
              </el-checkbox-group>
            </el-collapse-item>

            <el-collapse-item title="作者" name="authorList">
              <template #title>
                <h2 class="collapse-title">作者</h2>
              </template>
              <el-checkbox-group v-model="dto.filters.authorList"
                                 @change="checkboxChange">
                <p v-for="tag in data.authorList">
                  <el-checkbox :label="tag.key">{{ tag.key }} ({{ tag.docCount }})</el-checkbox>
                </p>
              </el-checkbox-group>
            </el-collapse-item>


            <el-collapse-item title="类型" name="typeList">
              <template #title>
                <h2 class="collapse-title">类型</h2>
              </template>
              <el-checkbox-group v-model="dto.filters.typeList"
                                 @change="checkboxChange">
                <p v-for="tag in data.typeList">
                  <el-checkbox :label="tag.key">{{ tag.key }}({{ tag.docCount }})</el-checkbox>
                </p>
              </el-checkbox-group>
            </el-collapse-item>

          </el-collapse>


<!--          <div class="aside">-->
<!--            <div class="aside-title">标签</div>-->
<!--            <div class="aside-content">-->
<!--              <el-checkbox-group v-model="dto.filters.tags"-->
<!--                                 @change="checkboxChange">-->
<!--                <p v-for="tag in data.tags">-->
<!--                  <el-checkbox :label="tag.key">{{ tag.key }} ({{ tag.docCount }})</el-checkbox>-->
<!--                </p>-->
<!--              </el-checkbox-group>-->
<!--            </div>-->
<!--          </div>-->


<!--          <div class="aside">-->
<!--            <div class="aside-title">年代</div>-->
<!--            <div class="aside-content">-->
<!--              <el-checkbox-group v-model="dto.filters.dynastyList"-->
<!--                                 @change="checkboxChange">-->
<!--                <p v-for="tag in data.dynastyList">-->
<!--                  <el-checkbox :label="tag.key">{{ tag.key }} ({{ tag.docCount }})</el-checkbox>-->
<!--                </p>-->
<!--              </el-checkbox-group>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="aside">-->
<!--            <div class="aside-title">作者</div>-->
<!--            <div class="aside-content">-->
<!--              <el-checkbox-group v-model="dto.filters.authorList"-->
<!--                                 @change="checkboxChange">-->
<!--                <p v-for="tag in data.authorList">-->
<!--                  <el-checkbox :label="tag.key">{{ tag.key }} ({{ tag.docCount }})</el-checkbox>-->
<!--                </p>-->
<!--              </el-checkbox-group>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="aside">-->
<!--            <div class="aside-title">类型</div>-->
<!--            <div class="aside-content">-->
<!--              <el-checkbox-group v-model="dto.filters.typeList"-->
<!--                                 @change="checkboxChange">-->
<!--                <p v-for="tag in data.typeList">-->
<!--                  <el-checkbox :label="tag.key">{{ tag.key }}({{ tag.docCount }})</el-checkbox>-->
<!--                </p>-->
<!--              </el-checkbox-group>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
      <el-skeleton class="loading-skeleton" v-show="data.poetryList.length==0" :rows="5" animated />

    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from 'vue';
import Header from "@/components/Header.vue";
import {getSearchList} from "@/api/module/search";
import {sleep} from "@/assets/js/utils";
import {useRouter, useRoute} from "vue-router";
import gaps from 'gsap';

components:{
  Header
}

// data数据对象
interface Data {
  activeNames: string,
  keyword: string,
  total: number,
  totalNum: number,
  took: number,
  poetryList: any[],
  tags: any[],
  dynastyList: any[],
  authorList: any[],
  typeList: any[],
  page: any
}

// 右侧 过滤项
interface FilterDto {
  tags: string[],
  dynastyList: string[],
  authorList: string[],
  typeList: string[]
}

// 请求的参数类
interface Dto {
  kw: string,
  needRecords: boolean,
  aggsList: any[],
  filters: FilterDto,
}


const router = useRouter();
const route = useRoute();

// 数据初始化
const data: Data = reactive<Data>({
  activeNames : "tags",
  keyword: "",
  total: 0,
  totalNum: 0,
  took: 100,
  poetryList: [],
  tags: [],
  dynastyList: [],
  authorList: [],
  typeList: [],
  page: {
    pageNum:1,
    total:0
  }
});

// 参数
const dto: Dto = reactive({
  kw: '',
  needRecords: true,
  aggsList: [
    {
      "key": "type",
      "size": 1000
    },
    {
      "key": "dynasty",
      "size": 1000
    },
    {
      "key": "tags",
      "size": 1000
    },
    {
      "key": "author.keyword",
      "size": 1000
    }

  ],
  filters: {},
});



// 新的关键词检索
const toSearch = () => {
  router.push({
    name: "search", query: {
      q: dto.kw
    }
  });
  search();
}

// 首次获取数据
const search = () => {
  data.page.pageNum=1;
  getData(dto,1);
}

// 请求数据
const getData=(param:any,pageNum:number)=>{
  data.poetryList =[];
  // await sleep(2000).then(() => {
  //   console.log(".....")
  // });
  getSearchList(param,pageNum).then((res: any) => {
    if(res.data?.aggregation && res.data?.aggregation?.length>0){
      let tagsList = res.data.aggregation.filter(item => item.key === 'tags');
      if (tagsList) {
        data.tags = tagsList[0]?.list;
      }
      let dynastyList = res.data.aggregation.filter(item => item.key === 'dynasty');
      if (dynastyList) {
        data.dynastyList = dynastyList[0]?.list;
      }
      let authorList = res.data.aggregation.filter(item => item.key === 'author.keyword');
      if (authorList) {
        data.authorList = authorList[0]?.list;
      }
      let typeList = res.data.aggregation.filter(item => item.key === 'type');
      if (typeList) {
        data.typeList = typeList[0]?.list;
      }
    }
    // 结果集
    if(res.data){
      data.took = res.data.took;
      data.total = res.data.total;
      // 最多分页10000条
      data.page.total = Math.min(res.data.total,10000);
      data.poetryList = res.data.records;
    }
  })
}

// 跳转分页
const handleCurrentChange = (pageNum:any) => {
  data.page.pageNum=pageNum;
  // 深拷贝
  let param = JSON.parse(JSON.stringify(dto));
  param.aggsList=[];
  getData(param,pageNum);
}

// 多选框的监听
const checkboxChange = (value: string[]) => {
  search();
}

// 去详情页
const toDetail = (id: string) => {
  router.push({
    name: "detail", query: {
      id: id
    }
  });
}

// 监听一下总数变化
watch(() => data.total, (newVal, oldVal) => {
  gaps.to(data, {
    duration: 0.5,
    totalNum: newVal
  })
});


onMounted(() => {
  // 得到地址栏q参数
  dto.kw = <string>route.query?.q;
  search();
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

  .loading-skeleton{
    max-width: $mainWidth;
    margin: 0px auto;
  }

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
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
          outline: none;
          border-radius: 5px;
          padding-left: 0px;
          padding-right: 10px;

        }

        /*标题特效*/
        .title-animate {
          height: 40px;
          line-height: 42px;
          border: none;

          /*线条颜色*/
          $lineColor: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
          //$lineColor: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);


          &:before, &:after {
            position: absolute;
            content: "";
            right: 0;
            top: 0;
            background: $lineColor;
            transition: all 0.3s ease;
            margin-right: 10px;
          }

          &:before {
            height: 0%;
            width: 2px;
          }

          &:after {
            width: 0%;
            height: 2px;
          }

          &:hover {
            background: transparent;
            box-shadow: none;
          }

          &:hover:before {
            height: 100%;
          }

          &:hover:after {
            width: 100%;
          }


          span {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            //padding: 0 10px;
            padding-right: 10px;

            &:hover {
              //color: rgba(2,126,251,1);
            }

            &:before,
            &:after {
              position: absolute;
              content: "";
              left: 0;
              bottom: 0;
              margin-left: -10px;
              background: $lineColor;
              transition: all 0.3s ease;
            }

            &:before {
              width: 2px;
              height: 0%;

            }

            &:after {
              width: 0%;
              height: 2px;
            }

            &:hover:before {
              height: 100%;
            }

            &:hover:after {
              width: 100%;
            }
          }


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

      .content-page {
        margin-top: 80px;
      }

    }

    .right {
      min-width: 350px;
      margin-left: 50px;
      position: relative;

      .collapse-title{
        vertical-align: middle;

        span,i{
          vertical-align: middle;
        }
      }

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
