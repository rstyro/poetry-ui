<template>
  <div class="container">
    <Header></Header>
    <div class="main">
        about
    </div>
  </div>


</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from 'vue';
import Header from "@/components/Header.vue";

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


  }

}

</style>
