
<template>
<div class="page">
    <app-content id="location" ref="content">
        <div class="location-content">
            <div class="locationCity" ref="locationCity">
                <div class="title">定位城市</div>
                <div class="text">
                    <span>深圳</span>
                </div>
            </div>
            <div class="recent" ref="recent">
                <div class="title">最近访问城市</div>
                <div class="text">
                    <span>深圳</span>
                    <span>上海</span>
                </div>
            </div>
            <div class="hotCity" ref="hotCity">
                <div class="title">热门城市</div>
                <div class="text">
                    <span v-for="(item, index) in hotCity" :key="index" >{{item.nm}}</span>
                </div>
            </div>
            <div class="cityList" v-for="(item, index) in data" :key="index" ref="list">
                <div class="initial">{{item.key}}</div>
                <ul class="cityList-content" v-for="list in item.value" :key="list.id">
                    <li class="cityList-item" @click="selectCityAction(list)">{{list.nm}}</li>
                </ul>
            </div>
        </div>
    </app-content>
    <nav class="nav-bar">
        <li class="nav-item" v-for="(item, index) in keys" :key="item" @click="btnAction(index)">
            {{item}}
        </li>
    </nav>
</div>
</template>

<script>
import {getCityList} from '../../services/AppServices'
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            data: [],
            keys: [],
            hotCity: [
                {nm: '上海', ci: '10'},
                {nm: '北京', ci: '1'},
                {nm: '广州', ci: '20'},
                {nm: '深圳', ci: '30'},
                {nm: '武汉', ci: '57'},
                {nm: '天津', ci: '40'},
                {nm: '西安', ci: '42'},
                {nm: '南京', ci: '55'},
                {nm: '杭州', ci: '50'},
                {nm: '成都', ci: '59'},
                {nm: '重庆', ci: '45'}
            ]
        }
        
    },
    methods: {
        ...mapActions(['selectCity']),
        btnAction(index){
            //跳转到指定的字母的城市列表中
            //计算需要滚动的高度
            let height = this.$refs.locationCity.offsetHeight + this.$refs.recent.offsetHeight + this.$refs.hotCity.offsetHeight;
            for(let i = 0; i < index; i++){
                height += (this.$refs.list[i].offsetHeight);
            }     
            // //让滚动视图滚动
            this.$refs.content.scrollTo(height);
        },
        selectCityAction(list){
            //将选中的城市保存，保存到全局数据中
            this.selectCity({
                city: list.nm,
                id: list.id
            })
            // 返回上一页
            this.$router.back();
        }
    },
    created() {
        getCityList().then(({data, keys}) => {
            this.data = data;
            this.keys = keys;
        })
    }
}
</script>

<style lang="scss" scoped>
.page{
    width: 100%;
    height: 100%;
}
#location{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    bottom: 0;
    font-size: 14px;
    background: #eee;
    overflow: hidden;
}
.nav-bar{
    position: absolute;
    z-index: 6;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    .nav-item{
        font-size: 14px;
        padding: 0 6px;
    }
}
.location-content{
    z-index: 5;
    background: #eee;
    box-sizing: border-box;
    min-height: 100%;
    .locationCity{
        width: 95%;
        background: #f5f5f5;
        .title{
            background: #eee;
            padding: 5px 10px;
            font-size: 14px;
        }
        .text{
            padding: 10px;
            span{
                display: inline-block;
                padding: 5px 10px;
                background: #fff;
                border-radius: 3px;
            }
        }
    }
    .recent{
        width: 95%;
        background: #f5f5f5;
        .title{
            background: #eee;
            padding: 5px 10px;
            font-size: 14px;
        }
        .text{
            padding: 10px;
            span{
                display: inline-block;
                padding: 5px 30px;
                background: #fff;
                margin-right: 20px;
                border-radius: 3px;

            }
        }
    }
    .hotCity{
        width: 95%;
        background: #f5f5f5;
        .title{
            background: #eee;
            padding: 5px 10px;
            font-size: 14px;
        }
        .text{
            padding: 10px;
            span{
                display: inline-block;
                padding: 5px 30px;
                background: #fff;
                margin-right: 20px;
                margin-bottom: 15px;
                border-radius: 3px;
            }
        }
    }
    .cityList{
        width: 95%;
        background: #f5f5f5;
        .initial{
            background: #eee;
            padding: 5px 10px;
            font-size: 14px;
        }
        .cityList-content{
            .cityList-item{
                border-bottom: 1px solid #ccc;
                padding: 10px;
            }
            .cityList-item:last-child{
                border-bottom: 0;
            }
        }
    }
    
}
</style>

