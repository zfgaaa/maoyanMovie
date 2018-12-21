<template>
    <div>                                               
        <app-header :title="cinemaData.nm">
            <div slot="left" class="btn-left iconfont icon-fanhui" @click="detail_back"></div>
        </app-header>
        <div id="cinemaDetail">
            <!-- 地址   定位 -->
            <div class="address">
                <div class="left">
                    <p class="cinemaName">{{cinemaData.nm}}</p>
                    <p class="addressText">{{cinemaData.addr}}</p>
                </div>
                <div class="right">
                    <span class="iconfont icon-27"></span>
                </div>
            </div>

            <!-- 轮播图 -->
            <div class="swipper">

            </div>
            <!-- 相应电影的名字等 -->
            <div class="bot">
                <p class="title">
                    <span class="name">{{showData.movies[0].nm}}</span>
                    <span class="score">{{showData.movies[0].sc}}分</span>
                </p>
                <p class="intro">{{showData.movies[0].desc}}</p>
            </div>
            <!-- 日期导航栏 -->
            <ul class="day">
                <h-scroll class="wrap">
                    <li class="showDay" v-for="(item, index) in subNavList" :key="index" @click="selectDayActive(index)"
                        :class="{active: selectDayIndex == index}">今天11月23日</li>
                </h-scroll>
            </ul>
            <!-- 折扣卡 -->
            <div class="tag">
                <div class="vipTag">
                    <span>{{showData.vipInfo[0].tag}}</span>
                </div>
                <div class="text">
                    <p>{{showData.vipInfo[0].title}}</p>
                </div>
                <div class="price">
                    <span>{{showData.vipInfo[0].process}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {getCinemaDetailData} from '../../services/cinemaServices'
export default {
    data(){
        return {
            cinemaId: '',
            cinemaData: {},
            dealList: {},
            showData: {},
            stone: {},
            selectDayIndex: 0,
            subNavList: ['今天11月23日', '今天11月23日', '今天11月23日', '今天11月23日']
        }
    },
    methods:{
        detail_back(){
            this.$router.back()
        },
        // 日期导航栏的点击事件
        selectDayActive(index){
            this.selectDayIndex = index
        } ,
    },
    created(){
        this.cinemaId = localStorage.getItem('cinemaId')
        getCinemaDetailData(this.cinemaId).then((msg) => {
            this.cinemaData = msg.cinemaData
            this.dealList = msg.dealList
            this.showData = msg.showData
            this.stone = msg.stone
            console.log(this.cinemaData)
            console.log(this.dealList)
            console.log(this.showData)
            console.log(this.stone)
        })
    }
}
</script>

<style lang="scss" scoped>
#cinemaDetail{
    width: 100%;
    position: absolute;
    top: 44px;
    left: 0;
    bottom: -44px;
    z-index: 10;
    background: #eee;
    .address{
        width: 100%;
        height: 75px;
        display: flex;
        background: #fff;
        .left{
            width: 80%;
            height: 100%;
            padding: 10px;
            .cinemaName{
                font-size: 17px;
                line-height: 24px;
                font-weight: 700;
                color: #333;
            }
            .addressText{
                margin-top: 2px;
                font-size: 13px;
                line-height: 18.5px;
                color: #999;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
        }
        .right{
            width: 20%;
            flex: 1;
            height: 100%;
            text-align: center;
            .iconfont{
                line-height: 75px;
                font-size: 20px;
                color: blue;
            }
        }
    }
    .swipper{
        width: 100%;
        height: 135px;
        background: #666;
    }
    .bot{
        width: 100%;
        height: 66px;
        padding: 10px;
        text-align: center;
        background: #fff;
        border-bottom: 1px solid #ccc;
        .title{
            line-height: 24px;
            font-size: 17px;
            color: #333;
            font-weight: 700;
            .score{
                color: #ffb400;
                font-size: 16px;
                margin-left: 5px;
            }
        }
        .intro{
            margin-top: 2px;
            height: 18.5px;
            line-height: 18.5px;
            font-size: 13px;
            color: #999;
        }
    }
    // 日期导航
    .day{
        width: 100%;
        height: 40px;
        overflow: hidden;
        background: #fff;
        .showDay{
            display: inline-block;
            width: 115px;
            height: 40px;
            line-height: 42px;
            text-align: center;
            margin: 0 5px;
            font-size: 14px;
        }
        .active{
            border-bottom: 2px solid #f03d37;
            color: #f03d37;
        }
    }
    // 折扣卡
    .tag{
        width: 100%;
        height: 40px;
        padding: 0 10px;
        display: flex;
        background: #fff5ea;
        .vipTag{
            width: 45px;
            height: 100%;
            line-height: 35px;
            span{
                display: inline-block;
                font-size: 10px;
                width: 34px;
                height: 15px;
                border-radius: 2px;
                line-height: 15px;
                text-align: center;
                background: #ff941a;
                color: #fff;
            }
        }
        .text{
            flex: 1;
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            color: #fa9600;
            font-size: 12px;
            line-height: 40px;
        }
        .price{
            flex: 0 0 auto;
            line-height: 42px;
            color: #999;
            font-size: 12px;
        }
    }
}
</style>

