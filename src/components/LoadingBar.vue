<template>
    <div class="warps">
        <div ref="bar" class="bar"></div>
    </div>
</template>

<script setup lang="ts">
    import {ref} from 'vue';
    import TweenLite from 'gsap';

    // 进度条百分比
    const speed = ref<number>(1);
    // 指向进度条元素
    const bar = ref<HTMLElement>();
    //任务ID
    const taskId = ref<number>(1);

    const  start=()=>{
        let dom = bar.value as HTMLDivElement;
        dom.style.opacity="1";
        speed.value=1;
        taskId.value = window.requestAnimationFrame(function fn(){
            if(speed.value<90){
                speed.value+=1;
                dom.style.width=speed.value+"%";
                // 递归
                taskId.value=window.requestAnimationFrame(fn);
            }else {
                speed.value=1;
                window.cancelAnimationFrame(taskId.value);
            }
        })
    }
    const  end=()=>{
        let dom = bar.value as HTMLDivElement;
        setTimeout(()=>{
            window.requestAnimationFrame(()=>{
                speed.value=100;
                dom.style.width=speed.value+"%";
                // 1s 慢慢消失
                TweenLite.fromTo(dom, 1, {opacity:1}, {opacity:0});
            })
        },300);
    }
    // 暴露出去
    defineExpose({
        start,
        end
    })
</script>

<style scoped lang="scss">
    .warps{
      position: fixed;
      top:0px;
      height: 2px;
      width: 100%;

      .bar{
        height: inherit;
        width: 0px;
        background: #00ff05;
      }
    }
</style>
