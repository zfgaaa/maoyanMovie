<template>
    <div id="Mine">
        <app-header title="猫眼电影">
            <div slot="left" class="btn-left iconfont icon-fanhui" @click="back"></div>
        </app-header>
        
        <ul class="subNav">
            <li class="subNavItem" v-for="(item, index) in loginList" :key="index">{{item}}</li>
        </ul>
        <form>
            <div class="inp">
                <input type="text" class="username" placeholder="账户名/手机号/Email">
                <input type="password" class="password" placeholder="请输入您的密码">
            </div>
            <div class="btnLogin">登录</div>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loginList: ['美团账号登录', '手机验证登录']
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
#Mine{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: #eee;
    z-index: 10;
    .subNav{
        display: flex;
        width: 100%;
        position: absolute;
        top: 44px;
        height: 46px;
        border-bottom: 2px solid #ccc; 
        background: #fff;
        .subNavItem{
            flex: 1;
            text-align: center;
            height: 44px;
            line-height: 44px;
            padding: 0 10px;
        }
    }
    form{
        position: absolute;
        top: 90px;
        width: 100%;
        box-sizing: border-box;
        left: 0;
        input{
            width: 100%;
            margin: 0 auto;
            border: 0;
            height: 50px;
            padding: 0 20px;
        }
        input.username{
            border-bottom: 1px solid #f5f5f5;
        }
        ::-webkit-input-placeholder{
            font-size: 16px;
        }
        .btnLogin{
            width: 100%;
            box-sizing: border-box;
            background: #e54847;
            color: #fff;
            margin-top: 10px;
            border-radius: 5px;
            text-align: center;
            line-height: 44px;
            height: 44px;
        }
    }
}
</style>
