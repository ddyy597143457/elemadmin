<template>
    <div class="top">
       
        <div class="nav">
            
        </div>
        
        <div class="head-area">
            <div class="theme">主题</div>
            <div class="lang">语言</div>
            <div class="head">
                <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                        <img class="headimg pointer" src="../../assets/images/1.jpg" width="40" height="40">
                        </span>
                        <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item command="loginOut">退出登陆</el-dropdown-item>
                        </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="user-name">
                {{userName}}
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
    name: 'top',
    data() {
        return {
            userName:'',
        }
    },
    computed:{
        ...mapState(['navMenu'])
    },
    methods: {
        handleCommand(command) {
            if(command === 'loginOut') {
                this.loginOut();
            }
        },
        loginOut() {
            localStorage.removeItem('userinfo');
            this.$message({message:'退出登陆成功',type:'success',duration:1000})
            setTimeout(() => {
                this.$router.push('/login');
            },1000)
        }
    },
    mounted() {
        let userinfo = localStorage.getItem('userinfo');
        if(userinfo) {
            userinfo = JSON.parse(userinfo);
            this.userName = userinfo.name;
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import "~@/assets/styles/var.styl"
    .top 
        width: 100%;
        min-width: $minWidth;
        height:50px;
        line-height 50px
        box-sizing: border-box;
        position relative
        padding-right 20px;
        >div
            display: inline-block;
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