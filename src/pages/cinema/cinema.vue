<template>
    <div class="cinema">
        <app-header title="影院"></app-header>
        <div class="subSearch">
            <span class="address" @click="locationCity">{{city}}</span>
            <div class="search" @click="btnSearch">
                <span class="iconfont icon-sousuo">搜影院</span>
            </div>
            <span></span>
        </div>
        <app-subnav></app-subnav>
        <app-content class="cinema-content" @loadCinema='loadCinemaData' ref="content">
            <div class="cinemaItem" v-for="list in cinemaList" :key="list.id" @click="toCinemaDetail(list.id)">
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
        </app-content>
        <router-view></router-view>
    </div>
</template>

<script>
import {getCinemaList, getCinemaMoreList} from '../../services/cinemaServices'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            cinemaList: [],
            cinemaOffset: 0,
        }
    },
    computed: {
        ...mapState(['city'])
    },
    methods: {
        loadCinemaData(){
            this.cinemaOffset += 20;
            // 请求电影院数据
            getCinemaMoreList(this.cinemaOffset, this.$store.state.cityID).then((result)=>{
                this.cinemaList = [...this.cinemaList, ...result.cinemas]
            })
        },
        // 点击定位城市跳转到定位页面
        locationCity(){
            this.$router.push('/movies/location')
        },
        //点击搜索跳转到搜索页面
        btnSearch(){
            this.$router.push('/cinema/searchC')
        },
        // 点击跳转到电影院详情页面
        toCinemaDetail(cinemaId){
            localStorage.setItem('cinemaId', cinemaId)
            this.$router.push('/cinema/cinemaDetail')
        }
        
    },
    created(){
        getCinemaList(this.$store.state.cityID, ).then((result)=> {
            this.cinemaList = result.cinemas
            this.cinemaOffset = result.paging.offset
        })
        this.$center.$on('getCinemaList', (msg)=>{
            this.cinemaList = msg
        })
    }
    
}
</script>

<style lang="scss" scoped>
.cinema{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 49px;
    .subSearch{
        box-sizing: border-box;
        padding: 10px;
        position: absolute;
        top: 44px;
        height: 44px;
        background: #f5f5f5;
        width: 100%;
        display: flex;
        .address{
            margin-right: 15px;
            font-size: 14px;
            color: #666;
            &::after{
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border: 4px solid transparent;
                border-top: 4px solid #666;
                transform: translate(4px, 1px);
            }
        }
        .search{
            flex: 1;
            display: flex;
            height: 28px;
            font-size: 13px;
            color: #b2b2b2;
            margin-top: -2px;
            margin-left: 18px;
            border: .5px solid #e6e6e6;
            border-radius: 5px;
            margin-right: 15px;
            background: #fff;
            text-align: center;
            span{
                margin: 0 auto;
                line-height: 28px;
                font-size: 14px;
                padding-left: 5px;
            }
        }
    }
    

    .cinema-content{
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 124px;
        left: 0;
        bottom: 0;
        padding: 15px;
        
        .cinemaList{
            border-bottom: 1px solid #f5f5f5;
            padding-bottom: 15px;
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
</style>
