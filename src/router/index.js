import Vue from 'vue'
import Router from 'vue-router'

import Movies from '../pages/movies/Movies'
import Location from '../pages/common/Location'
import SearchCM from '../pages/common/SearchCM'

import Detail from '../pages/movies/Detail'
import Info from '../pages/movies/DetailInfo'

import Cinema from '../pages/cinema/cinema'
import CinemaDetail from '../pages/cinema/CinemaDetail'

import SearchC from '../pages/common/SearchC'
import Mine from '../pages/mine/Mine'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/movies',
            component: Movies,
            children: [
                {
                    path: 'location',
                    component: Location
                },
                {
                    path: 'detail',
                    component: Detail,
                    children: [
                        {
                            path: 'info',
                            component: Info
                        }
                    ]
                },
                {
                    path: 'searchCM',
                    component: SearchCM
                }
            ]
        },
        {
            path: '/cinema',
            component: Cinema,
            children: [
                {
                    path: 'searchC',
                    component: SearchC
                },
                {
                    path: 'cinemaDetail',
                    component: CinemaDetail
                }
            ]
        },
        {
            path: '/mine',
            component: Mine
        },
        {
            path: '**',
            redirect: '/movies'
        }
    ]
})
