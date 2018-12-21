
import http from '../utils/http'
import API from '../api/index'

//请求正在热映的电影数据

export function getPlayingList(){
    return new Promise((resolve, reject) => {
        http({
            url: API.PLAYING_API,
            method: 'GET',
            data:{
                token: '',
            }
        })
        .then(({data, status})=>{
            if(!status == 200){
                //请求失败
                return
            }
            let newData = data.movieList.map(item=>{
                let {id, img, nm, rt, sc, showInfo, star, version, globalReleased, wish} = item;
                img = img.replace(/w.h/, '128.180');
                return {id, img, nm, rt, sc, showInfo, star, version, globalReleased, wish};
            })
            resolve({
                data: newData,
                ids: data.movieIds
            })
        })
        .catch(error=> {
            console.log(error)
        })
    })
}


// 请求正在热映的更多数据
export function getLoadMore(ids){
    return new Promise((resolve, reject) => {
        http({
            url: API.PLAYMORE_API,
            method: 'GET',
            data:{
                token: '',
                movieIds: ids
            }
        })
        .then(({data, status})=>{
            if(!status == 200){
                //请求失败
                return
            }
            let newData = data.coming.map(item=>{
                let {id, img, nm, rt, sc, showInfo, star, version, globalReleased, wish} = item;
                img = img.replace(/w.h/, '128.180');
                return {id, img, nm, rt, sc, showInfo, star, version, globalReleased, wish};
            })
            resolve(newData)
        })
        .catch(error=> {
            console.log(error)
        })
    })
}



// 请求近期最受期待的电影数据

export function getMostExpected(ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOSTEXPECTED_API,
            method: 'GET',
            data:{
                ci: ci,
                limit: 10,
                offset: 0,
                token: ''
            }
        })
        .then(({data, status})=>{
            if(!status == 200){
                return
            }
            // console.log(data.paging)
            let newData = data.coming.map(item=>{
                let {comingTitle, id, img, nm, wish, wishst} = item;
                img = img.replace(/w.h/, '128.180');
                comingTitle = comingTitle.split(' ')[0]
                return {comingTitle, id, img, nm, wish, wishst}
            })
            resolve({
                data: newData,
                offset: data.paging.offset
            })
        })
        .catch(error=> {
            console.log(error)
        })
    })
}


// 请求近期最受欢迎的加载更多的数据
export function getMostExpectedMore(offset, ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOSTEXPECTED_MORE_API,
            method: 'GET',
            data:{
                ci: ci,
                limit: 10,
                offset: offset,
                token: ''
            }
        })
        .then(({data, status})=>{
            if(!status == 200){
                return
            }
            let newData = data.coming.map(item=>{
                let {comingTitle, id, img, nm, wish, wishst} = item;
                img = img.replace(/w.h/, '128.180');
                comingTitle = comingTitle.split(' ')[0]
                return {comingTitle, id, img, nm, wish, wishst}
            })
            resolve(newData)
        })
        .catch(error=> {
            console.log(error)
        })
    })
}




//请求即将上架的电影数据
export function getComingList(ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.COMING_API,
            method: 'GET',
            data:{
                ci: ci,
                limit: 10,
                token: '',
            }
        })
        .then(({data, status})=>{
            if(!status == 200){
                //请求失败
                return
            }
            let newData = data.coming.map(item=>{
                let {id, img, nm, rt, sc, showInfo, star, version, globalReleased, wish, comingTitle} = item;
                img = img.replace(/w.h/, '128.180');
                return {id, img, nm, rt, sc, showInfo, star, version, globalReleased, wish, comingTitle};
            })
            //对data数据进行分类
            let dataMap = {};
            newData.map(item=>{
                // console.log(item)
                if(!dataMap[item.comingTitle]){
                    dataMap[item.comingTitle] = [];
                }
                dataMap[item.comingTitle].push(item)
            })
            resolve({
                data: dataMap,
                ids: data.movieIds
            })
        })
        .catch(error=> {
            console.log(error)
        })
    })
}


// 请求即将上映的更多电影数据
export function getComingMore(movieIds, ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.COMINGMORE_API,
            method: 'GET',
            data:{
                ci: ci,
                limit: 10,
                movieIds: movieIds,
                token: '',
            }
        })
        .then(({data, status})=>{
            if(!status == 200){
                //请求失败
                return
            }
            let newData = data.coming.map(item=>{
                let {id, img, nm, rt, sc, showInfo, star, version, globalReleased, wish, comingTitle} = item;
                img = img.replace(/w.h/, '128.180');
                return {id, img, nm, rt, sc, showInfo, star, version, globalReleased, wish, comingTitle};
            })
            //对data数据进行分类
            let dataMap = {};
            newData.map(item=>{
                // console.log(item)
                if(!dataMap[item.comingTitle]){
                    dataMap[item.comingTitle] = [];
                }
                dataMap[item.comingTitle].push(item)
            })
            resolve(dataMap)
        })
        .catch(error=> {
            console.log(error)
        })
    })
}


// 请求电影详情页的数据

export function getMovieDetail(id){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOVIES_DETAIL_API,
            method: 'GET',
            data: {
                movieId: id
            }
        }).then(({data, status}) => {
            if(!status == 200){
                // 请求失败
            }else{
                // 请求成功
                data.detailMovie.img = data.detailMovie.img.replace(/w.h/, '128.180');
                resolve(data)
            }
        }).catch((error)=>{
            console.log(error)
        })
    })
}

// 请求电影详情页中的相关信息

export function getMovieDetailAllData(movieId,day,cityId){
    return new Promise((resolve, reject) => {
        http({
            url: API.MOVIES_DETAIL_ALLDATA,
            method: 'POST',
            params:{
                movieId: movieId,
                day: day,
                offset: 0,
                limit: 20,
                updateShowDay: true,
                cityId: cityId
            }
        }).then(({data, status})=>{
            if(!status == 200){
                // 请求失败
            }else{
                // 请求成功
                resolve(data)
            }
        }).catch(error=>{
            console.log(error)
        })
    })
}
