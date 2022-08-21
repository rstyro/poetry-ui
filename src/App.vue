<template>
    <router-view #default="{route,Component}">
        <transition :enter-active-class="`animate__animated  ${route.meta.transition}`">
            <component :is="Component"></component>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
    import 'animate.css';
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
