<template>
    <div class="top">
        <div class="title">发烧友</div>
        <div class="nav">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="head-area">
            <div class="theme">主题</div>
            <div class="lang">语言</div>
            <div class="head">
            <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                    <img class="headimg pointer" src="../../assets/images/1.jpg" width="40" height="40">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>退出登陆</el-dropdown-item>
                    </el-dropdown-menu>
            </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'top'
}
</script>
<style lang="stylus" scoped>
    @import "~@/assets/styles/var.styl"
    .top 
        width: 100%;
        min-width: $minWidth;
        height:50px;
        line-height 50px
        background: yellow;
        box-sizing: border-box;
        padding: 0 30px;
        position relative
        >div
            display: inline-block;
        .nav
            margin-left:120px;
        .head-area
            float right
            height 50px
            div
                display:inline-block;
                margin-left:10px;
            .head
                vertical-align: -15px;
                .headimg
                    border-radius:50%;
    
</style>