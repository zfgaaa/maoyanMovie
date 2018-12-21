<template>
    <app-content :style="{position:'absolute', top: '88px', bottom: '50px'}" @loadMoreComing = 'loadMoreComingData'>
    <!-- 近期最受期待的电影 -->
        <div class="mostExpected" ref="content">
            <p class="title">近期最受期待</p>
            <h-scroll class="mostExpected_content" @loadMoreScroll = "getMostExpectedData">
                <div class="mostExpected_item" v-for="item in mostExpectedList" :key="item.id">
                    <div class="img_icon">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="movie_info">
                        <div class="name">{{item.nm}}</div>
                        <div class="time">{{item.comingTitle}}</div>
                    </div>
                </div>
            </h-scroll>
        </div>
        <!-- 即将上映 -->
        <div class="coming">
            <div class="comingList" v-for="(list, key) in comingList" :key="key">
                <p class="timeTitle">{{key}}</p>
                <div class="coming-content" v-for="item in list" :key="item.id">
                    <div class="img_icon">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="content">
                        <p class="title">{{item.nm}}</p>
                        <p class="like"><span class="num">{{item.wish}}</span>人想看</p>
                        <p class="star">主演：{{item.star}}</p>
                        <p class="playTime">{{item.rt}}上映</p>
                    </div>
                    <div class="btn_block">
                        <!-- <div class="btn_presell">预售</div> -->
                        <div class="btn_want">想看</div>
                    </div>
                </div>
            </div>
        </div>
    </app-content>
</template>

<script>
import {getMostExpected, getMostExpectedMore, getComingList, getComingMore} from '../../services/movieServices'
export default {
    data(){
        return {
             // 即将上映的数据
            //最受期待的电影数据
            mostExpectedList: [],
            offset: 0,
            comingList: {},
            comingMovieIds: []
        }
    },
    methods:{
        //加载更多近期最受欢迎数据
        getMostExpectedData(){
            this.offset += 10
            getMostExpectedMore(this.offset).then(result=>{
                this.mostExpectedList = [...this.mostExpectedList, ...result]
            })
        },
        loadMoreComingData(){
            //即将上映的加载更多的请求
            let ids = this.comingMovieIds.splice(12, 10)
            let movieIds = ids.join(',')
            getComingMore(movieIds).then((result)=>{
                this.comingList = Object.assign({},this.comingList, result)
            })
        
        }
    },
    created(){
        //调用得到的数据
        // 近期最受期待的电影请求
        getMostExpected(this.$store.state.cityID).then(({data, offset})=>{
            this.mostExpectedList = data;
            this.mostExpectedOffset = offset;
        }),
        //即将上映的电影请求
        getComingList(this.$store.state.cityID).then(({data, ids})=>{
            this.comingList = data
            this.comingMovieIds = ids;
        })
        
    }
}
</script>
<style lang="scss" scoped>
.mostExpected{
    box-sizing: border-box;
    padding: 12px 15px;
    background-color: #fff;
    margin-bottom: 10px;
    .title{
        margin: 0 0 12px;
        font-size: 14px;
        color: #333;
    }
    .mostExpected_item{
        position: relative;
        display: inline-block;
        padding-right: 15px;
        width: 100px;
        height: 160px;
        .img_icon{
            width: 85px;
            height: 115px;
            img{
                width: 100%;
                height: 100%;
            }
            
        }
        .movie_info{
            .name{
                margin: 0 0 3px;
                font-size: 13px;
                color: #222;
                overflow:hidden;
                text-overflow:ellipsis; 
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
            .time{
                margin: 0;
                font-size: 11px;
                color: #999;
            }
        }
    }
}
.coming{
    .comingList{
        padding: 0 15px;
        .timeTitle{
            margin: 0;
            font-size: 14px;
            color: #333;
        }
        .coming-content{
            display: flex;
            .img_icon{
                width: 64px;
                height: 90px;
                margin: 10px 0;
                margin-right: 10px; 
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .content{
                margin: 10px 0;
                flex: 1;
                .title{
                    font-size: 17px;
                    color: #333;
                    font-weight: 700;
                    padding-right: 5px;
                    flex-shrink: 1;
                }
                .like{
                    margin-top: 5px;
                    font-size: 13px;
                    margin-left: -2px;
                    display: inline-block;
                    color: #666;
                    .num{
                        color: #faaf00;
                        font-size: 15px;
                        font-weight: 600;
                    }
                }
                .star{
                    margin-top: 5px;
                    font-size: 13px;
                    color: #666;
                }
                .playTime{
                    margin-top: 3px;
                    font-size: 13px;
                    color: #666;
                }
            }  
            .btn_block{
                box-sizing: border-box;
                margin: auto;
                .btn_presell{
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
                    cursor: pointer;
                }
                .btn_want{
                    width: 47px;
                    height: 27px;
                    line-height: 28px;
                    text-align: center;
                    box-sizing: border-box;
                    background-color: #faaf00;
                    color: #fff;
                    border-radius: 4px;
                    white-space: nowrap;
                    font-size: 12px;
                    cursor: pointer;
                }
            }
        }

    }
}
</style>

