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
      @selection-change="handleSelectionChange"
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
        width="300"
        >
        <template slot-scope="scope" style="text-align: center">
            <el-button @click="handleEdit(scope)" type="primary" size="small">编辑</el-button>
            <el-button 
            v-if="scope.row.status == 2" 
            :loading="scope.row.loading"
            @click="pass(scope)" type="success" size="small">通过</el-button>
            <el-button v-if="scope.row.status == 1" @click="canclePass(scope)" type="warning" size="small" >取消通过</el-button>
        </template>
        </el-table-column>

    </el-table>

    <div style="margin-top: 20px">
        <el-button  @click="deleteSelected()" type="danger" size="small">删除</el-button>
        <el-button  @click="passSelected()" type="success" size="small">通过</el-button>
        <el-button  @click="nopassSelected()" type="warning" size="small" >取消通过</el-button>
    </div>

    <div style="text-align: center">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      prev-text="上一页"
      next-text="下一页"
      @current-change="curChange"
      >
    </el-pagination>
    </div>
    <!--对话框-->
    <el-dialog title="视频信息编辑" :visible.sync="showVideoEditDialog">
        <edit-video 
        :vd="videoData" 
        @closeparentdialog="closeDialog"
        >
        </edit-video>
    </el-dialog>
</div>
</template>
<script>

import EditVideo from "./EditVideo"

import {mapState} from 'vuex'
export default {
    name: 'Video',
    components: {
        EditVideo
    },
    data() {
      return {
        selection:[],
        formInline: {
          user: '',
          region: ''
        },
        page:1,
        per_page: 5,
        total:0,
        tableData: [],
        showVideoEditDialog:false,
        curIndex:'',
        videoData: ''
      }
    },
    mounted() {
        this.getTableList();
    },
    methods: {
      onSubmit() {
        
      },
      getSelectedIds() {
          let ids = this.selection.map((item) => {
           return item.id;
         })
         return ids;
      },
      deleteSelected() {
         let ids = this.getSelectedIds();
         console.log(ids);
      },
      passSelected() {
         let ids = this.getSelectedIds();
        this.tableData.forEach((item,index) => {
            if(ids.includes(item.id)) {
                item.status = 1;
                this.$set(this.tableData,index,item)
            }
        })
      },
      nopassSelected() {
         let ids = this.getSelectedIds();
         console.log(ids);
        this.$confirm('取消通过后前端页面将不展示，确定要取消通过吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.tableData.forEach((item,index) => {
                if(ids.includes(item.id)) {
                    item.status = 2;
                    console.log(index);
                    this.$set(this.tableData,index,item)
                }
            })
             this.$message({message:'取消通过成功',type:'success'});
          });
      },
      handleSelectionChange(selection) {
         this.selection = selection;
      },
      handleEdit(scope) {
        this.curIndex = scope.$index;
        this.showVideoEditDialog = true;
        this.videoData = scope.row;
      },
      pass(scope) {
          const index = scope.$index;
          const row = scope.row;
          row.loading = true;
          this.$set(this.tableData,index,row);
          setTimeout(() => {
            row.status = 1;
            row.loading = false;
            this.$message({message: '通过成功',type: 'success'})
            this.$set(this.tableData,index,row);
          },1000)
      },
      canclePass(scope) {
          this.$confirm('取消通过后前端页面将不展示，确定要取消通过吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
             this.$message({message:'取消通过成功',type:'success'});
          });
          const index = scope.$index;
          const row = scope.row;
          row.status = 2;
          this.$set(this.tableData,index,row);
      },
      closeDialog(newValue) {
          if(newValue) {
            //保存操作
            console.log('newValue',newValue);
            let row = this.tableData[this.curIndex];
            row = Object.assign(row,newValue);
            console.log('row',row);
            this.$set(this.tableData,this.curIndex,row);
          }
        this.showVideoEditDialog = false;
      },
      getTableList() {
          let url = '/video/list';
          this.axios.get(url).then((response) => {
              const data = response.data.data.list;
              data.forEach((item) =>{
                 item.loading = false;
              });
              this.tableData = data;
              this.total = 20;
          });
      },
      addVideo() {
          this.$router.push('/video/add');
      },
      curChange(a) {
        console.log(a);
      },
    },
    computed: {
        ...mapState(['activeTabName','tabList'])
    }
}
</script>
<style lang="stylus" scoped>
</style>
