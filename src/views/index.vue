<template>
    <div class="container">
        <div class="main">
            <div class="main-inner">
                <div class="search-tip">
                    <h1>古文检索</h1>
                    <p>这是一个最全的中华古典文集数据库检索系统</p>
                    <p>包含 5.5 万首唐诗、26 万首宋诗、2.1 万首宋词和其他古典文集。诗人包括唐宋两朝近 1.4 万古诗人，和两宋时期 1.5 千古词人。数据来源于互联网。</p>
                </div>
                <el-autocomplete class="search-input"
                                 v-model="dto.kw"
                                 :clearable="true"
                                 :fetch-suggestions="searchSuggest"
                                 popper-class="my-autocomplete"
                                 placeholder="请输入搜索的关键字,按下回车键 即可搜索"
                                 @select="selectSuggest"
                                 @keydown.enter="toSearch"
                >
                    <template #prefix>
                        <el-icon class="el-icon--left">
                            <i-ep-search/>
                        </el-icon>
                    </template>

                    <template #default="{ item }">
                        <div class="suggest-type">{{ item.type }}</div>
                        <div class="suggest-text">{{ item.text.length>30?item.text.slice(0,30)+'...':item.text }}</div>
                    </template>
                </el-autocomplete>
                <div class="search-tip-footer">
                    <p>热门检索:
                        <span @click="goSearch('李白')">李白</span>
                        <span @click="goSearch('杜甫')">杜甫</span>
                        <span @click="goSearch('王维')">王维</span>
                        <span @click="goSearch('白居易')">白居易</span>
                        <span @click="goSearch('苏轼')">苏轼</span>
                        <span @click="goSearch('胖不了小陆')">胖不了小陆</span>
                    </p>
                    <p>数据来源：https://github.com/chinese-poetry/chinese-poetry</p>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">
    import {onMounted, reactive, ref} from 'vue';
    import {useRouter} from "vue-router";
    import {getSuggest} from "@/api/module/search";

    // 提示的对象
    interface SuggestItem {
        type: string
        text: string
    }
    interface Dto {
        kw: string
    }

    const router = useRouter();
    const suggestKwList = ref<SuggestItem[]>([]);
    const dto = reactive<Dto>({
        kw:''
    });

    // todo 提示，自动补全
    const searchSuggest = (kw: string, cb:(arg: any) => void) => {
        if(dto.kw){
            getSuggest(dto).then((res)=>{
                if(res.code == 200 && res.data){
                    suggestKwList.value=res.data;
                    cb(suggestKwList.value);
                }
            })
        }else {
            cb([]);
        }
    }

    const selectSuggest = (item: SuggestItem) => {
        console.log("选中提示词:", item.type, item.text);
        dto.kw = item.text;
    }

    const toSearch = () => {
        console.log("q=", dto.kw);
        router.push({
            name: "search", query: {
                q: dto.kw
            }
        });
    }

    const goSearch=(kw)=>{
        router.push({
            name: "search", query: {
                q: kw
            }
        });
    }

    onMounted(() => {
        //todo 初始化操作
    })
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100vh;
    background: #111 url('@/assets/images/bg.jpg') no-repeat center;
  }

  .suggest-type{
    display: inline-block;
    margin-right: 20px;
    color: #999;
    width: 60px;
  }
  .suggest-text{
    display: inline-block;
  }

  .main {
    padding-top: 30vh;
    text-align: center;
    color: white;

    .main-inner {
      margin: 0px auto;
      padding: 0px 20px;

      .search-tip {
        padding: 10px 0px;

        h1 {
          letter-spacing: 10px;
        }

        p {
          word-spacing: 5px;
          letter-spacing: 2px;
          padding-bottom: 5px;
        }
      }

      .search-tip-footer {
        margin-top: 10px;
        color: #ccc;

        p {
          margin-bottom: 10px;

          span {
            display: inline-block;
            margin-right: 10px;
            &:hover{
              cursor: pointer;
              color: #f88a05;
            }
          }
        }

      }

      :deep(.el-input__wrapper) {
        height: 45px;
        width: 40vw !important;
      }
    }
  }
</style>
