<template>
    <div class="upload-video">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" maxlength="10" show-word-limit style="width:50%"></el-input>
            </el-form-item>

            <el-form-item label="角色" prop="role">
              <el-select v-model="ruleForm.role">
                <el-option label="内容管理员" value="1"></el-option>
                <el-option label="产品管理员" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="状态" prop="status">
              <template>
                <el-radio v-model="ruleForm.status" label="1">启动</el-radio>
                <el-radio v-model="ruleForm.status" label="2">禁用</el-radio>
              </template>
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
    name: 'AddVideo',
    data() {
      return {
        ruleForm: {
          name: '',
          type: '',
          status: '1',
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 10, message: '最长10个字符', trigger: 'blur' }
          ],
          role: [
            { required: true, message: '请选择角色', trigger: 'change' },
          ],
          status:[
            { required: true, message: '请选择状态', trigger: 'change' },
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
          tabList = this.$removeTab('添加管理员',this.tabList);
          this.updateTab({tabList});
          this.$router.push('/admin/index');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid);
          if (valid) {
              this.$message({message:'添加管理员成功',type:'success',duration:1000})
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
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .el-upload--text {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .cover
      width 178px;
      height 178px;
      img 
        width 178px;
        height 178px;
  .el-upload__tip
      margin-left 5px;
  .upload-show-area
    margin-top:10px;
  .el-form-item
    .el-button
      margin-right 10px;
</style>
