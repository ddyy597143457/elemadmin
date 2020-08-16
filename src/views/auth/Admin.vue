<template>
    <div class="">

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="addAdmin">添加管理员</el-button>
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
                label="姓名"
            >
            </el-table-column>

            <el-table-column
                prop="role"
                label="角色"
                width="200">
            </el-table-column>

            <el-table-column
                prop="status"
                label="状态"
                width="200">
                 <template slot-scope="scope">
                    <span v-if="scope.row.status==1" style="color:#67C23A;">已启用</span>
                    <span v-if="scope.row.status==2" style="color:#F56C6C;">已禁用</span>
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
            width="250"
            >
            <template slot-scope="scope" style="text-align: center">
                <template v-if="scope.row.roleType==1">
                </template>
                 <template v-else>
                    <el-button @click="handleEdit(scope)" type="primary" size="small">编辑</el-button>
                    <el-button v-if="scope.row.status==2" size="small" type="success">启用</el-button>
                    <el-button v-if="scope.row.status==1" size="small" type="warning">禁用</el-button>
                    <el-button style="float:right" size="small" type="danger">删除</el-button>
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
    </div>
</template>
<script>
export default {
    name: 'Administrators',
    data() {
        return {
            tableData:[
                {
                    id:1, 
                    name: 'tsukimoyi',
                    roleType:1,
                    role:'超级管理员', 
                    status:1,
                    date: '2020-08-01 12:12:12'
                },
                {
                    id:2, 
                    name: 'wz',
                    roleType:2,
                    status:1,
                    role:'内容管理员', 
                    date: '2020-08-01 12:12:12'
                },
                {
                    id:3, 
                    name: 'wz',
                    roleType:2,
                    status:2,
                    role:'产品管理员', 
                    date: '2020-08-01 12:12:12'
                }
            ],
            page:1,
            per_page: 5,
            total:0,
        }
    },
    methods: {
        addAdmin() {
            this.$router.push('/admin/add');
        }
    }
}
</script>
