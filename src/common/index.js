
import Header from './header/Header'
import Content from './content/content'
import Scroll from './scroll/Scroll'
import SubNav from './sunNav/SubNav'


export default {
    //编写插件
    install(Vue){
        Vue.component(Header.name, Header)
        Vue.component(Content.name, Content)
        Vue.component(Scroll.name, Scroll)
        Vue.component(SubNav.name, SubNav)
    }
}