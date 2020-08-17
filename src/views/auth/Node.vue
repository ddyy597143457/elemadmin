<template>
    <div class="">

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="节点名称">
                <el-input type="text" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button plain @click="addNode">添加节点</el-button>
            </el-form-item>
        </el-form>

        <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
            <el-table-column
            prop="id"
            label="ID"
            width="100">
            </el-table-column>

            <el-table-column
                prop="name"
                label="节点名称"
            >
            <template slot-scope="scope">
                <span :style="{'margin-left':scope.row.level+'px'}">
                    <template v-if="scope.row.children">
                            <i v-if="scope.row.open==0" class="el-icon-caret-left pointer" @click="open(scope.row)"></i>
                            <i v-if="scope.row.open==1" class="el-icon-caret-bottom pointer" @click="shrink(scope.row)"></i>
                    </template>
                    {{scope.row.name}}
                </span>
            </template>
            </el-table-column>

            <el-table-column
                prop="isMenu"
                label="是否菜单"
                width="150"
            >
            <template slot-scope="scope">
                <span class="el-success" v-if="scope.row.isMenu == 1">是</span>
                <span class="el-failed" v-if="scope.row.isMenu == 0">否</span>
            </template>
            </el-table-column>

            <el-table-column
                prop="name"
                label="状态"
                 width="150"
            >
            <template slot-scope="scope">
                <span class="el-success" v-if="scope.row.status == 1">已启用</span>
                <span class="el-failed" v-if="scope.row.status == 2">已禁用</span>
            </template>
            </el-table-column>

            <el-table-column
            prop="date"
            label="添加日期"
            width="200">
            </el-table-column>

            <el-table-column
            fixed="right"
            label="操作"
            width="300"
            >
            <template slot-scope="scope" style="text-align: center">
                <template v-if="scope.row.type=='1'">
                </template>
                <template v-else>
                    <el-button size="small" type="primary">编辑</el-button>
                
                    <el-button v-if="scope.row.isMenu==1" plain @click="addSubNode">添加子节点</el-button>

                    <el-button size="small" type="danger" style="float: right">删除</el-button>

                </template>
                
            </template>
            </el-table-column>
        </el-table>

    </div>
</template>
<script>

export default {
    name: 'Node',
    data() {
        return {
            authroleDialog:false,
            roleName:'',
            formInline: {
                name: '',
            },
            tableData:[]
        }
    },
    methods: {
        shrink(row) {
            console.log(row);
        },
        addNode() {
            this.$router.push('/node/add');
        },
        addSubNode() {

        },
        curChange(a) {
            console.log(a);
        },
        authRole(row) {
            this.authroleDialog = true;
            this.roleName = row.name;
        },
        closeDialog() {
            this.authroleDialog = false;
        },
        getMenuData() {
            this.axios.get('/node/list').then((res)=>{
                let data = res.data.data;
                this.initTree(data,0);
                console.log(this.tableData);
            });
        },
        initTree(data,level) {
            for (let i = 0; i < data.length; i++) {
                data[i].level = level;
                this.tableData.push(data[i]);
                data[i].open = 1;
                if(data[i].children) {
                    this.initTree(data[i].children,level+50);
                }
            }
        }
    },
    mounted() {
        this.getMenuData();
    }
}
</script>
<style>
    .el-dialog .el-dialog__body {
        padding: 10px 20px;
    }

</style>
