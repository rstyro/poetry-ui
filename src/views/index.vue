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
                                 v-model="keyword"
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
                        <div class="value">{{ item.key }}</div>
                        <div class="value">{{ item.value }}</div>
                    </template>
                </el-autocomplete>
                <div class="search-tip-footer">
                    <p>热门检索:
                        <span>李白</span>
                        <span>杜甫</span>
                        <span>王维</span>
                        <span>白居易</span>
                        <span>苏轼</span>
                        <span>胖不了小陆</span>
                    </p>
                    <p>数据来源：https://github.com/chinese-poetry</p>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">
    import {onMounted, reactive, ref} from 'vue';
    import {useRouter} from "vue-router";

    // 提示的对象
    interface SuggestItem {
        key: string
        value: string
    }

    const router = useRouter();
    const suggestKwList = ref<SuggestItem[]>([]);

    const keyword = ref<string>('');

    // todo 提示，自动补全
    const searchSuggest = (kw: string, cb) => {
        console.log("kw=", kw);
        console.log("suggestKwList:", suggestKwList);
        setTimeout(() => {
            suggestKwList.value = [];
            suggestKwList.value.push({
                key: "title",
                value: "李白"
            });
            suggestKwList.value.push({
                key: "content",
                value: "诗仙"
            })
            suggestKwList.value.push({
                key: "title",
                value: "杜甫"
            })
        }, 200);
        cb(suggestKwList.value);
    }
    const selectSuggest = (item: SuggestItem) => {
        console.log("选中提示词:", item.key, item.value);
        keyword.value = item.value;
    }

    const toSearch = () => {
        console.log("q=", keyword.value);
        router.push({
            name: "search", query: {
                q: keyword.value
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
