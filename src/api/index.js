//开发环境
const SAT_HOST = 'http://localhost:8080';

//测试环境
const UAT_HOST = 'http://localhost:8080';

//生产环境
const PRO_HOST = 'http://localhost:8080';



/* 
    正在热映的接口
    参数： token   用户标识
*/

const PLAYING_API = '/ajax/movieOnInfoList'


/*

    请求电影详情页的数据
    参数： movieId    电影id
*/
const MOVIES_DETAIL_API = '/ajax/detailmovie'


/*
    请求加载正在热映的更多数据的接口
    参数：token:   用户标识
         movieIds：  电影Id 


*/
const PLAYMORE_API = '/ajax/moreComingList'



/*
 近期最受期待的电影

    参数： ci     城市id
          limit    
          offset
          token

 */
const MOSTEXPECTED_API = '/ajax/mostExpected'


/**
 * 
 *  请求近期最受欢迎的加载更多的数据的接口
 * http://m.maoyan.com/ajax/mostExpected?ci=30&limit=10&offset=10&token=
 *  参数： ci     城市id
 *        limit   数据长度
 *        offset  
 */

 const MOSTEXPECTED_MORE_API = "/ajax/mostExpected"


/* 
    即将上映的接口
    参数：ci  城市id
         token  用户标识
         limit  数据长度
*/ 

const COMING_API = '/ajax/comingList'


/*
    请求即将上映的更多电影的接口
    http://m.maoyan.com/ajax/moreComingList?ci=30&token=&limit=10&movieIds=1212293

    参数：  ci：  城市id
           token：  用户标识
           limit： 数据长度
           movieIds： 电影id
*/ 

const COMINGMORE_API = '/ajax/moreComingList'


/* 
    请求影院的数据
    http://m.maoyan.com/ajax/cinemaList
    参数： day： 日期
          offset： 偏移量
          limit： 数据长度
          districtId： 
          lineId：
          hallType   影厅样式
          brandId  
          serviceId
          areaId
          stationId
          item
          updateShowDay
          reqId
          cityId   城市id
*/ 

const CINEMALIST = "/ajax/cinemaList"

/*
    请求影院的更多数据
    参数：
    day=2018-11-17   时间
    &offset=20     偏移量
    &limit=20    数据长度


*/ 

const CINEMAMORELIST = '/ajax/cinemaList'


/**
 * 
 * 请求城市数据
 * http://m.maoyan.com/dianying/cities.json
 * 
 *  */

const CITYLIST = '/dianying/cities.json'


//搜索电影和影院的请求
// 参数： kw  搜索框内的内容
//      cityId  城市id
//       stype   

// http://m.maoyan.com/ajax/search?kw=nihao&cityId=30&stype=-1

const SEARCHCM_API = "/ajax/search"




/* 
    请求电影院分类的数据
    参数： ci   城市id

*/ 

const CINEMACLASSIFY_API = "/ajax/filterCinemas"



/*
    请求点击区域后，相应区域电影院的数据
    参数：day:   日期
        offset：偏移量
        limit： 数据长度
        districtId：32   区域id
        areaId：   areaId
        cityId： 城市id
        stationId  站点id
        lineId： -1， 线路id
        brandId： 品牌id；
        serviceId： 服务id

*/
const CINEMAAREADATA_API = '/ajax/cinemaList'


/*
    请求电影详情页中的相关信息
    参数：   movieId: 341213   电影id
            day: 2018-11-23    时间
            offset: 0       偏移量
            limit: 20      数据长度
            updateShowDay: true   更新播放的日期
            cityId: 30  城市id
*/
const MOVIES_DETAIL_ALLDATA = '/ajax/movie'

/*

    请求电影院详情页
    参数：cinemaId   电影院id
*/
const CINEMADETAIL_API = '/ajax/cinemaDetail'



// 输出

export default {
    SAT_HOST,
    UAT_HOST,
    PRO_HOST,
    PLAYING_API,
    COMING_API,
    MOSTEXPECTED_API,
    PLAYMORE_API,
    MOSTEXPECTED_MORE_API,
    COMINGMORE_API,
    CINEMALIST,
    CINEMAMORELIST,
    CITYLIST,
    SEARCHCM_API,
    CINEMACLASSIFY_API,
    CINEMAAREADATA_API,
    MOVIES_DETAIL_API,
    MOVIES_DETAIL_ALLDATA,
    CINEMADETAIL_API
}