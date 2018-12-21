import http from '../utils/http'
import API from '../api/index'



//请求城市列表数据
export function getCityList(){
    return new Promise((resolve, reject) => {
        http({
            url: API.CITYLIST,
            method: 'GET'
        })
        .then(({data, status}) => {
            if(!status == 200){
                //请求失败
                return
            }else{
                //请求成功
                // 取得首字母，按字母先分类
                let map = {};
                data.cts.map(item=>{
                    let letter = item.py[0];
                    if(!map[letter]){
                        map[letter] = [];
                    }
                    map[letter].push(item);
                })
                let keys = Object.keys(map);
                //排序
                // 选择排序
                for(let i = 0; i < keys.length; i++){
                    for(let j = i+1; j < keys.length; j++){
                        if(keys[i] > keys[j]){
                            let tmp = keys[i];
                            keys[i] = keys[j];
                            keys[j] = tmp;
                        }
                    }
                }
                //组装数据
                let newData = keys.map(item=>{
                    return {
                        key: item, 
                        value: map[item]
                    }
                })
                resolve({
                    keys: keys,
                    data: newData
                });
            }
        })
        .catch(error => {
            // 请求失败
            console.log(error)
        })
    })
}


//请求电影搜索，影院搜索数据
export function getSearchCM(kw){
    return new Promise((resolve, reject)=>{
        http({
            url: API.SEARCHCM_API,
            method: 'GET',
            data:{
                kw: kw,
                cityId: 30,
                stype: -1
            }
        }).then(({data, status})=>{
            if(!status == 200){
                //请求失败
                return
            }else{
                //请求成功
                data.movies.list.map(item=>{
                    item.img = item.img.replace(/w.h/, '128.180');
                })
                resolve(data)
            }
        }).catch(error=>{
            //请求失败
            console.log(error)
        })
    })
}

//请求电影院分类列表数据
export function getCinemaClassifyData(cityId){
    return new Promise((resolve, reject) => {
        http({
            url: API.CINEMACLASSIFY_API,
            method: 'GET',
            data: {
                ci: cityId
            }
        }).then(({data, status}) => {
            if(!status == 200){
                //请求失败
            }else{
                //请求成功
                resolve(data)
            }
        }).catch(error => {
            console.log(error)
        })
    })
}


// 点击区域后请求相应区域电影院的数据

export function getCinemaAreaData(cityId, districtId,areaId, lineId, stationId){
    return new Promise((resolve, reject) => {
        http({
            url: API.CINEMAAREADATA_API,
            method: 'GET',
            data:{
                day: '2018-11-24',
                offset: 0,
                limit: 20,
                districtId: districtId,
                areaId:  areaId,
                cityId: cityId,
                stationId: stationId,
                lineId: lineId,
                brandId: -1,
                serviceId: -1
            }
        }).then(({data, status})=>{
            if(!status == 200){
                // 请求失败
            }else{
                resolve(data)
            }
        }).catch((error)=>{
            console.log(error)
        })
    })
}
