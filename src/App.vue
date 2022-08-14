<template>
    <router-view/>
</template>

<script setup lang="ts">
    import {onMounted, reactive} from 'vue';

    const data = reactive({
        params: null,
    });
    onMounted(() => {
        console.log("Hello Word")
    })
</script>

<style lang="scss">

</style>
