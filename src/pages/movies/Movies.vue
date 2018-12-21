<template>
<div class="box">
    <div id="Movies">
        <app-header title="猫眼电影"></app-header>
        <div class="subHeader">
            <span class="location" @click="locationBtn">{{city}}</span>
            <div class="movieShow">
                <div class="show" v-for="(item, index) in subItemList" :key="index"
                    @click="subActive(index)" :class="{subActive: showId == index}">
                    {{item}}
                </div>
            </div>
            <span class="searchBtn" @click="searchBtn">
                <img src="../../assets/search.png" alt="">
            </span>
        </div>
        
        <keep-alive>
            <playing v-if="showId == 0"/>
            <coming v-if="showId == 1" /> 
        </keep-alive>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
import Playing from '../../components/movie/Playing'
import Coming from '../../components/movie/Coming'
import {mapState} from 'vuex'
export default {
    components: {
        'playing': Playing,
        'coming': Coming
    },
    data(){
        return {
            subItemList: ['正在热映', '即将上映'],
            showId: 0
        }
    },
    computed: {
        ...mapState(['city'])
    },
    methods: {
        subActive(index){
            this.showId = index;
        },
        locationBtn(){
            this.$router.push('/movies/location')
        },
        searchBtn(){
            this.$router.push('/movies/searchCM')
        }
    }
    
}
</script>

<style lang="scss" scoped>
#Movies{
    height: 100%;
}
.subHeader{
    width: 100%;
    line-height: 44px;
    position: absolute;
    top: 44px;
    font-size: 14px;
    left: 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    .location{
        flex: 1;
        height: 44px;
        text-align: center;
        &::after{
            content: '';
            display: inline-block;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-top: 6px solid #666;
            transform: translate(4px, 4px);
        }
    }
    .movieShow{
        width: 60%;
        height: 44px;
        display: flex;
        .show{
            height: 44px;
            font-weight: bold;
            flex: 1;
            margin: 0 20px;
            text-align: center;
            box-sizing: border-box;
        }
        .subActive{
            border-bottom: 3px solid #ef4238;
            color: #ef4238;
        }
    }
    .searchBtn{
        flex: 1;
        height: 44px;
        text-align: center;
        img{
            width: 24px;
            margin: 10px auto;
        }
    }
}
</style>

