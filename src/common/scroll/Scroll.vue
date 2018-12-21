<template>
    <div class="scroll" ref="scroll">
        <div class="wrap" :style="{width: width + 'px'}">
            <slot/>
        </div>
    </div>
</template>

<script>
import {getMostExpectedMore} from '../../services/movieServices'
export default {
    name: 'h-scroll',
    data(){
        return{
            width: 0,
        }
    },
    mounted() {
        scroll = new IScroll(this.$refs.scroll,{
            scrollX: true,
            scrollY: false,
        }),
        // 动态计算需要滚动的宽度
        scroll.on('beforeScrollStart', ()=>{
            scroll.refresh();
            let width = 0
            this.$slots.default.map(item=>{
                width += (item.elm.offsetWidth)
            })
            this.width = width;
        })
        scroll.on('scrollEnd',()=>{
            if(scroll.x <= scroll.maxScrollX){
                getMostExpectedMore().then(({})=>{
                    this.$emit('loadMoreScroll')
                })
            }
        })
    }
}
</script>

<style>
.scroll{
    overflow: hidden;
    white-space: nowrap;
}
</style>
