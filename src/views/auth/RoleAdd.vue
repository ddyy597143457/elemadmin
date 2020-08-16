<template>
    <div class="">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="角色名称" prop="name">
                <el-input v-model="ruleForm.name" maxlength="10" show-word-limit style="width:50%"></el-input>
            </el-form-item>

            <el-form-item style="margin-top:30px;">
                <el-button @click="handleReturn">返 回</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name: 'RoleAdd',
    data() {
      return {
        ruleForm: {
          name: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 1, max: 10, message: '最长10个字符', trigger: 'blur' }
          ]
        }
      };
    },
    mounted() {
      this.uploadUrl = process.env.VUE_APP_UPLOADURL
    },
    computed: {
      ...mapState(['activeTabName','tabList'])
    },
    methods: {
      ...mapMutations(['updateTab']),
      handleReturn() {
          let tabList;
          tabList = this.$removeTab('添加角色',this.tabList);
          this.updateTab({tabList});
          this.$router.push('/role/index');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid);
          if (valid) {
              this.$message({message:'添加角色成功',type:'success',duration:1000})
              setTimeout(() => {
                  this.handleReturn();
              },1000)
          }
        });
      },
    }
}
</script>
<style lang="stylus" scoped>

</style>
