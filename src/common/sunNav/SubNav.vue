<template>
    <ul class="subNav">
            <li class="subNavItem" @click="wholeCityActive">{{subName1}}</li>
            <li class="subNavItem" @click="brandActive">{{subName2}}</li>
            <li class="subNavItem" @click="specialActive">{{subName3}}</li>
            <!-- 全城 -->
            <div class="wholeCity" v-show="wholeCityFlag">
                <div class="selectList">
                    <span class="selectListItem" v-for="(item, index) in selectSubNavList" :key="index" @click="selectListActive(index)"
                        :class="{active: selectSubNavIndex == index}">{{item}}</span>
                </div>
                <!-- 商区 -->
                <div class="wholeCity-content" v-if="selectSubNavIndex == 0">
                    <div class="list">
                        <ul class="wrap">
                            <li class="list-item" v-for="(item, index) in district" :key="index" @click="districtListItemActive(index)"
                                :class="{active: districtListSelectIndex == index}">{{item.name}}({{item.count}})</li>
                        </ul>
                    </div>
                    <div class="content">
                        <ul class="wrap">
                            <li class="list-item" v-for="(item, index) in districtAddr" :key="index" @click="districtContentItemActive(index)"
                                :class="{active: districtContentSelectIndex == index}" >
                                <span class="text">{{item.name}}</span>
                                <span class="num">{{item.count}}</span>
                            </li>                         
                        </ul>
                    </div>
                </div>
                <!-- 地铁站 -->
                <div class="wholeCity-content" v-if="selectSubNavIndex == 1">
                    <div class="list">
                        <ul class="wrap">
                            <li class="list-item" v-for="(item, index) in subway" :key="index" @click="subwayListItemActive(index)"
                                :class="{active: subwayListSelectIndex == index}">{{item.name}}({{item.count}})</li>
                        </ul>
                    </div>
                    <div class="content">
                        <ul class="wrap">
                            <li class="list-item" v-for="(item, index) in subwayAddr" :key="index" @click="subwayContentItemActive(index)"
                                :class="{active: subwayContentSelectIndex == index}" >
                                <span class="text">{{item.name}}</span>
                                <span class="num">{{item.count}}</span>
                            </li>                         
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 品牌 -->
            <div class="brand" v-show="brandFlag">
                <ul class="wrap">
                    <li class="brandItem" v-for="(item, index) in brand" :key="index" @click="brandItemActice(index)"
                        :class="{active: brandListSelectIndex == index}">
                        <span class="text">{{item.name}}</span>
                        <span class="num">{{item.count}}</span>
                    </li>
                </ul>
            </div>
            <!-- 特色 -->
            <div class="special" v-show="specialFlag">
                <div class="special-content">
                    <!-- 特色功能 -->
                    <div class="special-func">特色功能</div>
                    <div class="special-func-btn">
                        <div class="func-btn-tag" v-for="(item, index) in service" :key="index"
                            @click="specialBtnActive(index)" :class="{active: specialBtnIndex == index}">{{item.name}}</div>
                    </div>
                    <!-- 特殊厅 -->
                    <div class="specialHallType" v-show="hallType != null">特殊厅</div>
                    <div class="specialHallType-btn" v-show="hallType != null">
                        <div class="specialHallType-btn-tag" v-for="(item, index) in hallType" :key="index"
                            @click="specialHallTypeActive(index)" :class="{active: specialHallTypeBtnIndex == index}">{{item.name}}</div>
                    </div>
                </div>
                <div class="special-btn">
                    <div class="btn-left" @click="resectBtn">重置</div>
                    <div class="btn-right" @click="confirmBtn">确定</div>
                </div>
            </div>
        </ul>
</template>

