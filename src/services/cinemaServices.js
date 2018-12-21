import http from '../utils/http'
import API from '../api/index'


//请求影院的数据
export function getCinemaList(ci){
    return new Promise((resolve, reject) => {
        http({
            url: API.CINEMALIST,
            method: 'GET',
            data:{
                day: 2018-11-17,
                offset: 0,
                limit: 20,
                cityId: ci,
                token: ''
            }
        })
        .then(({data, status}) => {
            if(!status == 200){
                //请求失败
                return
            }
            resolve(data)
        })
        .catch(error => {
            // 请求失败
            console.log(error)
        })
    })
}

// 请求影院的更多数据
export function getCinemaMoreList(offset, ci){
    return new Promise((resolve, reject) => {
        http({
            url: API.CINEMAMORELIST,
            method: 'GET',
            data:{
                day: 2018-11-17,
                offset: offset,
                limit: 20,
                cityId: ci,
                token: ''
            }
        })
        .then(({data, status}) => {
            if(!status == 200){
                //请求失败
                return
            }

            resolve(data)
        })
        .catch(error => {
            // 请求失败
            console.log(error)
        })
    })
}

// 请求电影院详情页的数据
export function getCinemaDetailData(cinemaId){
    return new Promise((resolve, reject) => {
        http({
            url: API.CINEMADETAIL_API,
            method: "GET",
            data: {
                cinemaId: cinemaId
            }
        }).then(({data, status}) => {
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