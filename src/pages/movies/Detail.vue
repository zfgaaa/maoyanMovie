<template>
    <div>
        <div id="detail">
            <div class="wrap">
                <!-- 头部 -->
                <app-header :title="moviceInfo.nm">
                    <div slot="left" class="btn-left iconfont icon-fanhui" @click="detail_back"></div>
                </app-header>
                <!-- 电影信息 -->
                <div class="moviceInfo" @click="toMovieInfo">
                    <div class="img-icon">
                        <img :src="moviceInfo.img" alt="">
                    </div>
                    <div class="content">
                        <p class="moviesName">{{moviceInfo.nm}}</p>
                        <p class="EnglishName">{{moviceInfo.enm}}</p>
                        <p class="score">
                            <span class="score-con">{{moviceInfo.sc}}</span>
                            <span class="score-peopleNum">({{moviceInfo.snum}}人评)</span>
                        </p>
                        <div class="classify">
                            <span class="text">{{moviceInfo.cat}}</span>
                            <span class="bgTag"></span>
                        </div>
                        <p class="intro">{{moviceInfo.fra}}/{{moviceInfo.dur}}分钟</p>
                        <p class="showTime">{{moviceInfo.pubDesc}}</p>
                    </div>
                    <span class="icon iconfont icon-you"></span>
                </div>
                <!-- 当前电影播放的影院内容 -->
                <div class="datailContent">
                    <!-- 日期导航栏 -->
                    <ul class="day">
                        <h-scroll class="wrap">
                            <li class="showDay" v-for="(item, index) in subNavList" :key="index" @click="selectDayActive(index)"
                                :class="{active: selectDayIndex == index}">今天11月23日</li>
                        </h-scroll>
                    </ul>
                    <!-- 电影院分类导航栏 -->
                    <app-subnav style="background: #fff; top: 40px; border-top: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5;">

                    </app-subnav>

                    <!-- 电影院列表 -->
                    <div class="cinemasBox">
                        <div class="cinemaItem" v-for="list in cinemasList" :key="list.id">
                            <div class="cinemaList">
                                <div class="title">
                                    <span class="cinema-name">{{list.nm}}</span>
                                    <span class="price">{{list.sellPrice}}元起</span>
                                </div>
                                <div class="address">
                                    <span class="text">{{list.addr}}</span>
                                    <span class="distance">{{list.distance}}</span>
                                </div>
                                <div class="tag">
                                    <span class="allowRefund" v-show="list.tag.allowRefund">退</span>
                                    <span class="endorse" v-show="list.tag.endorse">改签</span>
                                    <span class="snack" v-show="list.tag.snack">小吃</span>
                                    <span class="vipTag" v-show="list.tag.vipTag">{{list.tag.vipTag}}</span>
                                    <span class="hallType" v-show="list.tag.hallType">CGS中国巨幕厅</span>
                                </div>
                                <div class="vipCard" v-show="list.tag.vipTag">
                                    <span class="vipCardTag">卡</span>
                                    <span class="text">开卡特惠，首单2张优惠</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import {getMovieDetail, getMovieDetailAllData} from '../../services/movieServices'
export default {
    data(){
        return {
            moviceInfo: {},
            cinemasList: [],
            selectDayIndex: 0,
            subNavList: ['今天11月23日', '今天11月23日', '今天11月23日', '今天11月23日']
        }
    },
    methods:{
        detail_back(){
            this.$router.go(-1)
        },
        // 日期导航栏的点击事件
        selectDayActive(index){
            this.selectDayIndex = index
        } ,
        // 跳转到电影介绍页面
        toMovieInfo(){
            this.$router.push('/movies/detail/info')
        }
    },
    created(){
        let ids = localStorage.getItem('moviesId')
        // 请求电影详情
        getMovieDetail(ids).then((result) => {
            this.moviceInfo = result.detailMovie
        })
        var myDate = new Date();
        let day = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
        console.log(day)
        // 请求电影详情页的相关数据
        // movieId,day,cityId
        getMovieDetailAllData(ids, day, this.$store.state.cityID).then((result) => {
            this.cinemasList = result.cinemas
        })
        this.$center.$on('getCinemaList', (msg)=>{
            this.cinemasList = msg
        })
        
    }
}
</script>