<script>
import {mapState} from 'vuex'
import {getCinemaClassifyData, getCinemaAreaData} from '../../services/AppServices'
export default {
    name: 'app-subnav',
    data(){
        return {
            subName1: '全城',
            subName2: '品牌',
            subName3: '特色',

            selectIndex: -1,
            selectSubNavList: ['商区', '地铁站'],

            // 全城下面的导航栏
            selectSubNavIndex: 0,

            wholeCityFlag: false,
            brandFlag: false,
            specialFlag: false,
            // 行政区id
            
            // 行政区>areaid
            wholeDistrictAreaId: [],


            //品牌
            brand: [],
            brandId: '',
            brandListSelectIndex: 0,

            // 行政区
            district: [],
            districtAddr: [],
            districtListSelectIndex: 0,
            districtContentSelectIndex: 0,

            // 特殊厅
            hallType: [],
            // 特色功能选择
            specialBtnIndex: 0,
            specialHallTypeBtnIndex: 0,


            // 服务
            service: [],

            // 地铁
            subway: [],
            subwayAddr: [],
            lineId: '',
            subwayListSelectIndex: 0,
            subwayContentSelectIndex: 0,
            // 地铁线id
            subwayId: [],
            // 地铁站点id
            subwayAreaId: [],

            // 时段
            timeRanges: []
        }
    },
    methods: {
        //选择全城点击事件
        wholeCityActive(){
            this.wholeCityFlag = !this.wholeCityFlag
            this.brandFlag = false
            this.specialFlag = false
        },
        // 点击全城下面的导航栏的点击事件
        selectListActive(index){
            this.selectSubNavIndex = index
        },

        // 点击商区左边的区列表的事件
        districtListItemActive(index){
            this.districtListSelectIndex = index;
            this.districtAddr = this.district[index].subItems
            this.districtContentSelectIndex = 0
            this.wholeDistrictId = this.district[index].id
        },
        // 点击商区右边边的区列表的事件
        districtContentItemActive(index){
            this.districtContentSelectIndex = index
            this.subName1 = this.districtAddr[index].name;
            this.wholeDistrictAreaId = this.districtAddr[index].id
            // 请求ajax
            getCinemaAreaData(this.$store.state.cityID, this.wholeDistrictId, this.wholeDistrictAreaId).then((result)=>{
                this.cinemaList = result.cinemas;
                this.$center.$emit('getCinemaList', result.cinemas)
            })
            this.brandFlag = false
            this.wholeCityFlag = false
            this.specialFlag = false
            
        },
        
        // 点击地铁站左边的区列表的事件
        subwayListItemActive(index){
            this.subwayListSelectIndex = index;
            this.subwayAddr = this.subway[index].subItems
            this.subwayContentSelectIndex = 0
            this.subwayDistrictId = this.subway[index].id
        },
        // 点击地铁站右边边的区列表的事件
        subwayContentItemActive(index){
            this.subwayContentSelectIndex = index
            this.subName1 = this.subwayAddr[index].name;
            this.subwayAreaId = this.subwayAddr[index].id

            console.log(this.subwayAddr)
            // 请求ajax
            getCinemaAreaData(this.$store.state.cityID,this.subwayDistrictId, this.subwayAreaId,this.subwayDistrictId).then((result)=>{
                this.cinemaList = result.cinemas;
                this.$center.$emit('getCinemaList', result.cinemas)
            })
            this.brandFlag = false
            this.wholeCityFlag = false
            this.specialFlag = false
        },


        // 选择品牌点击事件
        brandActive(){
            this.brandFlag = !this.brandFlag
            this.wholeCityFlag = false
            this.specialFlag = false
            // 默认选中列表中的第一个
            this.brandListSelectIndex = 0
        },

        // 选择品牌列表的的点击事件
        brandItemActice(index){
            this.brandListSelectIndex = index
            this.subName2 = this.brand[index].name
            this.brandId = this.brand[index].id
            // 请求ajax
            getCinemaAreaData(this.$store.state.cityID,this.brandId).then((result)=>{
                this.cinemaList = result.cinemas;
                this.$center.$emit('getCinemaList', result.cinemas)
            })
            this.brandFlag = false
            this.wholeCityFlag = false
            this.specialFlag = false

        },

        // 选择特色的点击事件
        specialActive(){
            this.specialFlag = !this.specialFlag
            this.brandFlag = false
            this.wholeCityFlag = false
        },
        // 特色功能的选择单击事件
        specialBtnActive(index){
            this.specialBtnIndex = index;
        },

        // 特色厅的选择单击事件
        specialHallTypeActive(index){
            this.specialHallTypeBtnIndex = index
        },

        // 重置按钮
        resectBtn(){
            this.specialBtnIndex = 0;
            this.specialHallTypeBtnIndex = 0
        },

        // 确定按钮
        confirmBtn(){
            console.log(this.service)
        }
    },
    computed: {
        ...mapState(['city'])
    },
    created(){
        // 请求电影院分类数据
        getCinemaClassifyData(this.$store.state.cityID).then(({brand, district, hallType, service, subway, timeRanges})=>{
            // 品牌
            this.brand = brand.subItems
            // 行政区
            this.district = district.subItems
            // 特殊厅
            this.hallType = hallType.subItems
            // 服务
            this.service = service.subItems
            // 地铁
            this.subway = subway.subItems
            // 时段
            this.timeRanges = timeRanges.subItems
        })
    }
}
</script>

