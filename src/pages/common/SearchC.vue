<template>
    <div id="searchC">
        <app-header title="猫眼电影">
            <div slot="left" class="btn-left iconfont icon-fanhui" @click="backSearch"></div>
        </app-header>
        <div class="inpBox">
            <span class="iconfont icon-sousuo"></span>
            <input type="text" class="searchInp" placeholder="搜影院" v-model="value">
            <span class="btnCancel" @click="cancelActive">取消</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            value: ''
        }
    },
    methods: {
        backSearch(){
            this.$router.go(-1)
        },
        cancelActive(){
            this.$router.go(-1)
        }
    },
    watch: {
        value: function(){
            console.log(this.value)
        }
    }
    
}
</script>

<style lang="scss" scoped>
#searchC{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: -49px;
    background: #f5f5f5;
    z-index: 5;
     .inpBox{
        display: flex;
        width: 100%;
        height: 47px;
        background: #f5f5f5;
        position: absolute;
        top: 44px;
        padding: 8px 15px;
        .iconfont{
            position: absolute;
            top: 15px;
            left: 25px;
            color: #ccc;
        }
        .searchInp{
            flex: 1;
            border: 0;
            height: 100%;
            padding-left: 35px;
            border-radius: 3px;
        }
        .btnCancel{
            display: inline-block;
            color: #f03d37;
            font-size: 18px;
            height: 100%;
            margin-left: 10px;
        }
    }
}
</style>

