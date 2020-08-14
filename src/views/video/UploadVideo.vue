<template>
    <div class="upload-video">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="视频名称" prop="name">
    <el-input v-model="ruleForm.name" maxlength="35" show-word-limit style="width:50%;"></el-input>
  </el-form-item>
  <el-form-item label="视频类型" prop="type">
    <el-select v-model="ruleForm.type" placeholder="视频类型">
      <el-option label="美女" value="beati"></el-option>
      <el-option label="搞笑" value="funny"></el-option>
      <el-option label="音乐" value="music"></el-option>
      <el-option label="游戏" value="game"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="视频介绍">
    <el-input type="textarea" v-model="ruleForm.desc" maxlength="200" rows="4" show-word-limit style="width:50%;"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
</template>
<script>
export default {
    name: 'UploadVideo',
        data() {
      return {
        ruleForm: {
          name: '',
          type: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入视频名称', trigger: 'blur' },
            { min: 1, max: 35, message: '最长35个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择视频类型', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请输入视频介绍', trigger: 'blur' },
            { min: 1, max: 200, message: '最长200个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style lang="stylus" scoped>
</style>
