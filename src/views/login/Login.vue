<template>
    <div class="login">
        <div class="login-window">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name" type="text"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>

                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="onSubmit" :loading="logining">登陆</el-button>
                </el-form-item>

               

            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data() {
      return {
        logining:false,
        form: {
          name: '',
          password: '',
        }
      }
    },
    methods: {
      onSubmit() {
        this.logining = true;
        setTimeout(() => {
            this.$message({message:'登陆成功',type:'success',duration:1000})
            localStorage.setItem('userinfo',{name:this.form.name});
            setTimeout(() => {
                this.$router.push('/');
            },1000);
            
        },1000)
      }
    }
}
</script>
<style lang="stylus" scoped>
    .login
        position absolute
        width 100%
        height 100%
        background  #d3dce6
        .login-window
            position absolute;
            top 20%
            left 50%
            width 500px; 
            height 400px;
            transform: translateX(-50%);
</style>