<style lang="scss" scoped>
#detail{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: auto;
    background: #fff;
    z-index: 5;
    .moviceInfo{
        position: absolute;
        display: flex;
        top: 44px;
        width: 100%;
        padding: 15px;
        background: #666;
        .img-icon{
            width: 110px;
            height: 150px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .content{
            flex: 1;
            overflow-x: hidden;
            margin-left: 12.5px;
            line-height: 1;
            color: #fff;
            p.moviesName{
                font-size: 20px;
                margin-top: 2px;
                font-weight: 700;
                width: 100%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .EnglishName{
                margin-top: 10px;
                font-size: 12px;
                color: #fff;
                opacity: .8;
            }
            .score{
                font-size: 18px;
                font-weight: 700;
                color: #fc0;
                margin-top: 11px;
                .score-peopleNum{
                    margin-top: 10px;
                    font-size: 12px;
                    color: #fff;
                    opacity: .8;
                }
            }
            .intro{
                margin-top: 10px;
                font-size: 12px;
                color: #fff;
                opacity: .8;
                
            }
            .classify{
                margin-top: 10px;
                font-size: 12px;
                color: #fff;
                opacity: .8;
                .bgTag{
                    display: inline-block;
                    width: 42px;
                    height: 13px;
                    vertical-align: -2px;
                    margin-left: 5px;
                    background-image: url(../../assets/3DIMAX2.png);
                    background-size: 100%;
                }
            }
            .showTime{
                margin-top: 10px;
                font-size: 12px;
                color: #fff;
                opacity: .8;
            }

        }
        .icon{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 10px;
            color: #ccc;
        }
    }
    .datailContent{
        position: absolute;
        top: 224px;
        width: 100%;
        // 日期导航
        .day{
            width: 100%;
            height: 42px;
            overflow: hidden;
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
        // 电影院列表
        .cinemasBox{
            position: absolute;
            top: 80px;
            width: 100%;
            .cinemaList{
                border-bottom: 1px solid #f5f5f5;
                padding: 10px 20px;
                .title{
                    .cinema-name{
                        font-size: 15px;
                        color: #333;
                        margin-right: 10px;
                    }
                    .price{
                        color: #f03d37
                    }
                }
                .address{
                    display: flex;
                    font-size: 12px;
                    color: #757575;
                    margin: 2px 0;
                    .text{
                        flex: 1;
                        overflow:hidden;
                        text-overflow:ellipsis; 
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                    }
                }
                .tag{
                    .allowRefund, .endorse, .hallType{
                        display: inline-block;
                        border: 1px solid #589daf;
                        font-size: 10px;
                        height: 14px;
                        border-radius: 2px;
                        text-align: center;
                        line-height:14px;
                        color: #589daf;
                        padding: 0 2px;
                        margin-right: 5px;
                    }
                    .snack, .vipTag{
                        display: inline-block;
                        border: 1px solid #f90;
                        font-size: 10px;
                        height: 14px;
                        border-radius: 2px;
                        text-align: center;
                        line-height:14px;
                        color: #f90;
                        padding: 0 2px;
                        margin-right: 5px;
                    }
                }
                .vipCard{
                    .vipCardTag{
                        display: inline-block;
                        background: #589daf;
                        font-size: 10px;
                        height: 14px;
                        border-radius: 2px;
                        text-align: center;
                        line-height:14px;
                        color: #fff;
                        padding: 0 2px;
                        margin-right: 5px;
                    }
                    .text{
                        font-size: 11px;
                        color: #757575;
                    }
                }
            }
        }
    }
}
</style>

