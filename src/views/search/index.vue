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

                    <el-card class="poetry-card" v-for="item of poetryList">
                        <template #header>
                            <div class="poetry-title">
                                <span>{{ item.title }}</span>
                            </div>
                        </template>

                        <div class="poetry-tags">
                            <span class="tag" v-for="tag of item.tags">{{ tag }}</span>
                        </div>

                        <div class="poetry-content">
                            <p v-for="text of item.content" >{{ text }}</p>
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
                            <el-checkbox-group v-model="tags">
                                <p><el-checkbox label="自信" /></p>
                                <p><el-checkbox label="唐诗三百首"  checked="true"/></p>
                                <p><el-checkbox label="爱情" /></p>
                                <p><el-checkbox label="风景" /></p>
                            </el-checkbox-group>
                        </div>
                    </div>


                    <div class="aside">
                        <div class="aside-title">年代</div>
                        <div class="aside-content">
                            <el-checkbox-group v-model="tags">
                                <p><el-checkbox label="宋朝" /></p>
                                <p><el-checkbox label="唐朝" /></p>
                                <p><el-checkbox label="上下五千年" /></p>
                            </el-checkbox-group>
                        </div>
                    </div>

                    <div class="aside">
                        <div class="aside-title">作者</div>
                        <div class="aside-content">
                            <el-checkbox-group v-model="tags">
                                <p><el-checkbox label="李白" /></p>
                                <p><el-checkbox label="杜甫" /></p>
                                <p><el-checkbox label="王维" /></p>
                            </el-checkbox-group>
                        </div>
                    </div>

                    <div class="aside">
                        <div class="aside-title">类型</div>
                        <div class="aside-content">
                            <el-checkbox-group v-model="tags">
                                <p><el-checkbox label="五言律诗" /></p>
                                <p><el-checkbox label="散文" /></p>
                                <p><el-checkbox label="七言绝句" /></p>
                                <p><el-checkbox label="三字经" /></p>
                                <p><el-checkbox label="三字经三字经三字经三字经三字经" /></p>
                            </el-checkbox-group>
                        </div>
                    </div>
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
    interface PoetryItem{
        title:string,
        author:string,
        content:string[],
        tags:string[]
    }

    interface Aggs{
        key:string,
        size:number,
        values:any[]
    }

    interface Params {
        activeIndex: string,
        keyword: string
    }

    const poetryList = reactive<PoetryItem[]>([]);

    const data: Params = reactive<Params>({
        activeIndex: "/index",
        keyword: ""
    });

    const tags = reactive([]);

    console.log(data)
    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

    const search = () => {
        console.log("keyword:", data.keyword)
    }
    onMounted(() => {
        console.log(poetryList)
        console.log(poetryList.values())
        poetryList.push({
            title:"将进酒",
            author:"李白",
            content:["君不见黄河之水天上来，奔流到海不复回","君君不见高堂明镜悲白发，朝如青..."],
            tags:["自信","豪迈"]
        });
        poetryList.push({
            title:"赠花卿",
            author:"杜甫",
            content:["锦城丝管日纷纷，半入江风半入云"
                ,"此曲只应天上有，人间能得几回闻"
            ],
            tags:["惊艳","感叹"]
        });
        poetryList.push({
            title:"观公孙大娘弟子舞剑器行",
            author:"杜甫",
            content:["大历二年十月十九日，夔府别驾元持宅"
                ,"见临颍李十二娘舞剑器，壮其蔚跂，问其所师，曰：“余公孙大娘弟子也。"
            ,"开元三载，余尚童稚，记于郾城观公孙氏，舞剑器浑脱"],
            tags:["惊艳","感叹"]
        });
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
      overflow: auto;

      .left {
        flex-grow: 1;

        .poetry-card {
          margin-bottom: 20px;


          :deep(.el-card__header){
                //padding-bottom: 0px;
            border: 0px;
          }

          :deep(.el-card__body){
            padding-top: 0px;
          }

          .poetry-title {
            font-size: 26px;

          }

          .poetry-content {
            letter-spacing: 5px;
            padding: 20px 0px;

            p{
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
        width: 350px;
        margin-left: 50px;
        //box-shadow: 0 0 6px rgb(202 203 203 / 50%);
        //-webkit-box-shadow: 0 0 6px rgb(202 203 203 / 50%);
        //background: #cccccc;

        .aside{
            padding: 20px;
            //border: 1px solid #999999;
          background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);

          &:nth-child(n+2){
            margin-top: 20px;
          }

          .aside-title{
            font-size: 26px;
            //background: #fbc2eb;
          }

          .aside-content{
            margin-top: 20px;
          }
        }
      }

    }
  }
</style>
