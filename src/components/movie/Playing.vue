<template>
    <app-content :style="{top: '88px', bottom: '50px'}" @loadMore='loadMoreData'>
        <div class="Playing">
            <ul class="hotShow">
                <li class="playingList" v-for="(item, index) in playingList" :key="item.id" 
                    @click="moviesDetail(index)">
                    <div class="img-icon">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="content">
                        <div class="content_center">
                            <div class="movies_title">
                                <span class="name">{{item.nm}}</span>
                                <span class="IMAX_3D"></span>
                            </div>
                            <div class="movies_info">
                                <!-- 观影评 -->
                                <p class="review" v-show="item.globalReleased">
                                    <span class="text">观影评</span>
                                    <span class="num">{{item.sc}}</span>
                                </p>
                                <!-- 多少人想看 -->
                                <p class="review" v-show="!item.globalReleased">
                                    <span class="num">{{item.wish}}</span>
                                    <span class="text">人想看</span>
                                </p>
                                <p class="star">主演：{{item.star}}</p>
                                <p class="intro">{{item.showInfo}}</p>
                            </div>
                        </div>
                        <!-- 购票 -->
                        <div class="content_btn buy_ticket" v-show="item.globalReleased">
                            <div class="btn_block">购票</div>
                        </div>
                        <!-- 预售 -->
                        <div class="content_btn presell" v-show="!item.globalReleased">
                            <div class="btn_block">预售</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </app-content>
</template>

<script>
import {getPlayingList, getLoadMore} from '../../services/movieServices'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            // 正在热映的数据
            playingList: [],
            playingIDS: []
        }
    },
    methods: {
        ...mapState(['city']),
        loadMoreData(){
            let ids = [...this.playingIDS]
            ids = this.playingIDS.splice(12, 10)
            let movieIds = ids.join(',')
            getLoadMore(movieIds).then(result=>{
                this.playingList = [...this.playingList, ...result]
            })
        },
        // 点击跳转到电影详情页
        moviesDetail(index){
            let id = this.playingIDS[index] + ''
            localStorage.setItem('moviesId', id)
            this.$router.push('/movies/detail')
        }
    },
    created(){
        //调用得到的数据
        // 正在热映的电影请求
        getPlayingList().then(({data, ids})=>{
            this.playingList = data;
            this.playingIDS = ids
        })
        
    }
}
</script>

<style lang="scss" scoped>
.playingList{
    padding: 12px 15px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    .img-icon{
        width: 64px;
        height: 90px;
        vertical-align: -4px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .content{
        height: 90px;
        flex: 1;
        display: flex;
        .content_center{
            flex: 1;
            .movies_title{
                display: flex;
                .name{
                    flex: 1;
                    font-size: 17px;
                    color: #333;
                    font-weight: 700;
                    padding-right: 5px;
                    padding-left: 10px;
                    overflow:hidden;
                    text-overflow:ellipsis; 
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
                .IMAX_3D{
                    display: inline-block;
                    width: 43px;
                    height: 14px;
                    background: url(../../assets/IMAX3D.png) no-repeat center;
                    background-size: 100%;
                    vertical-align: -2px;
                }
            }
            .movies_info{
                padding-left: 10px;
                .review{
                    .text{
                        font-size: 13px;
                        color: #666;
                        margin-right: 5px;
                    }
                    .num{
                        font-size: 14px;
                        color: #faaf00;
                        font-weight: bold;
                    }
                }
                .star, .intro{
                    font-size: 13px;
                    margin: 3px 0;
                    color: #666;
                    overflow:hidden;
                    text-overflow:ellipsis; 
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }

        }
        .buy_ticket{
            width: 47px;
            height: 27px;
            line-height: 28px;
            text-align: center;
            box-sizing: border-box;
            background-color: #f03d37;
            color: #fff;
            border-radius: 4px;
            white-space: nowrap;
            font-size: 12px;
            margin: auto 0;
        }
        .presell{
            width: 47px;
            height: 27px;
            line-height: 28px;
            text-align: center;
            box-sizing: border-box;
            background-color: #3c9fe6;
            color: #fff;
            border-radius: 4px;
            white-space: nowrap;
            font-size: 12px;
            margin: auto 0;
        }

    }
    
}
</style>