<style lang="scss" scoped>
.subNav{
        position: absolute;
        top: 88px;
        left: 0;
        height: 40px;
        width: 100%;
        display: flex;
        color: #f5f5f5;
        line-height: 40px;
        border-bottom: 1px solid #f5f5f5;
        .subNavItem{
            flex: 1;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            color: #757575;
            &::after{
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border: 4px solid transparent;
                border-top: 4px solid #b0b0b0;
                transform: translate(4px, 1px);
            }
        }

        // 全城
        .wholeCity{
            width: 100%;
            height: 450px;
            position: absolute;
            display: flex;
            top: 40px;
            z-index: 5;
            color: #333;
            background: #fff;
            .selectList{
                display: flex;
                width: 100%;
                height: 44px;
                .selectListItem{
                    flex: 1;
                    text-align: center;
                    font-size: 14px;
                    margin: 0 10px;
                }
                .active{
                    color:#f03d37;
                    border-bottom: 3px solid #f03d37;
                }
            }
            .wholeCity-content{
                position: absolute;
                top: 44px;
                width: 100%;
                height: 406px;
                border-bottom: 1px solid #999;
                .list{
                    width: 30%;
                    height: 406px;
                    overflow-y: auto;
                    .wrap{
                        .list-item{
                            padding: 0 15px;
                            height: 44px;
                            width: 100%;
                            font-size: 14px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                        }
                        .active{
                            background: #f5f5f5;
                            color: #f03d37;
                        }
                    }
                }
                .content{
                    width: 67%;
                    height: 406px;
                    position: absolute;
                    top: 0;
                    left: 30%;
                    overflow: auto;
                    background: #f5f5f5;
                    .wrap{
                        
                        .list-item{
                            width: 100%;
                            height: 44px;
                            padding: 0 30px;
                            font-size: 14px;
                            .text{
                                float: left;
                            }
                            .num{
                                float: right;
                            }
                        }
                        .active{
                            background: #f5f5f5;
                            color: #f03d37;
                        }
                    }
                }

            }

        }

        // 品牌
        .brand{
            position: absolute;
            top: 40px;
            background: #fff;
            color: #333;
            z-index: 5;
            border-bottom: 1px solid #ccc;
            width: 100%;
            height: 345px;
            overflow: auto;
            font-size: 14px;
            .wrap{
                .brandItem{
                    margin: 0 20px;
                    height: 44px;
                    box-sizing: border-box;
                    padding: 0 10px;
                    border-bottom: 1px solid #ccc;
                    .text{
                        float: left;
                    }
                    .num{
                        float: right;
                    }
                }
                .active{
                    color: #f03d37;
                }
                .brandItem:last-child{
                    border: 0;
                }
            }
        }

        // 特色
        .special{
            width: 100%;
            height: 343px;
            position: absolute;
            top: 40px;
            left: 0;
            color: #666;
            font-size: 14px;
            background: #fff;
            z-index: 5;
            padding: 10px;
            .special-content{
                height: 270px;
                width: 100%;
                .special-func{
                    width: 100%;
                    line-height: 20px;
                }
                .special-func-btn{
                    margin-top: 8px;
                    width: 100%;
                    height: 44px;
                    .func-btn-tag{
                        display: inline-block;
                        margin: 0 9px;
                        width: 70px;
                        height: 40px;
                        font-size: 12px;
                        border-radius: 4px;
                        border: 1px solid #ccc;
                        text-align: center;
                    }
                    .active{
                        border: 1px solid #f03d37;
                        background: #fcf0f0;
                        color: #f03d37;
                    }
                }
                .specialHallType{
                    width: 100%;
                    line-height: 20px;
                    margin: 10px 0px;
                }
                .specialHallType-btn{
                    width: 100%;
                    height: 144px;
                    .specialHallType-btn-tag{
                        display: inline-block;
                        margin: 0px 9px;
                        width: 70px;
                        height: 40px;
                        font-size: 12px;
                        border-radius: 4px;
                        border: 1px solid #ccc;
                        text-align: center;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .active{
                        border: 1px solid #f03d37;
                        background: #fcf0f0;
                        color: #f03d37;
                    }
                }

            }
            .special-btn{
                width: 100%;
                height: 60px;
                .btn-left{
                    display: inline-block;
                    width: 80px;
                    height: 36px;
                    border-radius: 6px;
                    text-align: center;
                    line-height: 36px;
                    border: 1px solid #e5e5e5;
                }
                .btn-right{
                    float: right;
                    color: #fff;
                    display: inline-block;
                    width: 80px;
                    height: 36px;
                    background: #f03d37;
                    border-radius: 6px;
                    text-align: center;
                    line-height: 36px;
                    border: 1px solid #e5e5e5;
                }
            }
        }

    }

</style>
