<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <footer class="tabs">
            <router-link :to="item.path" class="tabItem" v-for="(item, index) in tabsList" :key="index"> 
                <div :class="item.icon"></div>
                <div class="tabsItemText">{{item.name}}</div>
            </router-link>
        </footer>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tabsList: [
                {'name': '电影', 'icon': 'iconfont icon-dianying', 'path': '/movies'},
                {'name': '影院', 'icon': 'iconfont icon-yingyuana', 'path': '/cinema'},
                {'name': '我的', 'icon': 'iconfont icon-wode', 'path': '/mine'}
            ],
            selectIndex: 0
        }
    },
    methods: {
        // tabsActive(index){
        //     console.log(111)
        // }
    }
}
</script>

<style lang="scss">
    html, body, #app{
        height: 100%;
        width: 100%;
    }
    #app{
        .tabs{
            width: 100%;
            height: 49px;
            position: absolute;
            left: 0;
            bottom: 0;
            border-top: 1px solid #ccc;
            display: flex;
            .tabItem{
                flex: 1;
                text-align: center;
                .tabsItemText{
                    margin-top: 2px;
                    font-size: 10px;
                }
                .iconfont{
                    margin-top: 7px;
                    font-size: 20px;
                }
                &.router-link-active{
                    color: #e54847;
                }
            }
        }

    }
</style>
