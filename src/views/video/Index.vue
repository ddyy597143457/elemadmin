<template>
    <div class="video">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="视频名称">
                <el-input v-model="formInline.user" placeholder="视频名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button plain @click="uploadVideo">上传视频</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name: 'Video',
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit() {
          console.log(123);
      },
      uploadVideo() {
          let activeTabName = 'uploadVideo',tabList = this.tabList,found = false;
          for(let tab of tabList) {
              if(activeTabName === tab.name) {
                  found = true;
                  break;
              }
          }
          let r = '/video/upload';
          if(found) {
              this.changeTab({activeTabName});
          } else {
            tabList.push({title:'上传视频',name:activeTabName,router:r});
            this.changeTab({activeTabName,tabList});
          }
          this.$router.push(r);
      },
      ...mapMutations(['changeTab'])
    },
    computed: {
        ...mapState(['activeTabName','tabList'])
    },
}
</script>
