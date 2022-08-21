<template>
    <div class="container">
        <Header></Header>
        <div class="main">
            <div class="main-header">
                <div class="main-header-input">
                    <el-input v-model="dto.kw"
                              size="large"
                              @keydown.enter="search"
                              placeholder="请输入搜索的关键字">
                        <template #append>
                            <el-button class="btn-search"

                                       @click="search">
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
            <div class="content">
                <div class="left">
                    <el-card class="poetry-card" v-for="item of data.poetryList">
                        <template #header>
                            <div class="poetry-title">
                                <span>{{ item.title }}</span>
                            </div>
                        </template>

                        <div class="poetry-tags">
                            <span class="tag" v-for="tag of item.tags">{{ tag }}</span>
                        </div>

                        <div class="poetry-content">
                            <p v-for="(text,index) in item.content.slice(0,3)">{{ index < 2 ? text : '......' }}</p>
                        </div>

                        <div style="width: 150px;float: right">
                            <el-divider content-position="right">{{ item.author }}</el-divider>
                        </div>
                    </el-card>


                </div>
                <div class="right">
                    <div class="aside">
                        <div class="aside-title">标签</div>
                        <div class="aside-content">
                            <el-checkbox-group v-model="dto.filters.tags"
                                               @change="checkboxChange">
                                <p v-for="tag in data.tags">
                                    <el-checkbox :label="tag.key">{{ tag.key }} ({{ tag.docCount }})</el-checkbox>
                                </p>
                            </el-checkbox-group>
                        </div>
                    </div>


                    <div class="aside">
                        <div class="aside-title">年代</div>
                        <div class="aside-content">
                            <el-checkbox-group v-model="dto.filters.dynastyList"
                                               @change="checkboxChange">
                                <p v-for="tag in data.dynastyList">
                                    <el-checkbox :label="tag.key">{{ tag.key }} ({{ tag.docCount }})</el-checkbox>
                                </p>
                            </el-checkbox-group>
                        </div>
                    </div>

                    <div class="aside">
                        <div class="aside-title">作者</div>
                        <div class="aside-content">
                            <el-checkbox-group v-model="dto.filters.authorList"
                                               @change="checkboxChange">
                                <p v-for="tag in data.authorList">
                                    <el-checkbox :label="tag.key">{{ tag.key }} ({{ tag.docCount }})</el-checkbox>
                                </p>
                            </el-checkbox-group>
                        </div>
                    </div>

                    <div class="aside">
                        <div class="aside-title">类型</div>
                        <div class="aside-content">
                            <el-checkbox-group v-model="dto.filters.typeList"
                                               @change="checkboxChange">
                                <p v-for="tag in data.typeList">
                                    <el-checkbox :label="tag.key">{{ tag.key }}({{ tag.docCount }})</el-checkbox>
                                </p>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">
    import {onMounted, reactive, ref, watch} from 'vue';
    import Header from "@/components/Header.vue";
    import {getSearchList} from "@/api/module/search";
    import {useRouter, useRoute} from "vue-router";
    import gaps from 'gsap';

    components:{
        Header
    }

    // data数据对象
    interface Data {
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

    const dto: Dto = reactive({
        kw: '',
        needRecords: true,
        aggsList: [
            {
                "key": "type",
                "size": 10
            },
            {
                "key": "dynasty",
                "size": 10
            },
            {
                "key": "tags",
                "size": 10
            },
            {
                "key": "author.keyword",
                "size": 10
            }

        ],
        filters: {},
    });

    // 下拉选中
    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

    // 点击搜索
    const search = () => {
        console.log("点击搜索=keyword:", data.keyword);
        console.log("点击搜索=dto:", dto);
        getSearchList(dto).then((res: any) => {
            console.log("res:", res);
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
            // 结果集
            data.took = res.data.took;
            data.total = res.data.total;
            data.poetryList = res.data.records;
        })
    }

    const checkboxChange = (value: string[]) => {
        console.log("多选框：value：", value);
        search();
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
