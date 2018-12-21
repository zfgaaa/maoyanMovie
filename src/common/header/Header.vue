<template>
    <header>
        <slot name="left"/>
        <h1 class="title">{{title}}</h1>
        <slot/>
    </header>
</template>

<script>
export default {
    name: 'app-header',
    props: {
        title: String
    }
}
</script>


<style lang="scss" scoped>
header{
    width: 100%;
    height: 44px;
    position: absolute;
    left: 0;
    top: 0;
    background: #e54847;
    .btn-left{
        position: absolute;
        top: 0;
        left: 10px;
        padding: 0 10px;
        text-align: center;
        line-height: 44px;
        color: #fff;
    }
    .title{
        text-align: center;
        line-height: 44px;
        font-size: 18px;
        color: #fff;
        font-weight: 400;
    }

}
</style>

