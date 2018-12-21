<template>
    <div id="searchCM">
        <app-header title="猫眼电影">
            <div slot="left" class="btn-left iconfont icon-fanhui" @click="backSearch"></div>
        </app-header>
        <div class="inpBox">
            <span class="iconfont icon-sousuo"></span>
            <input type="text" class="searchInp" placeholder="搜电影、搜影院" v-model="value">
            <span class="btnCancel" @click="cancelActive">取消</span>
        </div>
        <div class="searchContent">
            <p v-show="!value" class="hotSearch">热门搜索</p>
            <!-- movies -->
            <div class="searchMovies">
                <p class="title" v-show="value">电影/电视剧/综艺</p>
                <ul class="moviesData" v-show="value">
                    <li class="moviesList" v-for="item in movies" :key="item.id">
                        <div class="img-con">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="moviesInfo">
                            <p class="nameTitle">
                                <span class="moviesName">{{item.nm}}</span>
                                <span class="moviesScore">{{item.sc}}分</span>
                            </p>
                            <p class="EnglishName">{{item.enm}}</p>
                            <p class="catogary">{{item.cat}}</p>
                            <p class="playTime">{{item.rt}}</p>
                        </div>
                    </li>
                    <p class="more" v-show="moviesMoreFlag">查看全部{{moviesMore}}部影视剧</p>
                </ul>
            </div>
            <!-- cinema -->
            <div class="searchCinema" v-show="cinemasMoreFlag">
                <p class="title" v-show="cinemasMoreFlag">影院</p>
                <div class="cinemaItem" v-for="list in cinemas" :key="list.id">
                    <div class="cinemaList">
                        <div class="cinemaTitle">
                            <span class="cinema-name">{{list.nm}}</span>
                            <span class="price">{{list.sellPrice}}元起</span>
                        </div>
                        <div class="address">
                            <span class="text">{{list.addr}}</span>
                            <span class="distance">{{list.distance}}</span>
                        </div>
                        <div class="tag">
                            <span class="allowRefund" v-show="list.allowRefund">退</span>
                            <span class="endorse" v-show="list.endorse">改签</span>
                            <span class="snack" v-show="list.snack">小吃</span>
                            <span class="vipTag" v-show="list.vipDesc">{{list.vipDesc}}</span>
                            <span class="hallType" v-show="list.hallType">CGS中国巨幕厅</span>
                        </div>
                    </div>
                </div>
                <p class="more" v-show="cinemasMoreFlag">查看全部{{cinemasMore}}家影院</p>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import {getSearchCM} from '../../services/AppServices'
export default {
    data(){
        return {
            value: '',
            movies: [],
            cinemas: [],
            moviesMore: '',
            moviesMoreFlag: false,
            cinemasMore: '',
            cinemasMoreFlag: false
        }
    },
    watch: {
        value: function(){
            if(this.value != ''){
                getSearchCM(this.value).then(result=>{
                    //如果请求的数据中没有影院
                    if(!result.cinemas){
                        this.movies = result.movies.list
                        this.moviesMore = result.movies.total
                    }else if(result.cinemas){
                        this.movies = result.movies.list
                        this.moviesMore = result.movies.total
                        this.cinemas = [result.cinemas.list[0], result.cinemas.list[1], result.cinemas.list[2]]
                        this.cinemasMore = result.cinemas.total
                    }
                    
                    if(this.moviesMore > 3){
                        this.moviesMoreFlag = true
                    }else{
                        this.moviesMoreFlag = false;
                    }

                    if(this.cinemasMore > 3){
                        this.cinemasMoreFlag = true
                    }else{
                        this.cinemasMoreFlag = false;
                    }
                    console.log(result)
                })
            }else if(this.value == ''){
                cinemasMoreFlag: false
            }
        }
    },
    methods: {
        backSearch(){
            this.$router.go(-1)
        },
        cancelActive(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss">
#searchCM{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
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
    .searchContent{
        position: absolute;
        top: 91px;
        width: 100%;
        background: #eee;
        .hotSearch{
            background: #fff;
            padding: 18px 0;
            padding-left: 15px;
        }
        .searchMovies{
            background: #fff;
            .title{
                line-height: 40px;
                padding-left: 15px;
                font-size: 14px;
                color: #999;
                border-bottom: 1px solid #999;
            }
            .moviesData{
                .moviesList{
                    display: flex;
                    width: 100%;
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                    .img-con{
                        width: 64px;
                        height: 94px;
                        img{
                            width: 100%;
                        }
                    }
                    .moviesInfo{
                        flex: 1;
                        padding-left: 10px;
                        .nameTitle{
                            width: 100%;
                            position: relative;
                            .moviesName{
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                font-weight: 900;
                                font-size: 18px;
                            }
                            .moviesScore{
                                font-size: 16px;
                                color: #fa0;
                                position: absolute;
                                right: 0;
                            }
                        }
                        .EnglishName, .catogary, .playTime{
                            font-size: 14px;
                            color: #666;
                        }
                    }
                }
                .moviesList:last-child{
                    border: 0;
                }
                .more{
                    text-align: center;
                    font-size: 14px;
                    line-height: 40px;
                    color: #ef4238
                }
            }

        }
        .searchCinema{
            margin-top: 20px;
            background: #fff;
            .title{
                line-height: 40px;
                padding-left: 15px;
                font-size: 14px;
                color: #999;
                border-bottom: 1px solid #999;
            }
            .cinemaList{
                border-bottom: 1px solid #f5f5f5;
                padding-bottom: 15px;
                padding: 10px;
                .cinemaTitle{
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
            }
            .more{
                text-align: center;
                font-size: 14px;
                line-height: 40px;
                color: #ef4238
            }
        }


    }
}
</style>

