<template>
<div id="search" class="page">
    影院搜索页面
</div>
</template>

<script>
export default {
    props: {
        type: Array
    },
    created(){
        console.log('影院搜索页面加载了');
        console.log(this.type);
    }
}
</script>

<style>

</style>
