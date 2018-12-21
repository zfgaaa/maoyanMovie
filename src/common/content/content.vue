<template>
    <div id="content" ref="content">
        <div class="wrap">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app-content',
    methods: {
        refresh(){
            this.contentScroll.refresh();
        },
        scrollTo(y){
            this.contentScroll.refresh();
            this.contentScroll.scrollTo(0, y*(-1), 200)
        }
    },
    mounted(){
        this.contentScroll = new IScroll(this.$refs.content,{
            mouseWheel: false,
            scrollbars: false
        })
        this.contentScroll.on('beforeScrollStart', ()=>{
            //滚动开始前刷新 识别最新高度
            this.contentScroll.refresh();
        })
        this.contentScroll.on('scrollEnd', ()=>{
            if(this.contentScroll.y <= this.contentScroll.maxScrollY){
                this.$emit('loadMore')
                this.$emit('loadMoreComing');
                this.$emit('loadCinema')
            }
        })
    }
}

</script>
<style lang="scss">
#content{
    width: 100%;
    position: absolute;
    overflow: hidden;
}
</style>

