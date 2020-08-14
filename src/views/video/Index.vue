<template>
    <div class="video">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="视频名称">
                <el-input v-model="formInline.user" placeholder="视频名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button plain @click="addVideo">添加视频</el-button>
            </el-form-item>
        </el-form>

    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      max-height="400"
      >

        <el-table-column
      type="selection"
      width="55">
        </el-table-column>

        <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>

      <el-table-column
        prop="name"
        label="名称"
       >
      </el-table-column>

      <el-table-column
        prop="type"
        label="类型"
        width="100">
      </el-table-column>

      <el-table-column
        prop="cover"
        label="视频"
        width="200"
        height="50"
        style="text-align:center"
        >
        <div slot-scope="scope">
            <img :src="scope.row.cover" width="100" height="50">
        </div>
      </el-table-column>


        <el-table-column
        prop="date"
        label="日期"
        width="160">
        </el-table-column>

        <el-table-column
        fixed="right"
        label="操作"
        width="150"
        >
        <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">通过</el-button>
        </template>
        </el-table-column>

    </el-table>

    <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
    </div>

    <!--对话框-->
    <el-dialog title="视频信息编辑" :visible.sync="showVideoEditDialog">
        <edit-video 
        :vd="videoData" 
        v-on:closeparentdialog="closeDialog"
        >
        </edit-video>
    </el-dialog>
</div>
</template>
<script>

import EditVideo from "./EditVideo"

import {mapState,mapMutations} from 'vuex'
export default {
    name: 'Video',
    components: {
        EditVideo
    },
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData: [],
        showVideoEditDialog:false,
        videoData: null
      }
    },
    mounted() {
        this.getTableList();
    },
    methods: {
      onSubmit() {
          console.log(123);
      },
      handleEdit(row) {
          this.showVideoEditDialog = true;
          this.videoData = row;
      },
      closeDialog(newValue) {
          if(newValue) {
              console.log(newValue);
          }
        this.showVideoEditDialog = false;
      },
      getTableList() {
          this.axios.get('/video/list').then((response) => {
              const data = response.data.data;
              this.tableData = data;
          });
      },
      addVideo() {
          let activeTabName = 'addVideo',tabList = this.tabList,found = false;
          for(let tab of tabList) {
              if(activeTabName === tab.name) {
                  found = true;
                  break;
              }
          }
          let r = '/video/add';
          if(found) {
              this.changeTab({activeTabName});
          } else {
            tabList.push({title:'添加视频',name:activeTabName,router:r});
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
