<template>
    <div class="">

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="角色名称">
                <el-input type="text" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addRole">查询</el-button>
                <el-button plain @click="addRole">添加角色</el-button>
            </el-form-item>
        </el-form>

        <el-table
        :data="tableData"
        border
        style="width: 100%;"
        max-height="400"
        >
            <el-table-column
            prop="id"
            label="ID"
            width="200">
            </el-table-column>

            <el-table-column
                prop="name"
                label="角色名称"
            >
            </el-table-column>

            <el-table-column
            prop="date"
            label="添加日期"
            width="300">
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
                    <el-button size="small" type="danger" >删除</el-button>

                     <el-button size="small" plain="" @click="authRole(scope.row)">角色授权</el-button>
                </template>
                
            </template>
            </el-table-column>
        </el-table>

        <div style="margin-top:20px;text-align: center">
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

        <!--角色授权-->
        <el-dialog title="角色授权" 
        :visible.sync="authroleDialog"
        width="35%"
        >
            <auth-role 
            :roleName = "roleName"
            @closeparentdialog="closeDialog"
            >
            </auth-role>
        </el-dialog>

    </div>
</template>
<script>
import AuthRole from './AuthRole'
export default {
    name: 'Administrators',
    components: {
        AuthRole
    },
    data() {
        return {
            authroleDialog:false,
            roleName:'',
            formInline: {
                name: '',
            },
            tableData:[
                {
                    id:1, 
                    name:'超级管理员', 
                    type:1,
                    status:1,
                    date: '2020-08-01 12:12:12'
                },
                {
                    id:2, 
                    name:'内容管理员', 
                    type:2,
                    status:1,
                    date: '2020-08-01 12:12:12'
                },
                {
                    id:3, 
                    name:'产品管理员', 
                    type:2,
                    status:2,
                    date: '2020-08-01 12:12:12'
                }
            ],
            page:1,
            per_page: 5,
            total:0,
        }
    },
    methods: {
        addRole() {
            this.$router.push('/role/add');
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
        }
    }
}
</script>
<style>
    .el-dialog .el-dialog__body {
        padding: 10px 20px;
    }

</style>
