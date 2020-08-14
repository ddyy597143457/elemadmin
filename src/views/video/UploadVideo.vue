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

  <el-form-item label="封面图片">
    <el-upload
    action=""
    :show-file-list="false"
    :auto-upload="false"
    :on-change="coverOnchange"
    >
      <div class="cover">
        <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
        <div v-else  tabindex="0" class="el-upload el-upload--text">
          <i class="el-icon-plus avatar-uploader-icon"></i><input type="file" name="file" class="el-upload__input">
        </div>
      </div>
    </el-upload>
  </el-form-item>

  <el-form-item label="视频文件">
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="uploadUrl">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

  </el-upload>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>

</el-form>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name: 'UploadVideo',
    data() {
      return {
        uploadUrl: '',
        dialogImageUrl: '',
        fileListCover: [],
        fileListVideo:[],
        ruleForm: {
          name: '',
          type: '',
          cover: '',
          video:''
        },
        rules: {
          name: [
            { required: true, message: '请输入视频名称', trigger: 'blur' },
            { min: 1, max: 35, message: '最长35个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择视频类型', trigger: 'change' }
          ],
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
      ...mapMutations(['changeTab']),
      coverOnchange(file) {
        let fileRaw = file.raw;
        var f = new FileReader()
        f.readAsDataURL(fileRaw);
        f.onload = (e) => {
            this.dialogImageUrl = e.target.result;
            console.log(this.dialogImageUrl);
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.axios.post('/video/upload',this.ruleForm).then((res) => {
                if(res.status === 200) {
                  const data = res.data;
                  if(data.result === "success") {
                    this.$confirm('视频上传成功', '提示', {
                        confirmButtonText: '继续上传',
                        cancelButtonText: '返回列表',
                        type: 'success'
                      }).then(() => {
                      }).catch(() => {
                          let tabList;
                          tabList = this.$removeTab('uploadVideo',this.tabList);
                          this.changeTab({activeTabName:'视频列表',tabList});
                          this.$router.push('/admin/video/list');
                      });
                    }
                } else {
                  this.$message({
                    message: res.responseText,
                    type: 'error'
                  });
                }
              });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
</style>
