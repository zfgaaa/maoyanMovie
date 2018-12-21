<template>
    <div id="detailInfo">
        <!-- 头部 -->
        <app-header :title="movieInfo.nm">
            <div slot="left" class="btn-left iconfont icon-fanhui" @click="detail_back"></div>
        </app-header>
        <!-- 内容 -->
        <div class="detailInfoWrap">
            <!-- 电影详情 -->
            <div class="movieintroContent">
                <div class="img-icon">
                    <img :src="movieInfo.img" alt="">
                </div>
                <div class="content">
                    <div class="name">{{movieInfo.nm}}</div>
                    <div class="eName">{{movieInfo.enm}}</div>
                    <div class="score">
                        <span class="score-con">{{movieInfo.sc}}</span>
                        <span class="score-peopleNum">({{movieInfo.snum}}人评)</span>
                    </div>
                    <div class="classify">
                        <span class="text">{{movieInfo.cat}}</span>
                        <span class="bgTag"></span>
                    </div>
                    <div class="intro">{{movieInfo.fra}}/{{movieInfo.dur}}分钟</div>
                    <div class="showTime">{{movieInfo.pubDesc}}</div>
                </div>
            </div>
            <!-- 电影简介 -->
            <div class="movieIntro">
                <div class="btn_block">特惠购票</div>
                <div class="movieIntroText">
                    <p>{{movieInfo.dra}}</p>
                </div>
                <span class="iconfont icon-Group-"></span>
            </div>
            <!-- 演员 -->
            <h-scroll class="actor">
                <li class="actorItem">
                    <div class="img-icon">
                        <img :src="movieInfo.img" alt="">
                    </div>
                    <p class="name">饶晓峰</p>
                    <p class="profession">导演</p>
                </li>
                <li class="actorItem">
                    <div class="img-icon">
                        <img :src="movieInfo.img" alt="">
                    </div>
                    <p class="name">饶晓峰</p>
                    <p class="profession">导演</p>
                </li>
                <li class="actorItem">
                    <div class="img-icon">
                        <img :src="movieInfo.img" alt="">
                    </div>
                    <p class="name">饶晓峰</p>
                    <p class="profession">导演</p>
                </li>
                <li class="actorItem">
                    <div class="img-icon">
                        <img :src="movieInfo.img" alt="">
                    </div>
                    <p class="name">饶晓峰</p>
                    <p class="profession">导演</p>
                </li>
                <li class="actorItem">
                    <div class="img-icon">
                        <img :src="movieInfo.img" alt="">
                    </div>
                    <p class="name">饶晓峰</p>
                    <p class="profession">导演</p>
                </li>
                <li class="actorItem">
                    <div class="img-icon">
                        <img :src="movieInfo.img" alt="">
                    </div>
                    <p class="name">饶晓峰</p>
                    <p class="profession">导演</p>
                </li>
                <li class="actorItem">
                    <div class="img-icon">
                        <img :src="movieInfo.img" alt="">
                    </div>
                    <p class="name">饶晓峰</p>
                    <p class="profession">导演</p>
                </li>
            </h-scroll>
        </div>
    </div>
</template>

<script>
import {getMovieDetail} from '../../services/movieServices'
export default {
    data(){
        return {
            movieInfo: []
        }
    },
    methods: {
        detail_back(){
            this.$router.go(-1)
        }
    },
    created(){
        let moviesId = localStorage.getItem('moviesId')
        getMovieDetail(moviesId).then(result=>{
            this.movieInfo = result.detailMovie
        })
    }
}
</script>

<style lang="scss" scoped>
#detailInfo{
    width: 100%;
    position: absolute;
    z-index: 10;
    background: #eee;
    top: 0;
    left: 0;
    bottom: 0;
    .detailInfoWrap{
        position: absolute;
        top: 44px;
        width: 100%;
        .movieintroContent{
            padding: 10px;
            display: flex;
            background: #666;
            .img-icon{
                width: 107px;
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
                .name{
                    font-size: 20px;
                    margin-top: 2px;
                    font-weight: 700;
                    width: 100%;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .eName{
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
        }
        .movieIntro{
            position: relative;
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            background: #fff;
            .btn_block{
                font-size: 16px;
                text-align: center;
                border-radius: 4px;
                line-height: 36px;
                background: #e54847;
                color: #fff;
                margin-bottom: 10px;
            }
            .movieIntroText{
                color: #555;
                font-size: 15px;
                line-height: 25px;
                max-height: 78px;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .iconfont{
                position: absolute;
                font-size: 12px;
                font-weight: 900;
                left: 50%;
                transform: translateX(-50%);
                bottom: 2px;
            }
        }
        .actor{
            width: 100%;
            overflow: hidden;
            .actorItem{
                padding: 5px;
                width: 75px;
                display: inline-block;
                .img-icon{
                    width: 65px;
                    height: 90px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .name, .profession{
                    width: 100%;
                    line-height: 18px;
                    text-align: center;
                    font-size: 12px;
                    color: #333;
                }

            }
        }
    }

}
</style>
