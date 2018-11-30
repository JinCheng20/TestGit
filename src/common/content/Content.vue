<template>
<div class="content" ref="content">
    <!-- 创建滚动视图 -->
   <div class="wrap">
        <slot></slot>
    </div>

</div>
</template>

<script>
export default {
    name: 'app-content',
    props: {
        canLoadMore: Boolean
        },
    methods: {
        refresh(){
            this.contentScroll.refresh();
        },
        scrollTo(y){
            this.contentScroll.refresh();
            this.contentScroll.scrollTo(0, y*(-1), 200);
        }
    },
    mounted(){
        //IScroll第一个参数是选择的Dom结构
        //传入一个选择器IScroll内部会执行document.queryselector
        //如果有多个相同名字的选择器 则会得不到想要的dom结构
        //这时候就要用到ref

        //但是！！！ ajax请求数据是异步的 数据请求完成时
        //由于当前dom结构的高度是被内容撑开 创建滚动视图的时候高度为0
        //请求完成后 滚动视图早就创建完成了 所以要刷新一下滚动视图
        this.contentScroll = new IScroll(this.$refs.content,{
            
        });
        this.contentScroll.on('beforeScrollStart',()=>{
            //滚动开始前刷新，识别最新高度            
            this.contentScroll.refresh();
        });
        this.contentScroll.on('scrollEnd', ()=>{
            if(this.contentScroll.y <= this.contentScroll.maxScrollY && this.canLoadMore){
                // console.log('子组件触发loadmore');
                this.$emit('loadmore');
            }   
        });

    }
}
</script>

<style lang="scss" scoped>
.content{
    position: absolute;
    left: 0;
    width: 100%;
    overflow: hidden;
}
</style>

